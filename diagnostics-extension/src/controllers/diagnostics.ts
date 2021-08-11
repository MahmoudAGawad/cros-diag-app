// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle diagnostics requests
 */

import { DiagnosticsParams } from '@common/dpsl';
import {
  DiagnosticsAction,
  DiagnosticsResponse,
  DiagnosticsRoutineName,
  Request,
  Response,
  ResponseErrorInfoMessage,
} from '@common/message';
import { DiagnosticsServiceProvider } from '../services/diagnostics';
import {
  generateDiagnosticsSuccessResponse,
  generateErrorResponse,
} from '../utils';

type DiagnosticsController = (
  category: Request,
  res: (data: Response) => void
) => void;

const diagnosticsService = DiagnosticsServiceProvider.getDiagnosticsService();

const handleStartRoutine = async (
  routineName: DiagnosticsRoutineName | undefined,
  res: (data: Response) => void,
  params?: DiagnosticsParams
) => {
  if (!routineName) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName
      )
    );
  }
  const routineId = diagnosticsService.runRoutine(routineName, params);
  const routineStatus = await diagnosticsService.getRoutineStatus(routineId);
  const payload: DiagnosticsResponse = { routineId, routineStatus };
  return res(generateDiagnosticsSuccessResponse(payload));
};

const handleStopRoutine = async (
  routineId: number | undefined,
  res: (data: Response) => void
) => {
  if (!routineId) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId
      )
    );
  }
  const routineStatus = await diagnosticsService.stopRoutine(routineId);
  const payload: DiagnosticsResponse = { routineId, routineStatus };
  return res(generateDiagnosticsSuccessResponse(payload));
};

const handleGetRoutineStatus = async (
  routineId: number | undefined,
  res: (data: Response) => void
) => {
  if (!routineId) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId
      )
    );
  }
  const routineStatus = await diagnosticsService.getRoutineStatus(routineId);
  const payload: DiagnosticsResponse = { routineId, routineStatus };
  return res(generateDiagnosticsSuccessResponse(payload));
};

const handleResumeRoutine = async (
  routineId: number | undefined,
  res: (data: Response) => void
) => {
  if (!routineId) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId
      )
    );
  }
  const routineStatus = await diagnosticsService.resumeRoutine(routineId);
  const payload: DiagnosticsResponse = { routineId, routineStatus };
  return res(generateDiagnosticsSuccessResponse(payload));
};

export const handleDiagnostics: DiagnosticsController = (req, res) => {
  if (!req.diagnostics)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingDiagnosticsRequest)
    );

  switch (req.diagnostics.action) {
    case DiagnosticsAction.START:
      return handleStartRoutine(req.diagnostics.routineName, res, req.diagnostics.params);
    case DiagnosticsAction.STATUS:
      return handleGetRoutineStatus(req.diagnostics.routineId, res);
    case DiagnosticsAction.RESUME:
      return handleResumeRoutine(req.diagnostics.routineId, res);
    case DiagnosticsAction.STOP:
      return handleStopRoutine(req.diagnostics.routineId, res);
    default:
      return res(
        generateErrorResponse(ResponseErrorInfoMessage.InvalidDiagnosticsAction)
      );
  }
};
