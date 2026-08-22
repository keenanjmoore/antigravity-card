import { describe, it, expect } from 'vitest';
import { EntityFilterEngine } from '../src/controllers/entity-filter-engine';

describe('EntityFilterEngine in Antigravity Card (Labels, Devices, Areas, Sorting)', () => {
  const mockHass: any = {
    states: {
      'light.living_room': { state: 'on', attributes: { friendly_name: 'Living Room Light', brightness: 255 }, last_changed: '2026-08-22T12:00:00Z' },
      'light.kitchen': { state: 'off', attributes: { friendly_name: 'Kitchen Light', brightness: 0 }, last_changed: '2026-08-22T11:00:00Z' },
      'switch.fan': { state: 'on', attributes: { friendly_name: 'Ceiling Fan' }, last_changed: '2026-08-22T13:00:00Z' },
      'binary_sensor.front_door': { state: 'on', attributes: { friendly_name: 'Front Door' }, last_changed: '2026-08-22T14:00:00Z' },
      'climate.thermostat': { state: 'heat', attributes: { friendly_name: 'Living Room Thermostat' }, last_changed: '2026-08-22T10:00:00Z' },
    },
    entities: {
      'light.living_room': { entity_id: 'light.living_room', labels: ['lights', 'favorite'], area_id: 'living_room', device_id: 'dev_lr_light' },
      'light.kitchen': { entity_id: 'light.kitchen', labels: ['lights'], area_id: 'kitchen' },
      'switch.fan': { entity_id: 'switch.fan', labels: ['fans'], device_id: 'dev_fan' },
      'binary_sensor.front_door': { entity_id: 'binary_sensor.front_door', labels: ['security'], area_id: 'entryway' },
      'climate.thermostat': { entity_id: 'climate.thermostat', device_id: 'dev_thermostat' },
    },
    devices: {
      'dev_lr_light': { id: 'dev_lr_light', labels: ['dimmable'], area_id: 'living_room' },
      'dev_fan': { id: 'dev_fan', labels: ['cooling'], area_id: 'living_room' },
      'dev_thermostat': { id: 'dev_thermostat', labels: ['climate', 'favorite'], area_id: 'living_room' },
    },
    areas: {
      'living_room': { area_id: 'living_room', labels: ['main_floor'] },
      'kitchen': { area_id: 'kitchen', labels: ['main_floor'] },
      'entryway': { area_id: 'entryway', labels: ['perimeter'] },
    },
  };

  it('filters entities by direct entity labels', () => {
    const matched = EntityFilterEngine.filterEntities(mockHass, { labels: ['lights'] });
    expect(matched).toEqual(['light.living_room', 'light.kitchen']);
  });

  it('resolves inherited labels from devices and areas', () => {
    const matchedDimmable = EntityFilterEngine.filterEntities(mockHass, { labels: ['dimmable'] });
    expect(matchedDimmable).toEqual(['light.living_room']);

    const matchedMainFloor = EntityFilterEngine.filterEntities(mockHass, { labels: ['main_floor'] });
    expect(matchedMainFloor).toContain('light.living_room');
    expect(matchedMainFloor).toContain('light.kitchen');
  });

  it('filters by multiple label intersections', () => {
    const matched = EntityFilterEngine.filterEntities(mockHass, { labels: ['lights', 'favorite'] });
    expect(matched).toEqual(['light.living_room']);
  });

  it('filters by area and domain combination', () => {
    const matched = EntityFilterEngine.filterEntities(mockHass, { areas: ['living_room'], domains: ['light'] });
    expect(matched).toEqual(['light.living_room']);
  });

  it('sorts entities by brightness descending', () => {
    const matched = EntityFilterEngine.filterEntities(mockHass, { domains: ['light'], sortBy: 'brightness', sortOrder: 'desc' });
    expect(matched).toEqual(['light.living_room', 'light.kitchen']);
  });
});
