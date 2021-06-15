// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Output() toggleDrawer = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Triggered when user clicks the menu button
   * Sends an empty event to parent component
   * informing about drawer toggle event
   */
  onToggleDrawer() {
    this.toggleDrawer.emit();
  }
}
