/**
 * Interaction Controller for Antigravity Cards
 * Manages touch gestures, 8px touch slop, vertical scroll preservation, haptics, hold timers, double-taps, and action dispatching.
 */

import type { HomeAssistant } from 'custom-card-helpers';
import { handleAction } from 'custom-card-helpers';
import { NON_TOGGLEABLE_DOMAINS, TAP_THRESHOLD_MS, HOLD_THRESHOLD_MS, TAP_SLOP_PX } from '../constants';
import { safeForwardHaptic } from '../color-converter';

let LAST_APP_RESUME_TIME = 0;
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      LAST_APP_RESUME_TIME = Date.now();
    }
  });
}

export interface InteractionCallbacks {
  dispatchAction: (actionType: 'tap' | 'hold' | 'double_tap', actionConfigOverride?: any, entityOverride?: string) => void;
  toggleCollapse?: () => void;
  callService?: (domain: string, service: string, data: Record<string, any>) => void;
}

export class InteractionController {
  private _startX = 0;
  private _startY = 0;
  private _moved = false;
  private _held = false;
  private _canceled = false;
  private _pointerDownReceived = false;
  private _pointerDownTime = 0;
  private _mountTime = Date.now();
  private _activePointerId: number | null = null;
  private _holdTimer: any = null;
  private _tapTimer: any = null;

  // Sub-button pointer and gesture state
  private _subStartX = 0;
  private _subStartY = 0;
  private _subMoved = false;
  private _subHeld = false;
  private _subCanceled = false;
  private _subHoldTimer: any = null;
  private _subTapTimerMap = new Map<string, any>();

  /**
   * Safe action dispatching with domain checks and non-toggleable entity protection.
   */
  public static dispatchAction(
    element: HTMLElement,
    hass: HomeAssistant | undefined,
    config: any,
    actionType: 'tap' | 'hold' | 'double_tap',
    actionConfigOverride?: any,
    entityOverride?: string,
    isEntityActiveFn?: (stateObj: any) => boolean
  ) {
    if (!hass) return;
    const entity = entityOverride || config.entity;
    const domain = entity ? entity.split('.')[0] : '';
    const isNonToggleable = NON_TOGGLEABLE_DOMAINS.has(domain);

    let actionConfig = actionConfigOverride;
    if (!actionConfig) {
      if (actionType === 'double_tap') actionConfig = config.double_tap_action;
      else if (actionType === 'hold') {
        actionConfig = config.hold_action || (isNonToggleable ? { action: 'more-info' } : { action: 'toggle' });
      } else {
        if (config.tap_action && config.tap_action.action && (config.tap_action.action as string) !== 'default') {
          if (isNonToggleable && config.tap_action.action === 'toggle') {
            actionConfig = { action: 'none' };
          } else {
            actionConfig = config.tap_action;
          }
        } else {
          actionConfig = isNonToggleable ? { action: 'none' } : { action: 'toggle' };
        }
      }
    }

    if (!actionConfig || actionConfig.action === 'none') return;

    if (actionConfig.action === 'more-info') {
      const targetEntity = actionConfig.entity || entity;
      if (targetEntity) {
        element.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: targetEntity },
          bubbles: true,
          composed: true,
        }));
        return;
      }
    }

    if (actionConfig.action === 'toggle' && entity) {
      if (isNonToggleable) return;
      const stateObj = hass.states[entity];
      const isActive = isEntityActiveFn ? isEntityActiveFn(stateObj) : (stateObj?.state === 'on');
      const service = domain === 'lock' ? (isActive ? 'lock' : 'unlock') : 'toggle';
      const sDomain = ['lock', 'cover'].includes(domain) ? domain : (domain === 'group' ? 'homeassistant' : domain);
      hass.callService(sDomain, service, { entity_id: entity });
      return;
    }

    if (actionConfig.action === 'navigate' && actionConfig.navigation_path) {
      history.pushState(null, '', actionConfig.navigation_path);
      window.dispatchEvent(new CustomEvent('location-changed', {
        detail: { replace: false },
        bubbles: true,
        composed: true,
      }));
      return;
    }

    if (actionConfig.action === 'url' && actionConfig.url_path) {
      window.open(actionConfig.url_path, '_blank');
      return;
    }

    if (actionConfig.action === 'call-service' && actionConfig.service) {
      const [sDomain, sName] = actionConfig.service.split('.', 2);
      hass.callService(sDomain, sName, actionConfig.data || actionConfig.service_data || {}, actionConfig.target);
      return;
    }

    if (isNonToggleable && (!actionConfig.action || actionConfig.action === 'toggle')) {
      return;
    }

    handleAction(element, hass, { ...config, entity }, actionType);
  }

  // --- MAIN CARD POINTER EVENT LIFECYCLE ---

  public handlePointerDown(e: PointerEvent, config?: any, callbacks?: InteractionCallbacks) {
    if (this.isSubElement(e)) return;
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._moved = false;
    this._held = false;
    this._canceled = false;
    this._pointerDownReceived = true;
    this._pointerDownTime = Date.now();
    this._activePointerId = e.pointerId;

    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    if (config && callbacks) {
      const holdThreshold = config.hold_action_time ?? HOLD_THRESHOLD_MS;
      this._holdTimer = setTimeout(() => {
        if (!this._moved && !this._canceled && this._pointerDownReceived) {
          this._held = true;
          safeForwardHaptic('medium', config.haptic_feedback !== false);
          const trigger = config.collapse_controls_trigger || 'hold';
          if (trigger === 'hold' && callbacks.toggleCollapse) {
            callbacks.toggleCollapse();
          } else {
            callbacks.dispatchAction('hold');
          }
        }
      }, holdThreshold);
    }
  }

  public handlePointerMove(e: PointerEvent, touchSlop = TAP_SLOP_PX): boolean {
    if (this._moved || this._canceled || !this._pointerDownReceived) return false;
    if (this._activePointerId !== null && e.pointerId !== undefined && e.pointerId !== this._activePointerId) return false;

    const dx = Math.abs(e.clientX - this._startX);
    const dy = Math.abs(e.clientY - this._startY);
    if (dx > touchSlop || dy > touchSlop) {
      this._moved = true;
      if (this._holdTimer) {
        clearTimeout(this._holdTimer);
        this._holdTimer = null;
      }
      return true;
    }
    return false;
  }

  public handlePointerUp(_e?: PointerEvent | Event): boolean {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    this._activePointerId = null;
    return !this._moved && !this._canceled;
  }

  public handlePointerCancel(_e?: PointerEvent | Event) {
    this._canceled = true;
    this._moved = true;
    this._pointerDownReceived = false;
    this._activePointerId = null;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  public handleTap(e: Event, config: any, callbacks: InteractionCallbacks) {
    e.stopPropagation();
    if (this.isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - LAST_APP_RESUME_TIME < 800) {
      this._pointerDownReceived = false;
      return;
    }
    if (!this._pointerDownReceived) return;
    this._pointerDownReceived = false;

    if (this._moved || this._canceled) {
      this._moved = false;
      this._canceled = false;
      return;
    }
    if (this._held) {
      this._held = false;
      return;
    }
    if (this._pointerDownTime && (Date.now() - this._pointerDownTime > 600)) {
      return;
    }

    const trigger = config.collapse_controls_trigger || 'hold';
    const isDoubleTapCollapse = trigger === 'double_tap';
    const hasDoubleTap = isDoubleTapCollapse || (config.double_tap_action && config.double_tap_action.action !== 'none');

    if (!hasDoubleTap) {
      safeForwardHaptic('light', config.haptic_feedback !== false);
      callbacks.dispatchAction('tap');
      return;
    }

    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
      safeForwardHaptic('light', config.haptic_feedback !== false);
      if (isDoubleTapCollapse && callbacks.toggleCollapse) {
        callbacks.toggleCollapse();
      } else {
        callbacks.dispatchAction('double_tap');
      }
      return;
    }

    this._tapTimer = setTimeout(() => {
      this._tapTimer = null;
      safeForwardHaptic('light', config.haptic_feedback !== false);
      callbacks.dispatchAction('tap');
    }, TAP_THRESHOLD_MS);
  }

  public handleContextMenu(e: Event, config: any, callbacks: InteractionCallbacks) {
    if (this.isSubElement(e)) return;
    if (this._held) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const hasCustomHold = config.hold_action && config.hold_action.action !== 'none' && config.hold_action.action !== 'default';
    const hasCollapseHold = (config.collapse_controls_trigger || 'hold') === 'hold';
    if (hasCustomHold || hasCollapseHold) {
      e.preventDefault();
      e.stopPropagation();
      this._held = true;
      safeForwardHaptic('medium', config.haptic_feedback !== false);
      if (hasCollapseHold && callbacks.toggleCollapse) {
        callbacks.toggleCollapse();
      } else {
        callbacks.dispatchAction('hold');
      }
    }
  }

  public handleKeyDown(e: KeyboardEvent, config: any, callbacks: InteractionCallbacks) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      safeForwardHaptic('light', config.haptic_feedback !== false);
      callbacks.dispatchAction('tap');
    }
  }

  // --- SUB-BUTTON GESTURES & TAP ROUTING ---

  public handleSubPointerDown(e: PointerEvent, entityId: string, holdAction: any, config: any, callbacks: InteractionCallbacks) {
    this._subStartX = e.clientX;
    this._subStartY = e.clientY;
    this._subMoved = false;
    this._subHeld = false;
    this._subCanceled = false;

    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }

    if (holdAction && holdAction.action !== 'none') {
      const holdThreshold = config.hold_action_time ?? HOLD_THRESHOLD_MS;
      this._subHoldTimer = setTimeout(() => {
        if (!this._subMoved && !this._subCanceled) {
          this._subHeld = true;
          safeForwardHaptic('medium', config.haptic_feedback !== false);
          callbacks.dispatchAction('hold', holdAction, entityId);
        }
      }, holdThreshold);
    }
  }

  public handleSubPointerMove(e: PointerEvent) {
    if (this._subMoved || this._subCanceled) return;
    const dx = Math.abs(e.clientX - this._subStartX);
    const dy = Math.abs(e.clientY - this._subStartY);
    if (dx > TAP_SLOP_PX || dy > TAP_SLOP_PX) {
      this._subMoved = true;
      if (this._subHoldTimer) {
        clearTimeout(this._subHoldTimer);
        this._subHoldTimer = null;
      }
    }
  }

  public handleSubPointerUp() {
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
  }

  public handleSubPointerCancel() {
    this._subCanceled = true;
    this._subMoved = true;
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
  }

  public handleSubTap(
    e: Event,
    entityId: string,
    tapAction: any,
    doubleTapAction: any,
    defaultAction: (() => void) | undefined,
    config: any,
    callbacks: InteractionCallbacks
  ) {
    e.stopPropagation();
    if (this._subMoved || this._subCanceled) {
      this._subMoved = false;
      this._subCanceled = false;
      return;
    }
    if (this._subHeld) {
      this._subHeld = false;
      return;
    }

    const hasDoubleTap = doubleTapAction && doubleTapAction.action !== 'none';
    const key = `sub_${entityId || config.entity || 'main'}`;

    if (!hasDoubleTap) {
      safeForwardHaptic('light', config.haptic_feedback !== false);
      if (defaultAction && (!tapAction || tapAction.action === 'default')) {
        defaultAction();
      } else {
        callbacks.dispatchAction('tap', tapAction, entityId);
      }
      return;
    }

    const activeTimer = this._subTapTimerMap.get(key);
    if (activeTimer) {
      clearTimeout(activeTimer);
      this._subTapTimerMap.delete(key);
      safeForwardHaptic('light', config.haptic_feedback !== false);
      callbacks.dispatchAction('double_tap', doubleTapAction, entityId);
      return;
    }

    const timer = setTimeout(() => {
      this._subTapTimerMap.delete(key);
      safeForwardHaptic('light', config.haptic_feedback !== false);
      if (defaultAction && (!tapAction || tapAction.action === 'default')) {
        defaultAction();
      } else {
        callbacks.dispatchAction('tap', tapAction, entityId);
      }
    }, TAP_THRESHOLD_MS);

    this._subTapTimerMap.set(key, timer);
  }

  public handleSubContextMenu(e: Event, entityId: string, holdAction: any, config: any, callbacks: InteractionCallbacks) {
    if (holdAction && holdAction.action !== 'none') {
      e.preventDefault();
      e.stopPropagation();
      safeForwardHaptic('medium', config.haptic_feedback !== false);
      callbacks.dispatchAction('hold', holdAction, entityId);
    }
  }

  public isSubElement(e: Event): boolean {
    const target = e.target as HTMLElement | null;
    return !!target?.closest?.('.sub-button, .sub-button-container, .slider-container, input[type="range"], input[type="color"], .color-picker, .color-swatch-chip, .temp-preset-chip, [data-ag-sub]');
  }

  public cleanup() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
    for (const timer of this._subTapTimerMap.values()) {
      clearTimeout(timer);
    }
    this._subTapTimerMap.clear();
  }
}
