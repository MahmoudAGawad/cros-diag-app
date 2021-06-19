// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Test file for the app.component.ts
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('component: app', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app component', () => {
    // component is created
    expect(component).toBeTruthy();
  });

  it('should set dark mode by default', () => {
    // default theme is dark
    expect(component.theme).toBe('dark');
  });

  it('should toggle the theme', () => {
    // theme = 'dark' by default
    component.toggleTheme();
    fixture.detectChanges();
    // css class 'light' should be added
    expect(component.theme).toBe('light');
    expect(component.cssClass).toBe('light');
    // switch again
    component.toggleTheme();
    fixture.detectChanges();
    // css class 'light' should be added
    expect(component.theme).toBe('dark');
    expect(component.cssClass).toBe('dark');
  });

  it('should toggle theme on button click', () => {
    // simulate component.toggleTheme()
    spyOn(component, 'toggleTheme');    
    const buttonRef: HTMLButtonElement =
      fixture.nativeElement.querySelector('.theme-toggle');
    // simulate toggle theme button click
    buttonRef.click();
    fixture.detectChanges();
    // should invoke the toggleTheme() function
    expect(component.toggleTheme).toHaveBeenCalled();
  });
});
