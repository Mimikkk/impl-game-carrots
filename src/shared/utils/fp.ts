export const map =
  <Element, Return>(fn: (element: Element, index: number, items: Element[]) => Return) =>
  (items: Element[]): Return[] =>
    items.map(fn);

type Rest<T extends any[]> = ((...p: T) => void) extends (p1: infer _, ...rest: infer R) => void ? R : never;
type First<T extends any[]> = T[0];

export const mapping = <Fn extends (...args: any[]) => any>(fn: Fn) =>
  [
    fn,
    (items: First<Parameters<Fn>>[], ...rest: Rest<Parameters<Fn>>): ReturnType<Fn>[] =>
      items.map((item) => fn(item, ...rest)),
  ] as const;

export const fp = { map, mapping };
