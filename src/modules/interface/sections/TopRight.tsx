import { Icon } from "@components/buttons/Icon/Icon.js";
import cx from "clsx";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@logic/modals.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { createSignal } from "solid-js";

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
        <Button class={cx("w-10 h-10", landMode() && "!border-amber-600")} onClick={() => toggleLandMode()}>
          <Icon name="RiMediaLandscapeLine" stroke-width={2} size="xs" class="stroke-amber-100 fill-amber-300" />
        </Button>
        <Button class={cx("w-10 h-10", market()?.isOpen() && "!border-amber-300")} onClick={() => market().open()}>
          <Icon name="BsDiamondFill" stroke-width={2} size="xs" class="stroke-amber-100 fill-amber-300" />
        </Button>
        <Button class={cx("w-10 h-10", deck()?.isOpen() && "!border-amber-300")} onClick={() => deck().open()}>
          <Icon name="TbCards" stroke-width={2} class="stroke-amber-100 fill-amber-700" />
        </Button>
        <Button class={cx("w-10 h-10", effects()?.isOpen() && "!border-amber-300")} onClick={() => effects().open()}>
          <Icon name="BiSolidBookBookmark" stroke-width={2} size="sm" class="stroke-amber-100 fill-blue-700" />
        </Button>
      </div>
      <Modal class="min-w-[300px] w-full max-w-[600px]" id={modals.market} default>
        <div class="h-full flex flex-col gap-1 bg-slate-950 border-t-4 border-2 transition-all rounded-t-md rounded-b-sm border-slate-300 hover:border-amber-200 focus-within:border-amber-200">
          <div class="flex bg-gradient-to-b from-slate-800 to-slate-950 justify-between pt-1 pb-0.5 px-2 gap-2">
            <span class="font-bold text-slate-200">Land</span>
            <ButtonIcon icon="OcX" class="text-slate-200" onClick={() => market().close()} />
          </div>
          <div class="px-2">
            <div class="text-white">Content</div>
          </div>
        </div>
      </Modal>
      <Modal id={modals.deck}>
        <div class="w-40 h-40 bg-white">deck</div>
      </Modal>
      <Modal id={modals.effects}>
        <div class="w-40 h-40 bg-white">effects</div>
      </Modal>
    </section>
  );
};
