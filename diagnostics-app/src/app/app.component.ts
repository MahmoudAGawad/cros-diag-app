/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import '../webcomponents/hello-world/hello-world.element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private theme: string = 'light';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private updates: SwUpdate
  ) {
    this.updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => {
        document.location.reload();
        console.log('Updated app to latest version!');
      });
    });
  }
  ngOnInit() {
    this.renderer.addClass(this.document.body, this.theme);
  }
  toggleTheme() {
    this.renderer.removeClass(this.document.body, this.theme);
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.renderer.addClass(this.document.body, this.theme);
  }
}
