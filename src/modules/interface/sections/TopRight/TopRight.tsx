import cx from "clsx";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@logic/modals.js";
import { createSignal } from "solid-js";
import { DeckIcon, GoldIcon, LandIcon } from "@shared/logic-components/icons/Icons.js";
import { InventoryModal } from "@modules/interface/sections/TopRight/Inventory/InventoryModal.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";

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
  const deck = Modals.signal(modals.Deck);
  const effects = Modals.signal(modals.Effects);

  return (
    <section class={cx(props.class)}>
      <div class="flex gap-2">
        <Button square class={cx("h-8 w-8", landMode() && "!border-amber-600")} onClick={() => toggleLandMode()}>
          <LandIcon />
        </Button>
        <Button
          square
          class={cx("h-8 w-8", inventory().isOpen() && "!border-amber-300")}
          onClick={(event) => inventory().open({ event })}
        >
          <GoldIcon />
        </Button>
        <Button
          square
          class={cx("h-8 w-8", deck().isOpen() && "!border-amber-300")}
          onClick={(event) => deck().open({ event })}
        >
          <DeckIcon />
        </Button>
        <ButtonIcon
          onClick={(event) => effects().open({ event })}
          icon="BiSolidBookBookmark"
          active={effects().isOpen()}
          iconclass="stroke-2 stroke-amber-100 fill-blue-700"
        />
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
