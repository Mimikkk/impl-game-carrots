import cx from "clsx";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@logic/modals.js";
import { createSignal } from "solid-js";
import { InventoryModal } from "@modules/interface/sections/TopRight/Inventory/InventoryModal.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { MainMenu } from "@modules/management/mainmenu.logic.js";

const enum modals {
  Deck = "deck",
  Effects = "effects",
}

interface Props {
  class?: string;
}

const [landMode, setLandMode] = createSignal(false);
const toggleLandMode = () => setLandMode((value) => !value);

export const TopRight = (props: Props) => {
  const inventory = Modals.signal(InventoryModal.name);
  const effects = Modals.signal(modals.Effects);
  const deck = Modals.signal(modals.Deck);

  return (
    <section class={cx(props.class)}>
      <div class="flex gap-2">
        <ButtonIcon
          icon="RiMediaLandscapeLine"
          onClick={() => toggleLandMode()}
          active={landMode()}
          iconclass="fill-amber-500"
        />
        <ButtonIcon
          onClick={inventory().open}
          icon="BsDiamondFill"
          active={inventory().isOpen()}
          iconclass="fill-amber-500"
        />
        <ButtonIcon onClick={deck().open} icon="TbCards" active={deck().isOpen()} iconclass="fill-amber-800" />
        <ButtonIcon
          onClick={effects().open}
          icon="BiSolidBookBookmark"
          active={effects().isOpen()}
          iconclass="fill-blue-700"
        />
        <ButtonIcon onClick={MainMenu.open} icon="CgMenuLeftAlt" active={MainMenu.isOpen()} />
      </div>
      <InventoryModal />
      <Modal title="Deck" id={modals.Deck}>
        deck
      </Modal>
      <Modal title="Effects" id={modals.Effects}>
        effects
      </Modal>
    </section>
  );
};
