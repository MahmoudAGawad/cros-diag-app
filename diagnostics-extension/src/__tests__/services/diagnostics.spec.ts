// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/services/diagnostics
 */

import {
  DiagnosticsService,
  DiagnosticsServiceProvider,
  mapRoutineNameToMethod,
} from '../../services/diagnostics';
import { RoutineStatus } from '@common/dpsl';
import {
  DiagnosticsRoutineName,
  ResponseErrorInfoMessage,
} from '@common/message';
import { dpsl } from '../../services/fake_dpsl';
import { Routine } from '../../services/fake_routine';

describe('tests for DiagnosticsService', () => {
  const diagnosticsService: DiagnosticsService =
    DiagnosticsServiceProvider.getDiagnosticsService();

  test('should create diagnosticsService', () => {
    expect(diagnosticsService).toBeTruthy();
  });

  test('should return same instance of diagnosticsService', () => {
    const otherDiagnosticsService: DiagnosticsService =
      DiagnosticsServiceProvider.getDiagnosticsService();
    expect(otherDiagnosticsService).toStrictEqual(diagnosticsService);
  });

  test('getAvailableRoutines() returns correct data', async () => {
    const expectedRoutines: Array<string> = ["battery-capacity",
      "battery-charge", "battery-discharge", "battery-health", "cpu-cache",
      "cpu-stress", "memory"];
    const availableRoutines = await diagnosticsService.getAvailableRoutines();
    expect(availableRoutines).toStrictEqual(expectedRoutines);
  });

  const mapRoutineNameToMethodTestCases: {
    name: DiagnosticsRoutineName;
    method: () => Promise<Routine>;
  }[] = [
      {
        name: DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE,
        method: dpsl.diagnostics.battery.runCapacityRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_BATTERY_CHARGE_ROUTINE,
        method: dpsl.diagnostics.battery.runChargeRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_BATTERY_DISCHARGE_ROUTINE,
        method: dpsl.diagnostics.battery.runDischargeRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_BATTERY_HEALTH_ROUTINE,
        method: dpsl.diagnostics.battery.runHealthRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_CPU_CACHE_ROUTINE,
        method: dpsl.diagnostics.cpu.runCacheRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_CPU_STRESS_ROUTINE,
        method: dpsl.diagnostics.cpu.runStressRoutine,
      },
      {
        name: DiagnosticsRoutineName.RUN_MEMORY_ROUTINE,
        method: dpsl.diagnostics.memory.runMemoryRoutine,
      },
    ];

  mapRoutineNameToMethodTestCases.forEach((testCase) => {
    test(`should map routine name to method successfully`, () => {
      const mappedMethod = mapRoutineNameToMethod(testCase.name);
      expect(mappedMethod).toStrictEqual(testCase.method);
    });
  });

  const runRoutineTestCases: {
    routineName: DiagnosticsRoutineName;
  }[] = [
      {
        routineName: DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_BATTERY_CHARGE_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_BATTERY_DISCHARGE_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_BATTERY_HEALTH_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_CPU_CACHE_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_CPU_STRESS_ROUTINE,
      },
      {
        routineName: DiagnosticsRoutineName.RUN_MEMORY_ROUTINE,
      },
    ];

  runRoutineTestCases.forEach((testCase) => {
    test(`should run ${testCase.routineName} successfully`, async () => {
      const routineId = await diagnosticsService.runRoutine(
        testCase.routineName);
      expect(routineId).toStrictEqual(123456);
    });
  });

  const routineOperationTestCases: {
    operation: string;
    command: string;
    methodUnderTest: (number) => Promise<RoutineStatus>;
  }[] = [
      {
        operation: 'getRoutineStatus',
        command: 'get-status',
        methodUnderTest: diagnosticsService.getRoutineStatus,
      },
      {
        operation: 'resumeRoutine',
        command: 'continue',
        methodUnderTest: diagnosticsService.resumeRoutine,
      },
      {
        operation: 'stopRoutine',
        command: 'remove',
        methodUnderTest: diagnosticsService.stopRoutine,
      },
    ];

  routineOperationTestCases.forEach((testCase) => {
    test(`should call diagnosticsService.${testCase.operation} successfully`,
      async () => {
        const routineId = await diagnosticsService.runRoutine(
          DiagnosticsRoutineName.RUN_MEMORY_ROUTINE);
        expect(routineId).toStrictEqual(123456);

        const expectedRoutineStatus = {
          progressPercent: 0,
          output: '',
          status: `ran command ${testCase.command}`,
          statusMessage: '',
          userMessage: '',
        };
        const status = await testCase.methodUnderTest(routineId);
        expect(status).toStrictEqual(expectedRoutineStatus);
      });
  });

  test(`rejects to getRoutineStatus of non-existing routine`,
    async () => {
      await expect(diagnosticsService.getRoutineStatus(654)).rejects.toThrow(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId);
    });
});
