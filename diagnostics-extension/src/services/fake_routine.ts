// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { RoutineStatus } from '@common/dpsl';

/**
 * @fileoverview Mock Routine class.
 * To be replaced by Routine from dpsl package.
 */

export class Routine {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  async _genericSendCommand(command: string): Promise<RoutineStatus> {
    const message = {
      routineId: this.id,
      command: command,
      includeOutput: true,
    };
    console.log('Constrcuted diagnostics command', message);
    const status: RoutineStatus = {
      progressPercent: 0,
      output: '',
      status: `ran command ${command}`,
      statusMessage: '',
      userMessage: '',
    };
    return status;
  }

  /**
   * Returns current status of this routine.
   */
  async getStatus(): Promise<RoutineStatus> {
    return this._genericSendCommand('get-status');
  }

  /**
   * Resumes this routine, e.g. when user prompts to run a waiting routine.
   */
  async resume(): Promise<RoutineStatus> {
    return this._genericSendCommand('continue');
  }

  /**
   * Stops this routine, if running, or remove otherwise.
   * Note: The routine cannot be restarted again.
   */
  async stop(): Promise<RoutineStatus> {
    this._genericSendCommand('cancel');
    return this._genericSendCommand('remove');
  }
}
