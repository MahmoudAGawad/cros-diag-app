// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Types regarding communication between
 * diagostics-app and diagnostics-extension
 */

import { DpslTypes } from './dpsl';

export const enum RequestType {
  TELEMETRY = 'telemetry',
  DIAGNOSTICS = 'diagnostics',
  EVENTS = 'events',
}

export const enum TelemetryInfoType {
  BACKLIGHT = 'backlight',
  BATTERY = 'battery',
  BLOCK_DEVICE = 'block-device',
  BLUETOOTH = 'bluetooth',
  CPU = 'cpu',
  FAN = 'fan',
  MEMORY = 'memory',
  STATEFUL_PARTITION = 'stateful-partition',
  TIMEZONE = 'timezone',
  VPD = 'vpd',
}

export const enum ResponseErrorInfoMessage {
  InvalidRequestType = 'Invalid or missing request type.',
  InvalidTelemetryInfoType = 'The requested telemetry infoType is either invalid or missing.',
  MissingTelemetryRequest = 'Missing telemetry object in request.',
}

export interface Request {
  type: RequestType;
  telemetry?: {
    infoType: TelemetryInfoType;
  };
}

export interface Error {
  message: String;
}

export interface TelemetryResponse {
  info: DpslTypes;
}

export interface Response {
  success: Boolean;
  error?: Error;
  telemetry?: TelemetryResponse;
}
