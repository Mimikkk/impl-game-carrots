import type { Ref } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual";

export const createColumns = <T>(ref: () => Ref<T>, columns: number, width: number) => {
  const virtualizer = createVirtualizer<Ref<T>>({
    getScrollElement: ref,
    estimateSize: () => width,
    horizontal: true,
    count: columns,
  });

  return Object.defineProperties(virtualizer, {
    size: { get: virtualizer.getTotalSize },
    items: { get: virtualizer.getVirtualItems },
  }) as typeof virtualizer & { get size(): number; get items(): ReturnType<typeof virtualizer.getVirtualItems> };
};
