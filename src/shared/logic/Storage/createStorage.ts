import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import { createEffect, createSignal, type Signal } from "solid-js";
import { Storage } from "@logic/Storage/Storage.js";

export function createStorage<T>(
  name: string,
  initial: T,
): T extends object ? [Store<T>, SetStoreFunction<T>] : T extends boolean ? Signal<boolean> : Signal<T> {
  const [value, set] =
    typeof initial === "object"
      ? createStore<T extends object ? T : never>(Storage.read(name, initial) as T extends object ? T : never)
      : createSignal(Storage.read(name, initial));

  createEffect(() => Storage.set(name, typeof value === "function" ? value() : value));

  return [value, set] as never;
}
