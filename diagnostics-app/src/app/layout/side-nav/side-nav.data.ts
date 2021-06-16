// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines interfaces and data for items to be displayed
 * in the side-nav component.
 */

export interface NavigationItem {
  icon: string;
  link: string;
  name: string;
}

export interface NavigationList {
  header?: string;
  items: NavigationItem[];
  hasHeader: boolean;
}

export const DASHBOARD_NAV_DATA: NavigationList = {
  hasHeader: false,
  items: [{ icon: 'home', link: '/', name: 'Dashboard' }],
};

export const METRICS_NAV_DATA: NavigationList = {
  header: 'Metrics',
  hasHeader: true,
  items: [
    { icon: 'memory', link: '/', name: 'CPU' },
    { icon: 'laptop_chromebook', link: '/', name: 'RAM' },
    { icon: 'bluetooth', link: '/', name: 'Bluetooth' },
    { icon: 'battery_full', link: '/', name: 'Battery' },
    { icon: 'ac_unit', link: '/', name: 'Cooling' },
    { icon: 'storage', link: '/', name: 'Storage' },
  ],
};

export const DIAGNOSTICS_NAV_DATA: NavigationList = {
  header: 'Diagnostics',
  hasHeader: true,
  items: [
    { icon: 'memory', link: '/', name: 'CPU' },
    { icon: 'storage', link: '/', name: 'Disk' },
    { icon: 'battery_full', link: '/', name: 'Battery' },
    { icon: 'power', link: '/', name: 'Power' },
    { icon: 'storage', link: '/', name: 'NVMe' },
  ],
};
