// src/index.ts
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
export {
  Player,
  Recorder,
  player
};
