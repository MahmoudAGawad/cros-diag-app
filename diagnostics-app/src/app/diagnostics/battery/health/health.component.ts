// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the battery capacity component.
 * Imported by dashboard.module.ts
 */

import { Component, OnInit } from '@angular/core';
import { DiagnosticsResponse, DiagnosticsRoutineName } from '@common/message';
import { DiagnosticsService } from 'src/app/core/services/diagnostics.service';

@Component({
  selector: 'app-diagostics-battery-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
})
export class HealthComponent implements OnInit {
  private _activeRoutine: DiagnosticsResponse | null = null;
  private _routineName = DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE;

  displayRoutine = false;
  status = '';
  mode: 'none' | 'query' | 'determinate' = 'none';
  progressPercentage = 0;

  resetBar() {
    this.mode = 'none';
    this.progressPercentage = 0;
    this.displayRoutine = false;
    this.status = '';
  }

  displayQueryBar() {
    this.mode = 'query';
    this.status = 'Starting routine, please wait';
  }

  runAnimation() {
    this.status = 'Running routine';
    this.mode = 'determinate';

    const animationSpeed = 30;

    let animate = window.setInterval(() => {
      this.progressPercentage++;
      if (this.progressPercentage === 100) {
        window.clearInterval(animate);
      }
    }, animationSpeed);

    window.setTimeout(() => {
      this.startRoutine();
    }, animationSpeed * 100);
  }

  startSequence() {
    this.displayQueryBar();
    setTimeout(() => {
      this.runAnimation();
    }, 2000);
  }

  constructor(private diagService: DiagnosticsService) {}

  get isRoutineActive(): boolean {
    return this._activeRoutine !== null;
  }

  get activeRoutine(): DiagnosticsResponse | null {
    return this._activeRoutine;
  }

  ngOnInit(): void {}

  async startRoutine() {
    this._activeRoutine = await this.diagService.runRoutine(this._routineName);
    this.displayRoutine = true;
    this.status = 'Test completed successfully!';
    console.log(this._activeRoutine);
  }

  async stopRoutine() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.stopRoutine(routineId);
    this.status = 'Reset in progress!';
    window.setTimeout(() => {
      this._activeRoutine = null;
      this.resetBar();
    }, 1000);
  }

  async resumeRoutine() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.resumeRoutine(routineId);
  }

  async refreshRoutineStatus() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.getRoutineStatus(routineId);
  }
}
