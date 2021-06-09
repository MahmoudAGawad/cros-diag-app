/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  render() {
    return html` <h1>Hello World from LitElement!</h1> `;
  }
}
