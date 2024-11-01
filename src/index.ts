declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;

type Timer = ReturnType<typeof setTimeout>

interface Event<D> {
  d: D;
  t: number;
}

type Tape<D> = {
  events: Array<Event<D>>,
  length: number
}

enum TapeState {
    Playing,
    Recording,
    Stopped
  }

type DeckState = 
  { state: TapeState.Stopped, at: number } |
  { state: TapeState.Playing, from: number, since: Date, timeouts: Array<Timer> } |
  { state: TapeState.Recording, from: number, since: Date }

class NoTapeError extends Error {
  constructor() {
    super("No tape in deck")
    this.name = "NoTapeError"
    Object.setPrototypeOf(this, NoTapeError.prototype);
  }
}

export class Deck<D> {
  private perform: (d: D) => void;
  private tape: null | Tape<D>;
  private state: DeckState;

  constructor(perform : ((d: D) => void)) {
    this.tape = null;
    this.perform = perform;
    this.state = { state: TapeState.Stopped, at: 0 }
  };

  private _newAt() : number {
    switch(this.state.state) {
      case TapeState.Stopped:
          return this.state.at;
      case TapeState.Playing:
      case TapeState.Recording:
          return (new Date().getTime() - this.state.since.getTime()) + this.state.from;
    }
  }

  public load(tape: Tape<D>) {
    this.tape = tape;
    return this;
  };

  public eject() : null | Tape<D> {
    return this.tape;
  }

  public play() : void {
    if(!this.tape) {
      throw new NoTapeError();
    }
    const at = this._newAt();
    switch(this.state.state) {
      case TapeState.Playing:
        return;
      case TapeState.Stopped:
      case TapeState.Recording:
        this.state = {
          state: TapeState.Playing,
          from: at,
          since: new Date(),
          timeouts: this.tape.events.map((e) => setTimeout(() =>
            this.perform(e.d),
            e.t - at
          ))
        }
    }
  }

  public stop() : void {
    if(!this.tape) {
      throw new NoTapeError();
    }
    switch(this.state.state) {
      case TapeState.Playing:
        this.state.timeouts.map((timeout) => clearTimeout(timeout));
        this.state = { state: TapeState.Stopped, at: this._newAt() }
      case TapeState.Stopped:
      case TapeState.Recording:
        this.state = { state: TapeState.Stopped, at: this._newAt() }
    }
  }

  public rewind() : void {
    if(!this.tape) {
      throw new NoTapeError();
    }
    this.state = { state: TapeState.Stopped, at: 0 }
  }

  public fastForward() : void {
    if(!this.tape) {
      throw new NoTapeError();
    }
    this.state = { state: TapeState.Stopped, at: this.tape.length }
  }

  public record<R>(transcribe: ((rawEvent: R) => D)) : ((rawEvent: R) => void) {
    if(!this.tape) {
      throw new NoTapeError();
    }
    this.stop();
    const since = new Date();
    const from = this._newAt();
    this.state = { state: TapeState.Recording, from: from, since: since }
    const now = () => new Date().getTime() - since.getTime() + from;
    return ((rawEvent) => {
      if(!this.tape) {
        throw new NoTapeError();
      }
      void this.tape.events.push({
        t: now(),
        d: transcribe(rawEvent)
      });
    })
  }

  /*
  playing -> stopped
  playing -> recording
  stopped -> playing
  stopped -> recording
  recording -> stopped
  recording -> playing

  buttons:
    - rewind
    - record
    - stop
    - play
    - fast forward
  
  effects (state -> button -> state)
    playing -> rewind -> stopped (at beginning)
    playing -> record -> recording
    playing -> stop -> stopped
    playing -> play -> playing
    playing -> fast forward -> stopped (at end)
    stopped -> rewind -> stopped
    stopped -> record -> recording
    stopped -> stop -> stopped
    stopped -> play -> playing
    stopped -> fast forward -> stopped (at beginning)
    recording -> rewind -> stopped
    recording -> record -> recording
    recording -> stop -> stopped
    recording -> play -> playing
    recording -> fast forward -> stopped (at end)
  
  */
}