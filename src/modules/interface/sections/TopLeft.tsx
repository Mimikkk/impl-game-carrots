import { Icon } from "@components/buttons/Icon/Icon.js";
import { Number } from "@components/texts/NumberText.js";
import { balance, resources, type ResourceType, tax, turnsTillTax } from "@modules/management/management.js";
import { type JSX, Show } from "solid-js";
import { Space } from "@components/texts/Space.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Modals } from "@components/containers/Modal/modals.js";

interface ResourceCounterProps {
  resource: ResourceType;
  children?: JSX.Element;
}

const ResourceCounter = (props: ResourceCounterProps) => (
  <div class="flex items-center gap-2">
    {props.children}
    <div class="flex gap-0.5">
      <Number class="text-xl text-white" bold>
        {resources[props.resource]}
      </Number>
      <Show when={balance[props.resource] !== 0}>
        <div class="text-xs self-baseline font-bold">
          <Show when={balance[props.resource] < 0}>
            <div class="flex text-red-500">
              (<Number>{balance[props.resource]}</Number>)
            </div>
          </Show>
          <Show when={balance[props.resource] > 0}>
            <div class="flex text-green-500">
              (+<Number>{balance[props.resource]}</Number>)
            </div>
          </Show>
        </div>
      </Show>
    </div>
  </div>
);

interface Props {
  class?: string;
}

const PayTurnText = () => {
  return (
    <div class="text-white flex items-center">
      Pay
      <Space />
      <Icon name="BsDiamondFill" size="xs" stroke-width={2} class="stroke-amber-100 fill-amber-300" />
      <Space />
      <Number class="text-amber-400" bold>
        {tax()}
      </Number>
      <Space />
      in
      <Space />
      <Number class="text-amber-400" bold>
        {turnsTillTax()}
      </Number>
      <Space />
      days
    </div>
  );
};

const modalId = "top-left-modal";
export const TopLeft = (props: Props) => {
  const modal = Modals.signal(modalId);

  return (
    <section class={props.class}>
      <div class="shadow-sm shadow-slate-800 border-4 flex pr-4 rounded-l-[1rem] rounded-r-[4rem] border-slate-500 bg-slate-950 items-center text-white text-xl gap-2">
        <div class="bg-slate-500 p-1 pr-2 border-4 rounded-l-[0.625rem] border-slate-400 -m-1 rounded-r-[1rem]">
          <Icon name="BsDiamondFill" stroke-width={2} class="stroke-amber-100 fill-amber-300" />
        </div>
        <Number class="text-amber-400" bold>
          {resources.gold}
        </Number>
      </div>
      <PayTurnText />
      <div onClick={() => modal().toggle()} class="border-2 flex flex-col gap-1">
        <ResourceCounter resource="water">
          <Icon name="TbDroplet" stroke-width={2} class="stroke-amber-100 fill-blue-500" />
        </ResourceCounter>
        <ResourceCounter resource="power">
          <Icon name="TbBolt" stroke-width={2} class="stroke-amber-100 fill-yellow-700" />
        </ResourceCounter>
        <ResourceCounter resource="oil">
          <Icon name="TbDroplet" stroke-width={2} class="stroke-amber-100 fill-slate-700" />
        </ResourceCounter>
      </div>
      <Modal
        id={modalId}
        default={false}
        onOpen={() => {
          console.log("open");
        }}
        onClose={() => {
          console.log("close");
        }}
      >
        <div class="w-40 h-40 bg-white">hhihi</div>
      </Modal>
    </section>
  );
};
