// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle diagnostics requests
 */

import { Request, Response } from '@common/message';
import { generateErrorResponse } from '../utils';

type DiagnosticsController = (
  category: Request,
  res: (data: Response) => void
) => void;

export const handleDiagnostics: DiagnosticsController = (req, res) => {
  res(generateErrorResponse('Diagnostics not implemented.'));
};
