// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for telemetry.service
 */

import {
  TelemetryService,
  TelemetryServiceProvider,
} from './telemetry.service';
import * as fakeData from './fake_telemetry.data';
import { DpslTypes } from './common/dpsl.types';

describe('should return instance of FakeTelemetryService', () => {
  const telemetryService: TelemetryService =
    TelemetryServiceProvider.getProvider();

  test('should create telemetryService', () => {
    expect(telemetryService).toBeTruthy();
  });

  test('should return same instance of telemetryService', () => {
    const dupTelemetryService: TelemetryService =
      TelemetryServiceProvider.getProvider();
    expect(dupTelemetryService).toStrictEqual(telemetryService);
  });

  const tests: { name: string; expected: DpslTypes }[] = [
    {
      name: 'getBacklightInfo',
      expected: fakeData.backlightInfo(),
    },
    {
      name: 'getBatteryInfo',
      expected: fakeData.batteryInfo(),
    },
    {
      name: 'getBluetoothInfo',
      expected: fakeData.bluetoothInfo(),
    },
    {
      name: 'getCachedVpdInfo',
      expected: fakeData.vpdInfo(),
    },
    {
      name: 'getCpuInfo',
      expected: fakeData.cpuInfo(),
    },
    {
      name: 'getFanInfo',
      expected: fakeData.fanInfo(),
    },
    {
      name: 'getMemoryInfo',
      expected: fakeData.memoryInfo(),
    },
    {
      name: 'getNonRemovableBlockDevicesInfo',
      expected: fakeData.blockDeviceInfo(),
    },
    {
      name: 'getStatefulPartitionInfo',
      expected: fakeData.statefulPartitionInfo(),
    },
    {
      name: 'getTimezoneInfo',
      expected: fakeData.timezoneInfo(),
    },
  ];

  tests.forEach((method) => {
    test(`should fetch correct data from ${method.name}`, async () => {
      const data = await telemetryService[
        method.name as keyof TelemetryService
      ]();
      expect(data).toStrictEqual(method.expected);
    });
  });
});
