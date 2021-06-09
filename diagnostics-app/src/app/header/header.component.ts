/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() themeChange = new EventEmitter<boolean>();

  darkThemeEnabled = false;
  constructor() {}

  ngOnInit(): void {}

  onToggleTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    this.themeChange.emit(this.darkThemeEnabled);
  }
}
