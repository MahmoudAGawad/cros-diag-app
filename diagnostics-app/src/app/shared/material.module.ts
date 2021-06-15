// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Material module imports/exports the required
 * @angular/material modules for the app.
 * Imported by shared.module.ts
 */

import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule],
  exports: [MatToolbarModule],
})
export class MaterialModule {}
