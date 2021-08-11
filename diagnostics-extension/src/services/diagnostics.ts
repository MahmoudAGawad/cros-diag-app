// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to telemetry
 */

import { DiagnosticsParams, RoutineStatus } from '@common/dpsl';
import { DiagnosticsRoutineName } from '@common/message';
import { dpsl } from './fake_dpsl';
import { Routine } from './fake_routine';

/**
 * Abstract class reprensenting the interface of
 * service to run diagnostic routines
 */
export abstract class DiagnosticsService {
  abstract runRoutine(
    name: DiagnosticsRoutineName,
    params?: DiagnosticsParams
  ): number;
  abstract stopRoutine(id: number): Promise<RoutineStatus>;
  abstract resumeRoutine(id: number): Promise<RoutineStatus>;
  abstract getRoutineStatus(id: number): Promise<RoutineStatus>;
}

const mapRoutineNameToMethod = (name: DiagnosticsRoutineName) => {
  switch (name) {
    case DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE:
      return dpsl.diagnostics.battery.runCapacityRoutine;
    default:
      return null;
  }
};

/**
 * Fake implementation of DiagnosticsService
 * @extends DiagnosticsService
 */
export class FakeDiagnosticsService implements DiagnosticsService {
  runRoutine(name: DiagnosticsRoutineName, params?: DiagnosticsParams): number {
    params && console.log('Recieved params', params);
    const routineMethod = mapRoutineNameToMethod(name);
    if (!routineMethod) return -1;
    const routine = routineMethod();
    return routine.id;
  }
  stopRoutine(id: number): Promise<RoutineStatus> {
    const routine = new Routine(id);
    return routine.stop();
  }
  resumeRoutine(id: number): Promise<RoutineStatus> {
    const routine = new Routine(id);
    return routine.resume();
  }
  getRoutineStatus(id: number): Promise<RoutineStatus> {
    const routine = new Routine(id);
    return routine.getStatus();
  }
}

export class DiagnosticsServiceProvider {
  private static instance: DiagnosticsService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getDiagnosticsService(): DiagnosticsService {
    if (!this.instance) {
      this.instance = new FakeDiagnosticsService();
    }
    return this.instance;
  }
}
