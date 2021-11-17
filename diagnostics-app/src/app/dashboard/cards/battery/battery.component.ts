// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the battery card component for dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BatteryInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

@Component({
  selector: 'app-battery-card',
  templateUrl: './battery.component.html',
  styleUrls: ['../card.css', './battery.component.css'],
})
export class BatteryComponent implements OnInit, OnDestroy {
  private _refreshIntervalMs: number = refreshIntervals.Battery;
  private _intervalId!: number;
  private _batteryData!: BatteryInfo;

  private _updateData() {
    this.telemetryService.fetchBatteryInfo().then((value: BatteryInfo) => {
      this._batteryData = value;
    });
  }

  constructor(private telemetryService: TelemetryService) {
    this._updateData();
  }

  ngOnInit(): void {
    this._intervalId = window.setInterval(() => {
      this._updateData();
    }, this._refreshIntervalMs);
  }

  get batteryData(): BatteryInfo {
    return this._batteryData;
  }

  get batteryChargeRemaining(): number {
    if (this._batteryData.chargeFull === 0) return 0;
    return Math.ceil(
      (this._batteryData.chargeNow / this._batteryData.chargeFull) * 100
    );
  }

  get batteryTemperature(): BigInt {
    if (!this._batteryData.temperature) return BigInt(0);
    return BigInt(this._batteryData.temperature);
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
