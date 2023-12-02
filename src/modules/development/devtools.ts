import { createStorage } from "@logic/Storage/createStorage.js";
import { createEffectListener } from "@logic/createListener.js";

export namespace Devtools {
  export const [active, set] = createStorage("devtool-expanded", false);

  export const toggle = () => set(!active());

  export const createKeyboardShortcut = () =>
    createEffectListener("keydown", ({ altKey, ctrlKey, key }) => ctrlKey && altKey && key === "d" && toggle());
}
