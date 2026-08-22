import type { HomeAssistant } from 'custom-card-helpers';

export interface EntityFilterQuery {
  labels?: string[];
  areas?: string[];
  domains?: string[];
  devices?: string[];
  states?: string[];
  integration?: string;
  sortBy?: 'name' | 'state' | 'last_changed' | 'brightness' | 'domain' | 'entity_id';
  sortOrder?: 'asc' | 'desc';
  activeOnly?: boolean;
}

export interface InvertedRegistryIndex {
  labelMap: Map<string, Set<string>>;
  areaMap: Map<string, Set<string>>;
  deviceMap: Map<string, Set<string>>;
  domainMap: Map<string, Set<string>>;
  queryCache: Map<string, readonly string[]>;
  entityCount: number;
}

export class EntityFilterEngine {
  private static _registryCache = new WeakMap<object, InvertedRegistryIndex>();
  private static _sortKeyCache = new Map<string, string>();

  /**
   * Builds or retrieves the inverted label, area, device, and domain index.
   */
  public static getOrBuildIndex(hass: HomeAssistant | any): InvertedRegistryIndex {
    const entities = hass?.entities || {};
    const cached = this._registryCache.get(entities);
    if (cached) return cached;

    const labelMap = new Map<string, Set<string>>();
    const areaMap = new Map<string, Set<string>>();
    const deviceMap = new Map<string, Set<string>>();
    const domainMap = new Map<string, Set<string>>();
    const queryCache = new Map<string, readonly string[]>();

    const devices = hass?.devices || {};
    const areas = hass?.areas || {};

    let count = 0;

    const addEntry = (map: Map<string, Set<string>>, key: string, entityId: string) => {
      let set = map.get(key);
      if (!set) {
        set = new Set<string>();
        map.set(key, set);
      }
      set.add(entityId);
    };

    const entityEntries = Object.entries(entities);
    if (entityEntries.length > 0) {
      for (let i = 0; i < entityEntries.length; i++) {
        const [entityId, entry] = entityEntries[i] as [string, any];
        count++;

        const dot = entityId.indexOf('.');
        const domain = dot === -1 ? 'unknown' : entityId.slice(0, dot);
        addEntry(domainMap, domain, entityId);

        if (entry?.labels && Array.isArray(entry.labels)) {
          for (let j = 0; j < entry.labels.length; j++) {
            addEntry(labelMap, entry.labels[j], entityId);
          }
        }

        let entityAreaId = entry?.area_id;
        const deviceId = entry?.device_id;
        if (deviceId) {
          addEntry(deviceMap, deviceId, entityId);
          const dev = devices[deviceId];
          if (dev) {
            if (dev.labels && Array.isArray(dev.labels)) {
              for (let j = 0; j < dev.labels.length; j++) {
                addEntry(labelMap, dev.labels[j], entityId);
              }
            }
            if (!entityAreaId && dev.area_id) {
              entityAreaId = dev.area_id;
            }
          }
        }

        if (entityAreaId) {
          addEntry(areaMap, entityAreaId, entityId);
          const ar = areas[entityAreaId];
          if (ar?.labels && Array.isArray(ar.labels)) {
            for (let j = 0; j < ar.labels.length; j++) {
              addEntry(labelMap, ar.labels[j], entityId);
            }
          }
        }
      }
    } else if (hass?.states) {
      const stateKeys = Object.keys(hass.states);
      count = stateKeys.length;
      for (let i = 0; i < count; i++) {
        const entityId = stateKeys[i]!;
        const dot = entityId.indexOf('.');
        const domain = dot === -1 ? 'unknown' : entityId.slice(0, dot);
        addEntry(domainMap, domain, entityId);
      }
    }

    const index: InvertedRegistryIndex = {
      labelMap,
      areaMap,
      deviceMap,
      domainMap,
      queryCache,
      entityCount: count,
    };

    if (entities && typeof entities === 'object') {
      this._registryCache.set(entities, index);
    }
    return index;
  }

  /**
   * Evaluates query filters with O(1) set operations and returns matched sorted entity IDs.
   */
  public static filterEntities(hass: HomeAssistant | any, query: EntityFilterQuery): string[] {
    if (!hass || !hass.states) return [];
    const index = this.getOrBuildIndex(hass);

    const qKey = (query.labels ? `l:${query.labels.join(',')}|` : '') +
                 (query.areas ? `a:${query.areas.join(',')}|` : '') +
                 (query.domains ? `d:${query.domains.join(',')}|` : '') +
                 (query.devices ? `dev:${query.devices.join(',')}|` : '');

    let candidateArray: readonly string[] | undefined = undefined;
    if (qKey) {
      candidateArray = index.queryCache.get(qKey);
    }

    if (!candidateArray) {
      let candidates: Set<string> | null = null;

      if (query.labels && query.labels.length > 0) {
        for (let i = 0; i < query.labels.length; i++) {
          const label = query.labels[i]!;
          const matched = index.labelMap.get(label) || new Set<string>();
          if (candidates === null) {
            candidates = new Set(matched);
          } else {
            for (const id of candidates) {
              if (!matched.has(id)) {
                candidates.delete(id);
              }
            }
          }
          if (candidates.size === 0) return [];
        }
      }

      if (query.areas && query.areas.length > 0) {
        const areaCandidates = new Set<string>();
        for (let i = 0; i < query.areas.length; i++) {
          const ar = query.areas[i]!;
          const matched = index.areaMap.get(ar);
          if (matched) {
            for (const id of matched) areaCandidates.add(id);
          }
        }
        if (candidates === null) {
          candidates = areaCandidates;
        } else {
          for (const id of candidates) {
            if (!areaCandidates.has(id)) candidates.delete(id);
          }
        }
        if (candidates.size === 0) return [];
      }

      if (query.domains && query.domains.length > 0) {
        const domainCandidates = new Set<string>();
        for (let i = 0; i < query.domains.length; i++) {
          const dom = query.domains[i]!;
          const matched = index.domainMap.get(dom);
          if (matched) {
            for (const id of matched) domainCandidates.add(id);
          }
        }
        if (candidates === null) {
          candidates = domainCandidates;
        } else {
          for (const id of candidates) {
            if (!domainCandidates.has(id)) candidates.delete(id);
          }
        }
        if (candidates.size === 0) return [];
      }

      candidateArray = Object.freeze(candidates !== null ? Array.from(candidates) : Object.keys(hass.states));
      if (qKey) {
        index.queryCache.set(qKey, candidateArray);
      }
    }

    const hasStateFilter = !!(query.activeOnly || (query.states && query.states.length > 0));
    if (!hasStateFilter && !query.sortBy) {
      return candidateArray.slice();
    }

    const filtered: string[] = [];
    for (let i = 0; i < candidateArray.length; i++) {
      const id = candidateArray[i]!;
      const stateObj = hass.states[id];
      if (!stateObj) continue;

      if (query.activeOnly) {
        const st = stateObj.state;
        if (st === 'off' || st === 'unavailable' || st === 'unknown' || st === 'closed' || st === 'idle') {
          continue;
        }
      }

      if (query.states && query.states.length > 0) {
        if (!query.states.includes(stateObj.state)) {
          continue;
        }
      }

      filtered.push(id);
    }

    if (query.sortBy) {
      this.sortEntities(filtered, hass, query.sortBy, query.sortOrder || 'asc');
    }

    return filtered;
  }

  /**
   * Fast integer/string comparator using memoized sort keys.
   */
  public static sortEntities(
    entityIds: string[],
    hass: HomeAssistant | any,
    sortBy: 'name' | 'state' | 'last_changed' | 'brightness' | 'domain' | 'entity_id' = 'name',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): void {
    const mult = sortOrder === 'desc' ? -1 : 1;

    switch (sortBy) {
      case 'brightness': {
        entityIds.sort((a, b) => {
          const valA = hass.states[a]?.attributes?.brightness ?? 0;
          const valB = hass.states[b]?.attributes?.brightness ?? 0;
          return (valA - valB) * mult;
        });
        break;
      }
      case 'last_changed': {
        entityIds.sort((a, b) => {
          const tA = hass.states[a] ? Date.parse(hass.states[a].last_changed) || 0 : 0;
          const tB = hass.states[b] ? Date.parse(hass.states[b].last_changed) || 0 : 0;
          return (tA - tB) * mult;
        });
        break;
      }
      case 'domain': {
        entityIds.sort((a, b) => {
          const domA = a.slice(0, a.indexOf('.'));
          const domB = b.slice(0, b.indexOf('.'));
          return domA.localeCompare(domB) * mult;
        });
        break;
      }
      case 'state': {
        entityIds.sort((a, b) => {
          const stA = hass.states[a]?.state ?? '';
          const stB = hass.states[b]?.state ?? '';
          return stA.localeCompare(stB) * mult;
        });
        break;
      }
      case 'entity_id': {
        entityIds.sort((a, b) => a.localeCompare(b) * mult);
        break;
      }
      case 'name':
      default: {
        entityIds.sort((a, b) => {
          let nameA = this._sortKeyCache.get(a);
          if (!nameA) {
            nameA = String(hass.states[a]?.attributes?.friendly_name || a).toLowerCase();
            this._sortKeyCache.set(a, nameA);
          }
          let nameB = this._sortKeyCache.get(b);
          if (!nameB) {
            nameB = String(hass.states[b]?.attributes?.friendly_name || b).toLowerCase();
            this._sortKeyCache.set(b, nameB);
          }
          return nameA.localeCompare(nameB) * mult;
        });
        break;
      }
    }
  }
}
