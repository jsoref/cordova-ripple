/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var nav = ripple('platform/w3c/1.0/navigator'),
    event = ripple('event'),
    _console = ripple('console'),
    utils = ripple('utils'),
    emulatorBridge = ripple('emulatorBridge'),
    _self = {};

event.on("TinyHipposLoaded", function () {
    var doc = emulatorBridge.document(),
        evt = doc.createEvent("Events");
    evt.initEvent("deviceready", true, true);
    doc.dispatchEvent(evt);
    _console.log("fired deviceready event!");
});

utils.mixin(nav, _self);

module.exports = _self;