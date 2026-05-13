/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LayerConfig {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  type: 'base' | 'thematic' | 'vector';
  source?: string;
}

export interface SpatialMetric {
  label: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface MapState {
  center: [number, number];
  zoom: number;
  activeLayers: string[];
}
