// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake telemetry data.
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
} from '@common/dpsl';

export const backlightInfo = (): BacklightInfo => [
  {
    brightness: 76,
    maxBrightness: 100,
    path: 'unknown',
  },
];

export const bluetoothInfo = (): BluetoothInfo => [
  {
    address: '94:DB:56:E6:AA:78',
    name: 'Headphone',
    numConnectedDevices: 1,
    powered: true,
  },
];

export const vpdInfo = (): VpdInfo => ({
  skuNumber: 'sku',
  serialNumber: 'serial-number',
  modelName: 'model',
});

export const fanInfo = (): FanInfo => [
  {
    speedRpm: 2345,
  },
  {
    speedRpm: 3245,
  },
  {
    speedRpm: 1345,
  },
  {
    speedRpm: 1350,
  },
];

export const memoryInfo = (): MemoryInfo => ({
  totalMemoryKib: 2000500,
  freeMemoryKib: 1245500,
  availableMemoryKib: 755000,
  pageFaultsSinceLastBoot: BigInt(1200000034),
});

export const blockDeviceInfo = (): BlockDeviceInfo => [
  {
    path: 'path',
    size: BigInt(12300000),
    type: 'type',
    manufacturerId: 1445,
    name: 'name',
    serial: '45xx-233-bvf',
    bytesReadSinceLastBoot: BigInt(12300000),
    bytesWrittenSinceLastBoot: BigInt(12300000),
    readTimeSecondsSinceLastBoot: BigInt(12300000),
    writeTimeSecondsSinceLastBoot: BigInt(12300000),
    ioTimeSecondsSinceLastBoot: BigInt(12300000),
    discardTimeSecondsSinceLastBoot: BigInt(12300000),
  },
];

export const timezoneInfo = (): TimezoneInfo => ({
  posix: 'IST-5:30',
  region: 'India',
});

export const statefulPartitionInfo = (): StatefulPartitionInfo => ({
  availableSpace: BigInt(1340000),
  totalSpace: BigInt(2005000),
});

export const batteryInfo = (): BatteryInfo => ({
  cycleCount: BigInt(75),
  voltageNow: 14,
  vendor: 'google',
  serialNumber: 'test-bat-111',
  chargeFullDesign: 100,
  chargeFull: 98,
  voltageMinDesign: 12,
  modelName: 'best-model-111x',
  chargeNow: 76,
  currentNow: 4,
  technology: 'plutonium',
  status: 'good',
  manufactureDate: '2019-07-09T16:59:39.787Z',
  temperature: BigInt(43),
});

export const cpuInfo = (): CpuInfo => ({
  numTotalThreads: 2000,
  architecture: 'x64',
  physicalCpus: [
    {
      modelName: 'intel i7-8850 8th gen',
      logicalCpus: [
        {
          AcStates: [
            {
              name: 'ac1',
              timeInStateSinceLastBootUs: 10300,
            },
          ],
          IdleTimeMs: 5030,
          ScalingCurrentFrequencyKhz: 1100,
          ScalingMaxFrequencyKhz: 2000,
          maxClockSpeedKhz: 3000,
        },
      ],
    },
  ],
});
