// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview DiagnosticsModule defines module for the diagnostics components.
 * Imported by app.module.ts
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatteryComponent } from './battery/battery.component';

@NgModule({
  declarations: [
    BatteryComponent
  ],
  imports: [CommonModule],
})
export class DiagnosticsModule {}
