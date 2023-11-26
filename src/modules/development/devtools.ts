import { createStorage } from "@logic/Storage/createStorage.js";
import { createEffect, onCleanup } from "solid-js";

export namespace Devtools {
  export const [active, set] = createStorage("devtool-expanded", false);

  export const toggle = () => set(!active());

  const handleKeyboardShortcut = (event: KeyboardEvent) => {
    if (!event.ctrlKey || !event.altKey || event.key !== "d") return;
    Devtools.toggle();
  };

  export const createKeyboardShortcut = () =>
    createEffect(() => {
      document.addEventListener("keydown", handleKeyboardShortcut);
      onCleanup(() => document.removeEventListener("keydown", handleKeyboardShortcut));
    });
}
