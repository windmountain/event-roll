import { afterEach, beforeEach, describe, expect, it, vi, test} from 'vitest'
import { Deck } from "./index";

const mock = vi.fn();

const tape = {
  length: 5000,  
  events: [{
  t: 2000,
  d: "Al"
},{
  t: 2000 + 63,
  d: "ways "
},{
  t: 2000 + 63 + 125,
  d: "there "
},{
  t: 2000 + 63 + 125 + 63,
  d: "when "
},{
  t: 2000 + 63 + 125 + 125,
  d: "you "
},{
  t: 4000,
  d: "call, "
}]
}

describe("Playing a tape", () => {
  
  beforeEach(() => {
    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("should play events like so", () => {
    const player = new Deck(mock).load(tape).play();
    expect(mock).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2001);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith("Al");
    vi.advanceTimersByTime(64);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenLastCalledWith("ways ");
    vi.advanceTimersByTime(126);
    expect(mock).toHaveBeenCalledTimes(3);
    expect(mock).toHaveBeenLastCalledWith("there ");
    vi.advanceTimersByTime(63);
    expect(mock).toHaveBeenCalledTimes(4);
    expect(mock).toHaveBeenLastCalledWith("when ");
    vi.advanceTimersByTime(63);
    expect(mock).toHaveBeenCalledTimes(5);
    expect(mock).toHaveBeenLastCalledWith("you ");
    vi.advanceTimersByTime(1687);
    expect(mock).toHaveBeenCalledTimes(6);
    expect(mock).toHaveBeenLastCalledWith("call, ");
  });

});

describe("Recording onto a tape", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should record events like so", () => {
    const emptyTape = {
      length: 5000,
      events: []
    }
    const deck = new Deck(mock).load(emptyTape);
    const recorder = deck.record((rawEvent) => "bop");
    vi.advanceTimersByTime(2000);
    recorder(null);
    vi.advanceTimersByTime(63);
    recorder(null);
    vi.advanceTimersByTime(125);
    recorder(null);
    vi.advanceTimersByTime(63);
    recorder(null);
    vi.advanceTimersByTime(63);
    recorder(null);
    vi.advanceTimersByTime(1686);
    recorder(null);
    deck.stop();
    const tape = deck.eject();
    expect(tape).toEqual({
      length: 5000,
      events: [
        { t: 2000, d: "bop" },
        { t: 2063, d: "bop" },
        { t: 2188, d: "bop" },
        { t: 2251, d: "bop" },
        { t: 2314, d: "bop" },
        { t: 4000, d: "bop" }
      ]
    });
  });
});