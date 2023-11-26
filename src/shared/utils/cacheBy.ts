export const cacheBy = <Fn extends (...params: any[]) => any>(
  fn: Fn,
  keyBy: (...params: Parameters<Fn>) => string,
): Fn => {
  const cache = new Map<string, ReturnType<Fn>>();

  return ((...params: Parameters<Fn>) => {
    const key = keyBy(...params);

    let value = cache.get(key);
    if (value !== undefined) return cache.get(key);
    value = fn(...params);
    cache.set(key, value!);
    return value;
  }) as Fn;
};
