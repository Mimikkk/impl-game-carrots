import cx from "clsx";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@logic/modals.js";
import { createSignal } from "solid-js";
import { DeckIcon, EffectIcon, GoldIcon, LandIcon } from "@shared/logic-components/icons/Icons.js";
import { Grid } from "@components/containers/Grid/Grid.js";

interface Item {
  type: string;
  name: string;
  count: number;
}

namespace Item {
  export const create = (type: string, name: string, count: number): Item => ({ type, name, count });
  export const single = (type: string, name: string): Item => create(type, name, 1);
}

const enum modals {
  Inventory = "inventory",
  Deck = "deck",
  Effects = "effects",
}

interface Props {
  class?: string;
}

const [landMode, setLandMode] = createSignal(false);
const toggleLandMode = () => setLandMode((value) => !value);

export const TopRight = (props: Props) => {
  const inventory = Modals.signal(modals.Inventory);
  const deck = Modals.signal(modals.Deck);
  const effects = Modals.signal(modals.Effects);

  return (
    <section class={cx(props.class)}>
      <div class="flex gap-2">
        <Button square class={cx(landMode() && "!border-amber-600")} onClick={() => toggleLandMode()}>
          <LandIcon />
        </Button>
        <Button
          square
          class={cx(inventory().isOpen() && "!border-amber-300")}
          onClick={(event) => inventory().open({ event })}
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
      <Modal title="Inventory" id={modals.Inventory} default>
        <div class="center gap-4">
          <Button class="w-full" />
          <Grid
            class="border box-content p-2"
            itemclass="border"
            gap={4}
            items={[Item.create("land", "Island", 4)]}
            rows={4}
            columns={6}
            sizes={{ height: 64, width: 64 }}
          >
            {(item) => (
              <div class="relative full center">
                <span>
                  <LandIcon />
                </span>
                <div class="abr-0 border w-4 h-4 center">{item.count}</div>
              </div>
            )}
          </Grid>
        </div>
      </Modal>
      <Modal title="Deck" id={modals.Deck}>
        deck
      </Modal>
      <Modal title="Effects" id={modals.Effects}>
        effects
      </Modal>
    </section>
  );
};
