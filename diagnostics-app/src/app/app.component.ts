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
  private _theme: string = 'dark';
  @HostBinding('class') private _cssClass!: string;

  get theme() {
    return this._theme;
  }

  get cssClass() {
    return this._cssClass;
  }

  constructor() {}

  ngOnInit() {
    this._cssClass = this.theme;
  }

  toggleTheme() {
    this._theme = this.theme === 'light' ? 'dark' : 'light';
    this._cssClass = this.theme;
  }
}
