import { LitElement, html, unsafeCSS, PropertyValues, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { AntigravityCardConfig, FadeCalculationResult } from './types';
import { DEFAULT_CARD_CONFIG } from './types';
import { StyleBuilder } from './style-builder';
import { memoryTracker } from './memory-tracker';
import { powerHelper } from './power-helper';
import { cleanupWebGL } from './gpu-utils';
import { runAntigravityCI } from './ci-workflow';
import { antigravityCardStyles } from './styles/card-styles';
import { SubButtonController } from './controllers/sub-button-controller';
import { InfoFormatter } from './controllers/info-formatter';
import { EntityController } from './controllers/entity-controller';
import { SliderController, SliderCallbacks, SliderDragManager } from './controllers/slider-controller';
import { InteractionController, InteractionCallbacks } from './controllers/interaction-controller';
import { fadeTransitionManager } from './fade-transition';
import { parseColorToRgb, resolveColorCached, safeForwardHaptic } from './color-converter';
import { ACTIVE_STATES, COLOR_MODES_SET, SLIDER_THROTTLE_MS, SLIDER_THROTTLE_POWER_SAVE_MS } from './constants';
import './editor';

// Augment HomeAssistant type for newer HA APIs not yet in custom-card-helpers
declare module 'custom-card-helpers' {
  interface HomeAssistant {
    formatEntityState?: (stateObj: any) => string;
  }
}

declare global {
  interface Window {
    customCards?: any[];
    runAntigravityCI?: () => Promise<any>;
    antigravityMemoryReport?: () => void;
    antigravityPowerStatus?: () => boolean;
  }
}

if (typeof window !== 'undefined') {
  window.runAntigravityCI = runAntigravityCI;
  window.antigravityMemoryReport = () => memoryTracker.logStatus();
  window.antigravityPowerStatus = () => powerHelper.isPowerSaveActive();
}

export const CARD_VERSION = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${CARD_VERSION} `,
  'color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);

// ---- CSS Houdini Custom Property Registration (Zero-Reflow GPU Transitions) ----
if (typeof CSS !== 'undefined' && 'registerProperty' in CSS) {
  try {
    (CSS as any).registerProperty({
      name: '--slider-pct',
      syntax: '<percentage>',
      inherits: true,
      initialValue: '0%'
    });
    (CSS as any).registerProperty({
      name: '--decay-pct',
      syntax: '<percentage>',
      inherits: true,
      initialValue: '100%'
    });
    (CSS as any).registerProperty({
      name: '--glow-intensity',
      syntax: '<number>',
      inherits: true,
      initialValue: '1'
    });
  } catch {
    // Already registered or unsupported
  }
}

// ---- Card Registration ----
window.customCards = window.customCards || [];
window.customCards.push({
  type: "antigravity-no-icon-card",
  name: "Antigravity No Icon Card",
  preview: true,
  description: "An ultra-streamlined, high-performance custom card merging Bubble Card styling with Mushroom Card controls, multi-stage transitions, and zero icon overhead."
});
window.customCards.push({
  type: "antigravity-card",
  name: "Antigravity Card",
  preview: true,
  description: "Default Antigravity Card (No Icon)"
});

export class AntigravityCard extends LitElement {
  // --- SECTIONS LAYOUT SUPPORT ---
  public getGridOptions() {
    const isLarge = this.config?.card_layout === 'large';
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: isLarge ? 2 : 1, max: 4 },
    };
  }

  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  public getCardSize(): number {
    return this.config?.card_layout === 'large' ? 3 : 2;
  }

  public static getStubConfig(): Record<string, unknown> {
    return { ...DEFAULT_CARD_CONFIG };
  }

  public static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public preview = false;
  @state() private config!: AntigravityCardConfig;
  @state() private _collapsed = true;

  private _interaction = new InteractionController();
  private _sliderDrag = new SliderDragManager();
  private _throttleMap = new Map<string, number>();

  private _monitoredEntities: string[] = [];
  private _powerUnsubscribe: (() => void) | null = null;
  private _gl: WebGLRenderingContext | null = null;

  setConfig(config: AntigravityCardConfig) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this.config = {
      ...DEFAULT_CARD_CONFIG,
      ...config
    };
    this._cachedSubButtons = null;

    // Pre-calculate monitored entities for zero-allocation shouldUpdate checks
    const entitySet = new Set<string>();
    if (this.config.entity) entitySet.add(this.config.entity);
    if (this.config.sub_button_1_entity) entitySet.add(this.config.sub_button_1_entity);
    if (this.config.sub_button_2_entity) entitySet.add(this.config.sub_button_2_entity);
    if (this.config.sub_button_3_entity) entitySet.add(this.config.sub_button_3_entity);
    if (this.config.sub_button_4_entity) entitySet.add(this.config.sub_button_4_entity);
    if ((this.config.tap_action as any)?.target?.entity_id) {
      const t = (this.config.tap_action as any).target.entity_id;
      if (typeof t === 'string') entitySet.add(t);
      else if (Array.isArray(t)) t.forEach(id => entitySet.add(id));
    }
    if ((this.config.hold_action as any)?.target?.entity_id) {
      const t = (this.config.hold_action as any).target.entity_id;
      if (typeof t === 'string') entitySet.add(t);
      else if (Array.isArray(t)) t.forEach(id => entitySet.add(id));
    }
    this._monitoredEntities = Array.from(entitySet);

    this._computeStaticStylesAndClasses();
  }

  public override shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config || !this.hass) return true;
    if (changedProps.has('config') || changedProps.has('preview') || changedProps.has('_collapsed')) return true;

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    // Check global theme, language, and locale changes
    if (
      oldHass.themes !== this.hass.themes || 
      oldHass.locale !== this.hass.locale || 
      oldHass.language !== this.hass.language ||
      oldHass.selectedTheme !== this.hass.selectedTheme
    ) {
      return true;
    }

    // Fast-path: HA states reference identical (zero entity changes)
    if (oldHass.states === this.hass.states) {
      return false;
    }

    // Single-entity fast-path (bypasses loop overhead for 80%+ of cards)
    const monitored = this._monitoredEntities;
    const len = monitored.length;
    if (len === 1) {
      const ent = monitored[0];
      return oldHass.states[ent] !== this.hass.states[ent];
    }

    // Multi-entity scan without array/heap allocation
    for (let i = 0; i < len; i++) {
      const ent = monitored[i];
      if (oldHass.states[ent] !== this.hass.states[ent]) {
        return true;
      }
    }
    return false;
  }

  private _staticCardStyles = '';
  private _staticCardClasses = '';
  private _textOffsetStyle = '';
  private _featuresOffsetStyle = '';
  private _mainSliderMarginOffsets = '';
  private _colorTempMarginOffsets = '';
  private _colorHueMarginOffsets = '';
  private _textBoxWidth = '';
  private _primaryTextStyle = '';
  private _secondaryTextStyle = '';
  private _primaryTextOffsetStyle = '';
  private _secondaryTextOffsetStyle = '';
  private _fadeStaticConfig: any = null;

  private _computeStaticStylesAndClasses() {
    if (!this.config) return;

    const computed = StyleBuilder.computeStaticStyles(this.config);
    this._staticCardStyles = computed.staticCardStyles;
    this._staticCardClasses = computed.staticCardClasses;
    this._textOffsetStyle = computed.textOffsetStyle;
    this._primaryTextOffsetStyle = computed.primaryTextOffsetStyle;
    this._secondaryTextOffsetStyle = computed.secondaryTextOffsetStyle;
    this._featuresOffsetStyle = computed.featuresOffsetStyle;
    this._mainSliderMarginOffsets = computed.mainSliderMarginOffsets;
    this._colorTempMarginOffsets = computed.colorTempMarginOffsets;
    this._colorHueMarginOffsets = computed.colorHueMarginOffsets;
    this._textBoxWidth = computed.textBoxWidth;
    this._primaryTextStyle = computed.primaryTextStyle;
    this._secondaryTextStyle = computed.secondaryTextStyle;

    this._cachedSubButtons = SubButtonController.extractSubButtons(this.config) as any[];
    this._fadeStaticConfig = fadeTransitionManager.precomputeDurations(this.config);
    this._sanitizedCustomStyles = StyleBuilder.sanitizeCustomStyles(this.config.custom_styles);
  }

  private _sanitizedCustomStyles = '';

  private _interactionCallbacks: InteractionCallbacks = {
    dispatchAction: (actionType, actionConfigOverride, entityOverride) =>
      this._dispatchAction(actionType, actionConfigOverride, entityOverride),
    toggleCollapse: () => {
      if (this._hasCollapsible()) {
        this._collapsed = !this._collapsed;
      }
    },
    callService: (domain, service, data) =>
      this.hass?.callService(domain, service, data)
  };

  private _sliderCallbacks: SliderCallbacks = {
    onPointerDown: (e) => this._onSliderPointerDown(e),
    onPointerMove: (e) => this._onSliderPointerMove(e),
    onPointerUp: (e) => this._onSliderPointerUp(e),
    onPointerCancel: (e) => this._onSliderPointerCancel(e),
    onSliderInput: (e, key, domain, service, dataFn, pctCalc, labelFormatter) =>
      this._sliderInput(e, key, domain, service, dataFn, pctCalc, labelFormatter),
    onSliderChange: (e, domain, service, dataFn) =>
      this._sliderChange(e, domain, service, dataFn),
    onColorInput: (e, throttle, entityOverride, throttleKey) =>
      this._handleColorInput(e, throttle, entityOverride, throttleKey),
    callService: (domain, service, data) =>
      this.hass.callService(domain, service, data),
    forwardHaptic: (type) =>
      safeForwardHaptic(type, this.config.haptic_feedback !== false)
  };

  private _subButtonCallbacks = {
    onTap: (e: Event, id: string, tap: any, dbl: any, def?: () => void) => this._handleSubTap(e, id, tap, dbl, def),
    onPointerDown: (e: PointerEvent, id: string, hold: any) => this._handleSubPointerDown(e, id, hold),
    onPointerMove: (e: PointerEvent) => this._handleSubPointerMove(e),
    onPointerUp: (e: Event) => this._handleSubPointerUp(e),
    onPointerCancel: (e: Event) => this._handleSubPointerCancel(e),
    onContextMenu: (e: Event, id: string, hold: any) => this._handleSubContextMenu(e, id, hold)
  };


  private _relativeTimer: any = null;
  private _cachedSubButtons: any[] | null = null;
  private _intersectionObserver: IntersectionObserver | null = null;
  private _cachedHasCollapsible = false;

  private _getSubButtons(): any[] {
    return this._cachedSubButtons || [];
  }

  private _hasCollapsible(): boolean {
    return this._cachedHasCollapsible;
  }

  private _recomputeHasCollapsible(): void {
    if (!this.hass || !this.config || !this.config.entity) { this._cachedHasCollapsible = false; return; }
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) { this._cachedHasCollapsible = false; return; }

    const domain = this.config.entity.split('.')[0];
    const isLight = domain === 'light';
    const isActive = stateObj.state === 'on';

    const hideColorTempWhenOff = this.config.hide_color_temp_when_off !== false;
    const hideColorPickerWhenOff = this.config.hide_color_picker_when_off !== false;
    const hideColorSliderWhenOff = this.config.hide_color_slider_when_off !== false;

    const colorTempAttr = stateObj.attributes?.color_temp_kelvin ?? stateObj.attributes?.color_temp;
    const showColorTemp = isLight && this.config.show_color_temp === true && (colorTempAttr !== undefined || stateObj.attributes?.supported_color_modes?.some((m: string) => ['color_temp'].includes(m))) && (!hideColorTempWhenOff || isActive);

    const supportedModes = stateObj.attributes?.supported_color_modes;
    const supportsColor = Array.isArray(supportedModes) && supportedModes.some((m: string) => ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'].includes(m));
    const isSliderColorPicker = this.config.color_picker_type !== 'wheel';
    const showColorSlider = isLight && (this.config.show_color_slider === true || (this.config.show_color_picker === true && isSliderColorPicker)) && supportsColor && (!hideColorSliderWhenOff || isActive);
    const showColorWheel = isLight && this.config.show_color_picker === true && !isSliderColorPicker && supportsColor && (!hideColorPickerWhenOff || isActive);

    const hasSecondarySliders = showColorTemp || showColorSlider || showColorWheel;
    const subButtons = this._getSubButtons();

    this._cachedHasCollapsible = hasSecondarySliders || subButtons.length > 0;
  }

  connectedCallback() {
    super.connectedCallback();
    memoryTracker.registerCard(this);
    
    // Subscribe to battery / power-save changes
    this._powerUnsubscribe = powerHelper.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    });
    this._updatePowerSaveAttribute();

    this._setupRelativeTimer();
    this._setupIntersectionObserver();
  }

  private _updatePowerSaveAttribute() {
    const isPowerSave = powerHelper.isPowerSaveActive(this.hass);
    if (isPowerSave) {
      this.setAttribute('power-save', '');
    } else {
      this.removeAttribute('power-save');
    }
  }

  private _setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined' || this._intersectionObserver) return;
    this._intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this.setAttribute('offscreen', '');
        } else {
          this.removeAttribute('offscreen');
        }
      }
    }, { rootMargin: '200px 0px', threshold: 0 });
    this._intersectionObserver.observe(this);
  }

  private _setupRelativeTimer() {
    const p = this.config?.primary_info;
    const s = this.config?.secondary_info;
    const entity = this.config?.entity;
    const domain = entity ? entity.split('.')[0] : '';
    const isStateDynamic = (domain === 'binary_sensor' || domain === 'timer') && (p === 'state' || s === 'state');
    const hasFade = this.config?.fade_transition_enabled === true;
    const stateObj = entity && this.hass ? this.hass.states[entity] : null;
    
    // Check if fade is actively in progress (not expired)
    let isFading = false;
    if (hasFade && stateObj) {
      const multiStage = this._calculateMultiStageFade(stateObj);
      isFading = multiStage.enabled && multiStage.activeFade && multiStage.progressPct < 100;
    }

    const needsTimer = (
      isFading ||
      isStateDynamic ||
      p === 'last-changed' || p === 'last_changed' || p === 'last-updated' || p === 'last_updated' ||
      p === 'last-triggered' ||
      s === 'last-changed' || s === 'last_changed' || s === 'last-updated' || s === 'last_updated' ||
      s === 'last-triggered'
    );
    if (needsTimer && !this._relativeTimer) {
      let intervalMs = isFading ? 1000 : 5000;
      const ts = stateObj?.attributes?.last_triggered || stateObj?.last_changed || stateObj?.last_updated;
      if (ts && !isFading && !isStateDynamic) {
        const d = this._parseDate(ts);
        if (d) {
          const ageSec = Math.max(0, ((Date.now() - d.getTime()) / 1000) | 0);
          if (ageSec > 3600) {
            intervalMs = 60000; // Over 1 hour old: tick once per minute to save CPU
          } else if (ageSec > 60) {
            intervalMs = 15000; // Over 1 min old: tick every 15s
          }
        }
      }
      if (powerHelper.isPowerSaveActive(this.hass)) {
        intervalMs = Math.max(intervalMs, 10000); // Low-power battery optimization
      }
      this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute('offscreen') && this.style.display !== 'none') {
          // If fade completed, teardown timer to save battery
          if (isFading && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, intervalMs);

    } else if (!needsTimer && this._relativeTimer) {
      clearInterval(this._relativeTimer);
      this._relativeTimer = null;
    }
  }

  private _isFadeActive(): boolean {
    const entity = this.config?.entity;
    if (!entity || !this.hass) return false;
    const stateObj = this.hass.states[entity];
    if (!stateObj) return false;
    const multiStage = this._calculateMultiStageFade(stateObj);
    return multiStage.enabled && multiStage.activeFade && multiStage.progressPct < 100;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    memoryTracker.unregisterCard(this);
    if (this._powerUnsubscribe) {
      this._powerUnsubscribe();
      this._powerUnsubscribe = null;
    }
    if (this._gl) {
      cleanupWebGL(this._gl);
      this._gl = null;
    }
    this._throttleMap.clear();
    this._interaction.cleanup();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
    if (this._relativeTimer) {
      clearInterval(this._relativeTimer);
      this._relativeTimer = null;
    }
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    // Visibility handled by updated() — no redundant call needed here
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateVisibility();
    // Only recompute collapsible state when config or entity state actually changed
    if (changedProperties.has('config') || changedProperties.has('_collapsed')) {
      this._recomputeHasCollapsible();
      this._setupRelativeTimer();
    } else if (changedProperties.has('hass') && this.config?.entity) {
      const oldHass = changedProperties.get('hass') as HomeAssistant | undefined;
      if (!oldHass || oldHass.states[this.config.entity] !== this.hass.states[this.config.entity]) {
        this._recomputeHasCollapsible();
        this._setupRelativeTimer();
      }
    }
  }

  private _toggleDisplay(shouldHide: boolean) {
    if (this.preview) {
      if (this.style.display === 'none') {
        this.style.removeProperty('display');
      }
      this.hidden = false;
      return;
    }

    if (shouldHide) {
      this.style.setProperty('display', 'none', 'important');
      this.hidden = true;
    } else {
      if (this.style.display === 'none') {
        this.style.removeProperty('display');
      }
      this.hidden = false;
    }
  }

  private _updateVisibility() {
    if (!this.config || !this.hass) return;
    const visState = this.config.visibility_state;
    if (!visState || visState === 'always') {
      this._toggleDisplay(false);
      return;
    }

    const entityId = this.config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    if (!stateObj) {
      this._toggleDisplay(false);
      return;
    }

    const isStateOn = stateObj.state === 'on' || this._isEntityActive(stateObj);
    let shouldHide = false;
    if (visState === 'on' && !isStateOn) {
      shouldHide = true;
    } else if (visState === 'off' && isStateOn) {
      shouldHide = true;
    }

    this._toggleDisplay(shouldHide);
  }

  private _isEntityActive(stateObj: any): boolean {
    if (!stateObj) return false;
    return ACTIVE_STATES.has(stateObj.state);
  }

  private _calculateMultiStageFade(
    stateObj: any,
    defaultActiveStr: string = '',
    defaultInactiveStr: string = ''
  ): FadeCalculationResult {
    return fadeTransitionManager.calculateFade(
      this.config,
      stateObj,
      this._fadeStaticConfig,
      this._resolveColor(this.config.active_color) || defaultActiveStr || '#d60000',
      this._resolveColor(this.config.inactive_color) || defaultInactiveStr || '#03b100'
    );
  }

  private _resolveColor(colorStr: string | undefined): string {
    return resolveColorCached(colorStr);
  }

  private _parseDate(dateInput: string | Date | number | undefined): Date | null {
    return InfoFormatter.parseDate(dateInput);
  }

  private _getInfoContent(type: string | undefined, stateObj: any): string | TemplateResult {
    return InfoFormatter.getInfoContent(type, stateObj, this.config, this.hass);
  }

  // --- NATIVE ACTION ROUTING & TOUCH GESTURE HANDLING ---

  private _dispatchAction(actionType: 'tap' | 'hold' | 'double_tap', actionConfigOverride?: any, entityOverride?: string) {
    InteractionController.dispatchAction(
      this,
      this.hass,
      this.config,
      actionType,
      actionConfigOverride,
      entityOverride,
      (s) => this._isEntityActive(s)
    );
  }

  private _handleTap(e: Event) {
    this._interaction.handleTap(e, this.config, this._interactionCallbacks);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    this._interaction.handleKeyDown(e, this.config, this._interactionCallbacks);
  }

  private _handleContextMenu(e: Event) {
    this._interaction.handleContextMenu(e, this.config, this._interactionCallbacks);
  }

  private _handlePointerDown(e: PointerEvent) {
    this._interaction.handlePointerDown(e, this.config, this._interactionCallbacks);
  }

  private _handlePointerMove(e: PointerEvent) {
    this._interaction.handlePointerMove(e);
  }

  private _handlePointerUp(e: PointerEvent | Event) {
    this._interaction.handlePointerUp(e);
  }

  private _handlePointerCancel(e: PointerEvent | Event) {
    this._interaction.handlePointerCancel(e);
  }

  // --- SUB BUTTON ROUTING ---

  private _handleSubPointerDown(e: PointerEvent, entityId: string, holdAction?: any) {
    this._interaction.handleSubPointerDown(e, entityId, holdAction, this.config, this._interactionCallbacks);
  }

  private _handleSubPointerMove(e: PointerEvent) {
    this._interaction.handleSubPointerMove(e);
  }

  private _handleSubPointerUp(_e: Event) {
    this._interaction.handleSubPointerUp();
  }

  private _handleSubPointerCancel(_e: Event) {
    this._interaction.handleSubPointerCancel();
  }

  private _handleSubTap(e: Event, entityId: string, tapAction?: any, doubleTapAction?: any, defaultAction?: () => void) {
    this._interaction.handleSubTap(e, entityId, tapAction, doubleTapAction, defaultAction, this.config, this._interactionCallbacks);
  }

  private _handleSubContextMenu(e: Event, entityId: string, holdAction?: any) {
    this._interaction.handleSubContextMenu(e, entityId, holdAction, this.config, this._interactionCallbacks);
  }

  // --- THROTTLED SERVICE CALL HELPER ---

  private _throttledCall(key: string, fn: () => void, delayMs?: number): void {
    const now = Date.now();
    const effectiveDelay = delayMs ?? (powerHelper.isPowerSaveActive(this.hass) ? SLIDER_THROTTLE_POWER_SAVE_MS : SLIDER_THROTTLE_MS);
    const last = this._throttleMap.get(key) || 0;
    if (now - last >= effectiveDelay) {
      this._throttleMap.set(key, now);
      fn();
    } else {
      setTimeout(() => {
        const lateNow = Date.now();
        const lateLast = this._throttleMap.get(key) || 0;
        if (lateNow - lateLast >= effectiveDelay) {
          this._throttleMap.set(key, lateNow);
          fn();
        }
      }, effectiveDelay + 50);
    }
  }

  // --- GENERIC SLIDER GESTURE & SCROLL DISAMBIGUATION ---

  private _onSliderPointerDown = (e: PointerEvent) => {
    this._sliderDrag.handlePointerDown(e);
  };

  private _onSliderPointerMove = (e: PointerEvent) => {
    this._sliderDrag.handlePointerMove(e);
  };

  private _onSliderPointerCancel = (e: Event) => {
    this._sliderDrag.handlePointerCancel(e);
  };

  private _onSliderPointerUp = (e: PointerEvent) => {
    this._sliderDrag.handlePointerUp(e, this.config, () => {
      safeForwardHaptic('light', this.config.haptic_feedback !== false);
      this._dispatchAction('tap');
    });
  };

  private _sliderInput(
    e: Event, 
    key: string, 
    _domain: string, 
    _service: string, 
    _dataFn: (val: number) => Record<string, any>, 
    pctCalc?: (val: number) => number,
    labelFormatter?: (val: number, pct: number) => string
  ) {
    this._sliderDrag.handleSliderInput(e, key, this.config, pctCalc, labelFormatter);
  }

  private _sliderChange(e: Event, domain: string, service: string, dataFn: (val: number) => Record<string, any>) {
    this._sliderDrag.handleSliderChange(e, domain, service, this.config, this.hass, dataFn);
  }

  private _getLightLiveColor(stateObj: any): string | null {
    return EntityController.getLightLiveColor(stateObj);
  }

  private _handleColorInput(e: Event, throttle: boolean, entityOverride?: string, throttleKey?: string) {
    e.stopPropagation();
    const hex = (e.target as HTMLInputElement).value;
    if (!hex) return;
    const rgb = parseColorToRgb(hex);
    if (!rgb) return;
    const entity = entityOverride || this.config.entity;
    const callService = () => {
      this.hass.callService('light', 'turn_on', { entity_id: entity, rgb_color: rgb });
    };
    if (throttle) {
      this._throttledCall(throttleKey || 'color_picker', callService);
    } else {
      callService();
    }
  }

  // --- RENDER ---

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entityId = this.config.entity;
    if (!entityId) {
      return html`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    }

    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${entityId}</code></span>
        </ha-card>
      `;
    }

    // Visibility is handled exclusively by _updateVisibility() in updated().
    // Do NOT return `nothing` here — it empties the shadow DOM and causes race conditions.


    const primaryText = this.config.show_name !== false ? this._getInfoContent(this.config.primary_info, stateObj) : "";
    const secondaryText = this.config.show_state !== false ? this._getInfoContent(this.config.secondary_info, stateObj) : "";
    
    const isActive = this._isEntityActive(stateObj);
    const domain = entityId.split('.')[0];

    // Smart Domain-Aware Default Active Color
    let defaultActiveColor = 'var(--primary-color)';
    let liveLightColor: string | null = null;
    if (domain === 'climate') {
      if (stateObj.state === 'heat') defaultActiveColor = 'var(--state-climate-heat-color, #ff7043)';
      else if (stateObj.state === 'cool') defaultActiveColor = 'var(--state-climate-cool-color, #42a5f5)';
      else if (stateObj.state === 'dry') defaultActiveColor = 'var(--state-climate-dry-color, #ab47bc)';
      else if (stateObj.state === 'fan_only') defaultActiveColor = 'var(--state-climate-fan_only-color, #26a69a)';
    } else if (domain === 'light') {
      liveLightColor = this._getLightLiveColor(stateObj);
      if (liveLightColor) {
        defaultActiveColor = liveLightColor;
      }
    } else if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      defaultActiveColor = '#d60000';
    }

    // color_type: 'card' floods the whole card background with current light color or color_temp
    const colorTypeIsCard = this.config.color_type === 'card';
    let activeColor = this._resolveColor(this.config.active_color);
    if (!activeColor || this.config.use_light_color) {
      if (domain === 'light' && liveLightColor) {
        activeColor = liveLightColor;
      } else {
        activeColor = defaultActiveColor;
      }
    }

    let defaultInactiveColor = 'var(--secondary-background-color, rgba(150, 150, 150, 0.2))';
    if (domain === 'light') {
      defaultInactiveColor = '#000000';
    } else if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      defaultInactiveColor = '#03b500';
    }

    const inactiveColor = this._resolveColor(this.config.inactive_color) || defaultInactiveColor;

    // Multi-Domain Interactive Sliders
    const hasControls = this.config.show_slider !== false;
    const isLight = domain === 'light';
    const isCover = domain === 'cover';
    const isFan = domain === 'fan';
    const isHumidifier = domain === 'humidifier';
    const isMediaPlayer = domain === 'media_player';
    const isNumber = domain === 'number' || domain === 'input_number';
    const isClimate = domain === 'climate';

    // Light Features: support hiding sliders when light is off (default: true)
    const hideSliderWhenOff = this.config.hide_slider_when_off !== false;
    const hideColorTempWhenOff = this.config.hide_color_temp_when_off !== false;
    const hideColorPickerWhenOff = this.config.hide_color_picker_when_off !== false;
    const hideColorSliderWhenOff = this.config.hide_color_slider_when_off !== false;

    const supportedModes = stateObj.attributes?.supported_color_modes;
    let supportsBrightness = stateObj.attributes?.brightness !== undefined;
    let supportsColorTemp = false;
    let supportsColor = false;
    if (Array.isArray(supportedModes)) {
      for (let i = 0; i < supportedModes.length; i++) {
        const m = supportedModes[i];
        if (m !== 'onoff') supportsBrightness = true;
        if (m === 'color_temp') supportsColorTemp = true;
        if (COLOR_MODES_SET.has(m)) supportsColor = true;
      }
    }

    const showLightSlider = isLight && hasControls && supportsBrightness && (!hideSliderWhenOff || isActive);
    const colorTempAttr = stateObj.attributes?.color_temp_kelvin ?? stateObj.attributes?.color_temp;
    const showColorTemp = isLight && hasControls && this.config.show_color_temp === true && (colorTempAttr !== undefined || supportsColorTemp) && (!hideColorTempWhenOff || isActive);
    
    // RGB / Hue / XY Color Mode Support
    const isSliderColorPicker = this.config.color_picker_type !== 'wheel';
    const showColorSlider = isLight && hasControls && (this.config.show_color_slider === true || (this.config.show_color_picker === true && isSliderColorPicker)) && supportsColor && (!hideColorSliderWhenOff || isActive);
    const showColorWheel = isLight && hasControls && this.config.show_color_picker === true && !isSliderColorPicker && supportsColor && (!hideColorPickerWhenOff || isActive);

    // Cover Features
    const isAvailable = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const showCoverSlider = isCover && isAvailable && hasControls && stateObj.attributes?.current_position !== undefined;
    // Fan Features
    const showFanSlider = isFan && isAvailable && isActive && hasControls && stateObj.attributes?.percentage !== undefined;
    // Humidifier Features
    const showHumidifierSlider = isHumidifier && isAvailable && isActive && hasControls && (stateObj.attributes?.humidity !== undefined || stateObj.attributes?.target_humidity !== undefined);
    // Media Player Features
    const showMediaSlider = isMediaPlayer && isAvailable && isActive && hasControls && stateObj.attributes?.volume_level !== undefined;
    // Number / Climate Features
    const showNumberSlider = isNumber && isAvailable && hasControls;
    const showClimateSlider = isClimate && isAvailable && isActive && hasControls && (stateObj.attributes?.temperature !== undefined || stateObj.attributes?.target_temp_high !== undefined);

    // Dynamic CSS Variables & Styles
    const bgOpacity = (this.config.bg_opacity ?? 10) / 100;
    
    const sliderColor = this.config.slider_color 
      ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` 
      : (colorTypeIsCard && isActive && !this.config.use_light_color ? `--slider-color: rgba(255, 255, 255, 0.95);` : `--slider-color: ${activeColor};`);
    const sliderTrackColor = this.config.slider_track_color 
      ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` 
      : (colorTypeIsCard && isActive ? `--slider-track-color: rgba(0, 0, 0, 0.25);` : '');

    // Multi-Stage Fade Transitions & Decay Sliders
    const multiStageFade = this._calculateMultiStageFade(stateObj, defaultActiveColor, inactiveColor);
    const fadeTarget = this.config.fade_target ?? 'card';

    // Card background: when color_type is 'card' or multi-stage fade is active on card
    const resolvedBg = this._resolveColor(this.config.bg_color);
    const fadeColorStr = typeof multiStageFade.currentColor === 'string' 
      ? multiStageFade.currentColor 
      : (Array.isArray(multiStageFade.currentColor) ? `rgb(${multiStageFade.currentColor.join(',')})` : '');

    let rawBgStyle: string;
    if (multiStageFade.activeFade && (fadeTarget === 'card' || fadeTarget === 'all' || colorTypeIsCard)) {
      rawBgStyle = fadeColorStr;
    } else if (colorTypeIsCard) {
      if (domain === 'light') {
        rawBgStyle = isActive ? (liveLightColor || activeColor) : (this.config.inactive_color ? inactiveColor : '#000000');
      } else {
        rawBgStyle = isActive ? activeColor : inactiveColor;
      }
    } else if (resolvedBg) {
      rawBgStyle = resolvedBg;
    } else if (domain === 'light' && !isActive) {
      rawBgStyle = '#000000';
    } else {
      rawBgStyle = `rgba(150, 150, 150, ${bgOpacity})`;
    }

    let effectiveGlowColor = this._resolveColor(this.config.active_color) || (domain === 'light' && liveLightColor ? liveLightColor : activeColor) || 'var(--primary-color)';
    if (multiStageFade.activeFade && (fadeTarget === 'all' || this.config.active_glow === true)) {
      effectiveGlowColor = fadeColorStr;
    }

    let shadowStyle = '';
    if (this.config.box_shadow === 'soft') shadowStyle = 'box-shadow: 0 4px 10px rgba(0,0,0,0.1);';
    if (this.config.box_shadow === 'deep') shadowStyle = 'box-shadow: 0 10px 20px rgba(0,0,0,0.3);';
    if (this.config.box_shadow === 'glow' || this.config.active_glow === true) {
      shadowStyle = (isActive || multiStageFade.activeFade) ? `box-shadow: 0 0 22px ${effectiveGlowColor}, 0 0 45px rgba(255, 255, 255, 0.18);` : '';
    }

    const activeGlowClass = (this.config.active_glow === true || this.config.box_shadow === 'glow') ? 'card-active-glow' : '';
    const devClass = stateObj?.attributes?.device_class;
    const isMotionSensor = domain === 'binary_sensor' && (devClass === 'motion' || devClass === 'occupancy' || devClass === 'presence');
    const isDoorSensor = domain === 'binary_sensor' && (devClass === 'door' || devClass === 'window' || devClass === 'garage_door' || devClass === 'opening');
    const motionActiveClass = isMotionSensor && (isActive || (multiStageFade.activeFade && multiStageFade.currentStage === 1)) ? 'motion-active' : '';
    const doorOpenClass = isDoorSensor && isActive ? 'door-open' : '';
    const hvacClass = domain === 'climate' && stateObj?.attributes?.hvac_action ? `hvac-${stateObj.attributes.hvac_action}` : '';
    const coverMotionClass = domain === 'cover' ? (stateObj?.state === 'opening' ? 'cover-opening' : (stateObj?.state === 'closing' ? 'cover-closing' : '')) : '';
    const cardClasses = `${this._staticCardClasses} ${activeGlowClass} ${motionActiveClass} ${doorOpenClass} ${hvacClass} ${coverMotionClass}`;

    const subButtons = this._getSubButtons();

    // Typography
    let overrideTextVars = '';
    if (this.config.text_color_mode === 'active_accent' && isActive) {
      overrideTextVars += `--primary-text-color: ${activeColor}; `;
    } else if (this.config.text_color_primary) {
      overrideTextVars += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; `;
    } else if (colorTypeIsCard && isActive) {
      overrideTextVars += `--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); `;
    }
    
    if (this.config.text_color_secondary) {
      overrideTextVars += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; `;
    } else if (colorTypeIsCard && isActive) {
      overrideTextVars += `--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); `;
    }

    const isInline = this.config.features_position === 'inline';

    const scrollPrimary = this.config.text_scrolling_primary || 'none';
    const scrollSecondary = this.config.text_scrolling_secondary || 'none';

    // Build main slider block (Primary brightness/domain slider - ALWAYS VISIBLE)
    const mainSliderBlock = html`
      ${showLightSlider ? this._renderLightSlider(stateObj) : nothing}
      ${showCoverSlider ? this._renderCoverSlider(stateObj) : nothing}
      ${showFanSlider ? this._renderFanSlider(stateObj) : nothing}
      ${showHumidifierSlider ? this._renderHumidifierSlider(stateObj) : nothing}
      ${showMediaSlider ? this._renderMediaSlider(stateObj) : nothing}
      ${showNumberSlider ? this._renderNumberSlider(stateObj) : nothing}
      ${showClimateSlider ? this._renderClimateSlider(stateObj) : nothing}
    `;

    // Build secondary slider block (Color Temp, Hue Spectrum, Picker - COLLAPSIBLE)
    const secondarySliderBlock = html`
      ${showColorTemp ? this._renderColorTempSlider(stateObj) : nothing}
      ${showColorSlider ? this._renderColorSlider(stateObj) : nothing}
      ${showColorWheel ? this._renderColorPicker(stateObj) : nothing}
    `;

    const hasMainSlider = showLightSlider || showCoverSlider || showFanSlider || showHumidifierSlider || showMediaSlider || showNumberSlider || showClimateSlider;
    const hasSecondarySliders = showColorTemp || showColorSlider || showColorWheel;
    const hasCollapsible = (!isInline && hasSecondarySliders) || subButtons.length > 0;
    const decayPos = this.config.decay_slider_position ?? 'bottom';
    const sanitizedStyles = this._sanitizedCustomStyles;

    return html`
      ${sanitizedStyles ? html`<style>${unsafeCSS(sanitizedStyles)}</style>` : nothing}
      <ha-card 
        class="${cardClasses}" 
        ?active=${isActive}
        style="${this._staticCardStyles} background: ${rawBgStyle}; ${shadowStyle} ${sliderColor} ${sliderTrackColor} ${overrideTextVars} --ag-glow-color: ${effectiveGlowColor}; --ag-active-color: ${activeColor};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${isInline ? 'features-inline' : ''}" style="justify-content: var(--ag-content-alignment);">
          ${decayPos === 'top' ? this._renderDecaySlider(multiStageFade) : nothing}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${primaryText ? html`
                <div class="text-marquee-container scroll-${scrollPrimary}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${primaryText}</span>
                </div>` : nothing}
              ${secondaryText ? html`
                <div class="text-marquee-container scroll-${scrollSecondary}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${secondaryText}</span>
                </div>` : nothing}
            </div>
            ${decayPos === 'inline' ? html`<div class="inline-sliders">${this._renderDecaySlider(multiStageFade)}</div>` : nothing}
            ${isInline && hasMainSlider ? html`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${mainSliderBlock}</div>` : nothing}
            ${isInline && hasSecondarySliders ? html`<div class="inline-sliders ${this._collapsed ? 'collapsed' : ''}">${secondarySliderBlock}</div>` : nothing}
          </div>
          
          ${decayPos === 'bottom' ? this._renderDecaySlider(multiStageFade) : nothing}
          ${!isInline && hasMainSlider ? html`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${mainSliderBlock}</div>` : nothing}

          ${hasCollapsible ? html`
            <div class="collapsible-wrapper ${this._collapsed ? 'collapsed' : ''}">
              ${!isInline && hasSecondarySliders ? html`<div class="features-container" style="${this._featuresOffsetStyle}">${secondarySliderBlock}</div>` : nothing}

              ${subButtons.length > 0 ? html`
                <div class="sub-buttons-container">
                  ${repeat(
                    subButtons,
                    (sb) => sb.key,
                    (sb) => this._renderSubButton(sb.entity || '', sb.icon, sb.color, sb.bg !== false, sb.name, sb.tapAction, sb.holdAction, sb.type, sb.doubleTapAction, sb.showState)
                  )}
                </div>
              ` : nothing}
            </div>
          ` : nothing}

        </div>
      </ha-card>
    `;
  }

  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  private _renderDecaySlider(fade: FadeCalculationResult) {
    if (!this.config.show_decay_slider || !fade.enabled || !fade.activeFade) {
      return nothing;
    }
    const isGoogle = this.config.slider_style === 'google';
    const sliderHeight = this.config.decay_slider_height ?? (isGoogle ? 32 : 10);
    const sliderRadius = this.config.slider_border_radius ?? (isGoogle ? 16 : 5);
    const remainingPct = Math.max(0, 100 - fade.progressPct);

    return html`
      <div class="decay-slider-container" style="--decay-color: ${fade.currentColor};">
        <div class="decay-slider-track" style="height: ${sliderHeight}px; border-radius: ${sliderRadius}px;">
          <div class="decay-slider-fill" style="width: ${remainingPct}%; background: ${fade.currentColor}; border-radius: ${sliderRadius}px;"></div>
          <span class="decay-slider-badge">${fade.stageLabel}</span>
        </div>
      </div>
    `;
  }

  // --- MULTI-DOMAIN SLIDER RENDERERS ---

  private _renderLightSlider(stateObj: any) {
    return SliderController.renderLightSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderColorTempSlider(stateObj: any) {
    return SliderController.renderColorTempSlider(this.config, stateObj, this._sliderCallbacks, this._colorTempMarginOffsets);
  }

  private _renderColorSlider(stateObj: any) {
    return SliderController.renderColorSlider(this.config, stateObj, this._sliderCallbacks, this._colorHueMarginOffsets);
  }

  private _renderColorPicker(stateObj: any) {
    return SliderController.renderColorPicker(this.config, stateObj, this._sliderCallbacks);
  }

  private _renderCoverSlider(stateObj: any) {
    return SliderController.renderCoverSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderFanSlider(stateObj: any) {
    return SliderController.renderFanSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderMediaSlider(stateObj: any) {
    return SliderController.renderMediaSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderNumberSlider(stateObj: any) {
    return SliderController.renderNumberSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderClimateSlider(stateObj: any) {
    return SliderController.renderClimateSlider(this.config, stateObj, this.hass, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  private _renderHumidifierSlider(stateObj: any) {
    return SliderController.renderHumidifierSlider(this.config, stateObj, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }

  // --- EXTRACTED SUB-BUTTON RENDERERS ---

  private _renderSubSlider(
    entityId: string, stateObj: any, subType: string,
    colorStyle: string, bgClass: string
  ) {
    return SliderController.renderSubSlider(
      this.config, this.hass, entityId, stateObj, subType, colorStyle, bgClass,
      this._throttledCall.bind(this)
    );
  }

  private _renderSubColorPicker(
    entityId: string, stateObj: any,
    colorStyle: string, bgClass: string,
    label?: string, liveStateText?: string | TemplateResult
  ) {
    return SliderController.renderSubColorPicker(
      this.hass, entityId, stateObj, colorStyle, bgClass, this._sliderCallbacks,
      label, liveStateText
    );
  }

  private _renderSubButton(
    entityId: string,
    customIcon?: string,
    customColor?: string,
    showBg = true,
    label?: string,
    tapAction?: any,
    holdAction?: any,
    subType: string = 'button',
    doubleTapAction?: any,
    showState = false
  ) {
    const stateObj = entityId ? this.hass?.states[entityId] : this.hass?.states[this.config.entity || ''];
    const isActive = this._isEntityActive(stateObj);

    const colorStyle = customColor ? `color: ${customColor};` : '';
    const bgClass = showBg ? '' : 'no-bg';
    const dynamicSubColor = customColor ? this._resolveColor(customColor) : undefined;

    if (subType === 'slider' || subType === 'google_slider') {
      const sliderColorStyle = customColor ? `--primary-color: ${customColor}; --slider-color: ${customColor};` : '';
      return this._renderSubSlider(entityId, stateObj, subType, sliderColorStyle, bgClass);
    }

    let liveStateText: string | TemplateResult | undefined;
    if (showState && stateObj) {
      liveStateText = this._getInfoContent('state', stateObj);
    }

    const domain = (entityId || this.config.entity || '').split('.')[0];
    if (subType === 'color_picker' && (domain === 'light' || (!entityId && this.config.entity?.startsWith('light.')))) {
      return this._renderSubColorPicker(entityId, stateObj, colorStyle, bgClass, label, liveStateText);
    }

    return SubButtonController.renderSubButton(
      this.config,
      this.hass,
      entityId,
      customIcon,
      customColor,
      showBg,
      label,
      tapAction,
      holdAction,
      subType,
      doubleTapAction,
      showState,
      isActive,
      dynamicSubColor,
      liveStateText,
      this._subButtonCallbacks
    );
  }

  // --- STATIC STYLES ---

  static get styles() {
    return antigravityCardStyles;
  }
}

if (!customElements.get('antigravity-no-icon-card')) {
  customElements.define('antigravity-no-icon-card', AntigravityCard);
}
if (!customElements.get('antigravity-card')) {
  customElements.define('antigravity-card', AntigravityCard);
}


