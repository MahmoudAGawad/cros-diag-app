// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Tests for SideNavItem component.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavItemComponent } from './side-nav-item.component';

describe('SideNavItemComponent', () => {
  let component: SideNavItemComponent;
  let fixture: ComponentFixture<SideNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
