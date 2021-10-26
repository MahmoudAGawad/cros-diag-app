// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the timezone card component for dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnInit } from '@angular/core';
import { TimezoneInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';

@Component({
  selector: 'app-timezone-card',
  templateUrl: './timezone.component.html',
  styleUrls: ['../card.css', './timezone.component.css'],
})
export class TimezoneComponent implements OnInit {
  private _timezoneData!: TimezoneInfo;
  private _updateData() {
    this.telemetryService.fetchTimezoneInfo().then((value: TimezoneInfo) => {
      this._timezoneData = value;
    });
  }

  constructor(private telemetryService: TelemetryService) {
    this._updateData();
  }

  ngOnInit(): void {}

  get timezoneData(): TimezoneInfo {
    return this._timezoneData;
  }
}
