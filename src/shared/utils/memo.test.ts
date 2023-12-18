import { memo } from "./memo.js";
import { expect } from "vitest";

describe("Utility - memo", () => {
  const add = (a: number, b: number) => a + b;

  it("Should return memoized result when called with same parameters", () => {
    const fn = vi.fn(add);
    const memoizedFn = memo(fn);

    const result1 = memoizedFn(1, 2);
    const result2 = memoizedFn(1, 2);

    expect(result1).toEqual(result2);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("Should not return memoized result when called with different parameters", () => {
    const fn = vi.fn(add);
    const memoizedFn = memo(fn);

    const result1 = memoizedFn(1, 2);
    const result2 = memoizedFn(3, 4);

    expect(result1).not.toEqual(result2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("Should support custom keyBy function", () => {
    const fn = vi.fn(add);
    const keyBy = (...params: number[]) => params.join(",");
    const memoizedFn = memo(fn, keyBy);

    const result1 = memoizedFn(1, 2);
    const result2 = memoizedFn(1, 2);

    expect(result1).toEqual(result2);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("Should allow memoization of functions with no parameters", () => {
    const fn = vi.fn(() => "Hello, world!");
    const memoizedFn = memo(fn);

    const result1 = memoizedFn();
    const result2 = memoizedFn();

    expect(result1).toEqual(result2);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("Should allow for clearing of cache", () => {
    const fn = vi.fn(add);
    const memoizedFn = memo(fn);

    const result1 = memoizedFn(1, 2);
    memoizedFn.clear();
    const result2 = memoizedFn(1, 2);

    expect(result1).toEqual(result2);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
