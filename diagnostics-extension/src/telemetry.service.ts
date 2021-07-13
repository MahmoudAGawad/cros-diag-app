// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to telemetry
 */

import {
  BacklightInfo,
  BatteryInfo,
  BlockDeviceInfo,
  BluetoothInfo,
  CpuInfo,
  FanInfo,
  MemoryInfo,
  StatefulPartitionInfo,
  TimezoneInfo,
  VpdInfo,
} from './dpsl.types';
import * as fakeData from './fake_telemetry.data';

/**
 * Abstract class reprensenting the interface of
 * service to fetch system telemetry data
 */
export abstract class TelemetryService {
  abstract getBacklightInfo(): Promise<BacklightInfo>;
  abstract getBatteryInfo(): Promise<BatteryInfo>;
  abstract getBluetoothInfo(): Promise<BluetoothInfo>;
  abstract getCachedVpdInfo(): Promise<VpdInfo>;
  abstract getCpuInfo(): Promise<CpuInfo>;
  abstract getFanInfo(): Promise<FanInfo>;
  abstract getMemoryInfo(): Promise<MemoryInfo>;
  abstract getNonRemovableBlockDevicesInfo(): Promise<BlockDeviceInfo>;
  abstract getStatefulPartitionInfo(): Promise<StatefulPartitionInfo>;
  abstract getTimezoneInfo(): Promise<TimezoneInfo>;
}

/**
 * Fake implementation of TelemetryService. Used in unit tests.
 * @extends TelemetryService
 */
export class FakeTelemetryService extends TelemetryService {
  async getBacklightInfo(): Promise<BacklightInfo> {
    return fakeData.backlightInfo();
  }
  async getBatteryInfo(): Promise<BatteryInfo> {
    return fakeData.batteryInfo();
  }
  async getBluetoothInfo(): Promise<BluetoothInfo> {
    return fakeData.bluetoothInfo();
  }
  async getCachedVpdInfo(): Promise<VpdInfo> {
    return fakeData.vpdInfo();
  }
  async getCpuInfo(): Promise<CpuInfo> {
    return fakeData.cpuInfo();
  }
  async getFanInfo(): Promise<FanInfo> {
    return fakeData.fanInfo();
  }
  async getMemoryInfo(): Promise<MemoryInfo> {
    return fakeData.memoryInfo();
  }
  async getNonRemovableBlockDevicesInfo(): Promise<BlockDeviceInfo> {
    return fakeData.blockDeviceInfo();
  }
  async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return fakeData.statefulPartitionInfo();
  }
  async getTimezoneInfo(): Promise<TimezoneInfo> {
    return fakeData.timezoneInfo();
  }
}

/**
 * Singleton provider for instance of Telemetry Service
 * Returns a fake telemetry service implementation
 * @extends TelemetryService
 */
export class TelemetryServiceProvider {
  private static instance: TelemetryService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getProvider(): TelemetryService {
    if (!TelemetryServiceProvider.instance) {
      TelemetryServiceProvider.instance = new FakeTelemetryService();
    }
    return TelemetryServiceProvider.instance;
  }
}
