// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to telemetry
 */

import { dpsl as dpslImpl, Routine as DPSLRoutine } from 'cros-dpsl-js';

import { DiagnosticsParams, RoutineStatus } from '@common/dpsl';
import {
  DiagnosticsRoutineName,
  ResponseErrorInfoMessage,
} from '@common/message';
import { dpsl as fakeDpsl } from './fake_dpsl';
import { Routine as FakeRoutine } from './fake_routine';
import { environment } from '../environments/environment';

type Routine = DPSLRoutine | FakeRoutine;

let dpsl = dpslImpl;
if (environment.testModeEnabled) {
  dpsl = fakeDpsl;
}

export function mapRoutineNameToMethod(name: DiagnosticsRoutineName): (params?: DiagnosticsParams) => Promise<Routine> {
  switch (name) {
    case DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE:
      return dpsl.diagnostics.battery.runCapacityRoutine;
    case DiagnosticsRoutineName.RUN_BATTERY_CHARGE_ROUTINE:
      return dpsl.diagnostics.battery.runChargeRoutine;
    case DiagnosticsRoutineName.RUN_BATTERY_DISCHARGE_ROUTINE:
      return dpsl.diagnostics.battery.runDischargeRoutine;
    case DiagnosticsRoutineName.RUN_BATTERY_HEALTH_ROUTINE:
      return dpsl.diagnostics.battery.runHealthRoutine;
    case DiagnosticsRoutineName.RUN_CPU_CACHE_ROUTINE:
      return dpsl.diagnostics.cpu.runCacheRoutine;
    case DiagnosticsRoutineName.RUN_CPU_STRESS_ROUTINE:
      return dpsl.diagnostics.cpu.runStressRoutine;
    case DiagnosticsRoutineName.RUN_MEMORY_ROUTINE:
      return dpsl.diagnostics.memory.runMemoryRoutine;
  }
  throw new Error(ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName);
}

/**
 * Abstract class reprensenting the interface of
 * service to run diagnostic routines
 */
export abstract class DiagnosticsService {
  abstract getAvailableRoutines(): Promise<Array<string>>;
  abstract runRoutine(
    name: DiagnosticsRoutineName,
    params?: DiagnosticsParams
  ): Promise<number>;
  abstract stopRoutine(id: number): Promise<RoutineStatus>;
  abstract resumeRoutine(id: number): Promise<RoutineStatus>;
  abstract getRoutineStatus(id: number): Promise<RoutineStatus>;
}

/**
 * Implementation of DiagnosticsService
 * @extends DiagnosticsService
 */
export class DiagnosticsServiceImpl implements DiagnosticsService {
  private _activeRoutines: { [key: number]: Routine } = {};

  private _fetchRoutineById = (id: number) => {
    if (!(id in this._activeRoutines)) {
      throw new Error(ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId);
    }
    return this._activeRoutines[id];
  };

  getAvailableRoutines = async (): Promise<Array<string>> => {
    return dpsl.diagnostics.getAvailableRoutines();
  }
  runRoutine = async (
    name: DiagnosticsRoutineName,
    params?: DiagnosticsParams
  ): Promise<number> => {
    params && console.log('Recieved params', params);
    const dpslRoutineMethod = mapRoutineNameToMethod(name);
    return dpslRoutineMethod(params).then((routine: Routine) => {
      this._activeRoutines[routine.id] = routine;
      return routine.id;
    });
  };
  stopRoutine = async (id: number): Promise<RoutineStatus> => {
    const routine = this._fetchRoutineById(id);
    delete this._activeRoutines[id];
    return routine.stop();
  };
  resumeRoutine = async (id: number): Promise<RoutineStatus> => {
    const routine = this._fetchRoutineById(id);
    return routine.resume();
  };
  getRoutineStatus = async (id: number): Promise<RoutineStatus> => {
    const routine = this._fetchRoutineById(id);
    return routine.getStatus();
  };
}

export class DiagnosticsServiceProvider {
  private static instance: DiagnosticsService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getDiagnosticsService(): DiagnosticsService {
    if (!this.instance) {
      this.instance = new DiagnosticsServiceImpl();
    }
    return this.instance;
  }
}
