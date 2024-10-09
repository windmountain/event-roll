declare function player(fn: (d: any) => void): string;
interface Event {
    d: any;
    t: number;
}
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
type Timer = ReturnType<typeof setTimeout>;
declare class Player {
    doer: (d: any) => void;
    events: Array<Event> | null;
    timeouts: Array<Timer>;
    playhead: number;
    constructor(doer: (d: any) => void);
    load(events: Array<Event>): this;
    play(): void;
    pause(): void;
    seekTo(t: number): void;
}
declare class Recorder {
    taker: (d: any) => void;
    events: Array<Event>;
    constructor(taker: (d: any) => void);
    load(events: Array<Event>): this;
    record(): void;
    pause(): void;
    seekTo(): void;
}

export { Player, Recorder, player };
