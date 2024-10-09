export function player(fn: (d: any) => void) {
  return `Hello !`;
}

interface Event {
  d: any;
  t: number;
}

declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;

type Timer = ReturnType<typeof setTimeout>

export class Player {
  doer: (d: any) => void;
  events: Array<Event> | null;
  timeouts: Array<Timer>;
  playhead: number;

  constructor(doer: (d: any) => void) {
    this.doer = doer;
    this.events = null
    this.timeouts = [];
    this.playhead = 0;
  };

  load(events: Array<Event>) {
    this.events = events;
    return this;
  };

  play() {
    if(this.events == null) {
      throw "problem";
    }
    this.timeouts = this.events
      .filter((event: Event) => {
        return event.t >= this.playhead;
      })
      .map((event: Event) => {
        return setTimeout(() => {
          this.doer(event.d)
        }, event.t - this.playhead);
      });
  };

  pause() {
    this.timeouts.forEach((timeoutId: number) => {
      clearTimeout(timeoutId);
    });
  };

  seekTo(t: number) {
    this.playhead = t;
  };
}

export class Recorder {
  taker: (d: any) => void;
  events: Array<Event>;

  constructor(taker: (d: any) => void) {
    this.taker = taker;
    this.events = [];
  };

  load(events: Array<Event>) {
    this.events = events;
    return this;
  };

  record() {

  }

  pause() {

  }

  seekTo() {

  }
}
