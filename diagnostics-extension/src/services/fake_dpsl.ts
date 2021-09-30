// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Mock dpsl package.
 * To be replaced by dpsl package.
 */

import { Routine } from './fake_routine';

export const dpsl = {
  diagnostics: {
    getAvailableRoutines: async (): Promise<Array<string>> => {
      return ["battery-capacity", "battery-charge", "battery-discharge",
        "battery-health", "cpu-cache", "cpu-stress", "memory"];
    },
    battery: {
      runCapacityRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
      runChargeRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
      runDischargeRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
      runHealthRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
    },
    cpu: {
      runCacheRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
      runStressRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
    },
    memory: {
      runMemoryRoutine: async (): Promise<Routine> => {
        return new Routine(123456);
      },
    },
  },
};
