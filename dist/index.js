"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Player: () => Player,
  Recorder: () => Recorder,
  player: () => player
});
module.exports = __toCommonJS(src_exports);
function player(fn) {
  return `Hello !`;
}
var Player = class {
  doer;
  events;
  timeouts;
  playhead;
  constructor(doer) {
    this.doer = doer;
    this.events = null;
    this.timeouts = [];
    this.playhead = 0;
  }
  load(events) {
    this.events = events;
    return this;
  }
  play() {
    if (this.events == null) {
      throw "problem";
    }
    this.timeouts = this.events.filter((event) => {
      return event.t >= this.playhead;
    }).map((event) => {
      return setTimeout(() => {
        this.doer(event.d);
      }, event.t - this.playhead);
    });
  }
  pause() {
    this.timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
  }
  seekTo(t) {
    this.playhead = t;
  }
};
var Recorder = class {
  taker;
  events;
  constructor(taker) {
    this.taker = taker;
    this.events = [];
  }
  load(events) {
    this.events = events;
    return this;
  }
  record() {
  }
  pause() {
  }
  seekTo() {
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Player,
  Recorder,
  player
});
