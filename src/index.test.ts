import { afterEach, beforeEach, describe, expect, it, vi, test} from 'vitest'
import { Player } from "./index";


const mock = vi.fn();

const events = [{
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
}];

describe("Player", () => {
  
  beforeEach(() => {
    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("should play events like so", () => {
    const player = new Player(mock).load(events).play();
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
