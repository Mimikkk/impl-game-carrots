import { createStorage } from "@logic/Storage/createStorage.js";
import { Modals } from "@logic/modals.js";
import { createMemo } from "solid-js";

export namespace MainMenu {
  export const Id = "main-menu";
  export const [openOnStartup, setOpenOnStartup] = createStorage(Id, true);

  export const isOpen = createMemo(() => Modals.read(Id).isOpen());
  export const open = (event: MouseEvent) => Modals.read(Id).open({ event });
}
