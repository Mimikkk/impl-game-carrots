import cx from "clsx";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@logic/modals.js";
import { createSignal } from "solid-js";
import { DeckIcon, EffectIcon, GoldIcon, LandIcon } from "@shared/logic-components/icons/Icons.js";

const modals = {
  market: "market",
  deck: "deck",
  effects: "effects",
};

interface Props {
  class?: string;
}

const [landMode, setLandMode] = createSignal(false);
const toggleLandMode = () => setLandMode((value) => !value);

export const TopRight = (props: Props) => {
  const market = Modals.signal(modals.market);
  const deck = Modals.signal(modals.deck);
  const effects = Modals.signal(modals.effects);

  return (
    <section class={cx(props.class)}>
      <div class="flex gap-2">
        <Button square class={cx(landMode() && "!border-amber-600")} onClick={() => toggleLandMode()}>
          <LandIcon />
        </Button>
        <Button
          square
          class={cx(market().isOpen() && "!border-amber-300")}
          onClick={(event) => market().open({ event })}
        >
          <GoldIcon />
        </Button>
        <Button square class={cx(deck().isOpen() && "!border-amber-300")} onClick={(event) => deck().open({ event })}>
          <DeckIcon />
        </Button>
        <Button
          square
          class={cx(effects().isOpen() && "!border-amber-300")}
          onClick={(event) => effects().open({ event })}
        >
          <EffectIcon />
        </Button>
      </div>
      <Modal title="Market" id={modals.market} default>
        Content
      </Modal>
      <Modal title="Deck" id={modals.deck}>
        deck
      </Modal>
      <Modal title="Effects" id={modals.effects}>
        effects
      </Modal>
    </section>
  );
};
