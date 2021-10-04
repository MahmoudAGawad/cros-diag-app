// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/utils
 */

import {
  generateErrorResponse,
  generateTelemetrySuccessResponse,
  generateDiagnosticsSuccessResponse,
} from '../utils';
import { Response, TelemetryResponse, DiagnosticsResponse } from '@common/message';
import { backlightInfo } from '../services/fake_telemetry.data';

describe('should generate correct response objects', () => {
  it('should generate correct error object', () => {
    const message = 'Error message';
    const errorResponse: Response = generateErrorResponse(message);
    expect(errorResponse).toEqual({
      success: false,
      error: {
        message,
      },
    });
  });

  it('should generate correct telemetry response object', () => {
    const payload: TelemetryResponse = { info: backlightInfo() };
    const response: Response = generateTelemetrySuccessResponse(payload);
    expect(response).toEqual({
      success: true,
      telemetry: payload,
    });
  });

  it('should generate correct diagnostics response object', () => {
    const payload: DiagnosticsResponse = {
      routineId: 123456,
      routineStatus: {
        progressPercent: 50,
        output: 'output',
        status: `ran command get-status`,
        statusMessage: 'status message',
        userMessage: 'user message',
      }
    };
    const response: Response = generateDiagnosticsSuccessResponse(payload);
    expect(response).toEqual({
      success: true,
      diagnostics: payload,
    });
  });
});
