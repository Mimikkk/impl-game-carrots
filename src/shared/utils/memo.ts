export interface MemoizedFn<Fn extends (...params: any[]) => any> {
  (...params: Parameters<Fn>): ReturnType<Fn>;
  clear(): void;
}

export const memo = <Fn extends (...params: any[]) => any>(
  fn: Fn,
  keyBy: (...params: Parameters<Fn>) => string = (...params) => JSON.stringify(params),
): MemoizedFn<Fn> => {
  const cache = new Map<string, ReturnType<Fn>>();

  const memoizedFn = ((...params: Parameters<Fn>) => {
    const key = keyBy(...params);
    let value = cache.get(key);

    if (value !== undefined) return value;

    value = fn(...params);
    cache.set(key, value!);
    return value;
  }) as MemoizedFn<Fn>;
  memoizedFn.clear = () => cache.clear();

  return memoizedFn;
};
