import { createEffect, createSignal, onCleanup } from "solid-js";

export const createVanishingSignal = <T>(timeMs: number, initial: T | null = null) => {
  const [value, set] = createSignal<null | T>(initial);

  createEffect(() => {
    if (value() === null) return;

    let timer = setTimeout(() => set(null), timeMs);
    onCleanup(() => clearTimeout(timer));
  });

  return [value, set] as const;
};
