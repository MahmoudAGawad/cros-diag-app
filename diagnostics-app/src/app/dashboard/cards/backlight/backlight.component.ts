// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the backlight card component for dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BacklightInfo, BacklightInfoObject } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

@Component({
  selector: 'app-backlight-card',
  templateUrl: './backlight.component.html',
  styleUrls: ['../card.css', './backlight.component.css'],
})
export class BacklightComponent implements OnInit, OnDestroy {
  private _refreshIntervalMs: number = refreshIntervals.Backlight;
  private _intervalId!: number;
  private _backlightData!: BacklightInfo;

  private _updateData() {
    this.telemetryService.fetchBacklightInfo().then((value: BacklightInfo) => {
      this._backlightData = value;
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

  get backlightData(): BacklightInfo {
    return this._backlightData;
  }

  toPercentBacklight(backlight: BacklightInfoObject): number {
    if (backlight.maxBrightness === 0) return 0;
    return (backlight.brightness / backlight.maxBrightness) * 100;
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
