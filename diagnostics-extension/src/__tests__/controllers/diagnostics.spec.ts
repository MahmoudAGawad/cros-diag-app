// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/controllers/diagnostics
 */

import { handleDiagnostics } from '../../controllers/diagnostics';
import { generateErrorResponse } from '../../utils';
import { Request, Response, RequestType } from '@common/message';

describe('should implement diagnostics controller', () => {
  it('should return not implemented response', () => {
    const req: Request = { type: RequestType.DIAGNOSTICS };
    const res: (response: Response) => void = jest.fn();
    handleDiagnostics(req, res);
    expect(res).toHaveBeenCalledWith(
      generateErrorResponse('Diagnostics not implemented.')
    );
  });
});
