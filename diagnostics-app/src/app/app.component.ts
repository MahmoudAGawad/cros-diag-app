/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import './lit-components/hello-world/hello-world.element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private updates: SwUpdate) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => {
        document.location.reload();
        console.log('Updated app to latest version!');
      });
    });
  }
}
