// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Global app.component which loads as the root component.
 * Imported by app.module.ts
 */

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  theme: string = 'dark';
  //@ts-ignore
  @HostBinding('class') cssClass: string;
  constructor() {}
  ngOnInit() {
    this.cssClass = this.theme;
  }
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.cssClass = this.theme;
  }
}
