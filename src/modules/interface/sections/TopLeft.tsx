import { Icon } from "@components/buttons/Icon/Icon.js";
import { Number } from "@components/texts/NumberText.js";
import { expenses, income, resources, tax, turnsTillTax } from "@modules/management/management.js";
import { Space } from "@components/texts/Space.js";
import { Show } from "solid-js";

interface Props {
  class?: string;
}

export const TopLeft = (props: Props) => (
  <section class={props.class}>
    <div class="border-4 flex pr-4 rounded-l-[1rem] rounded-r-[4rem] border-slate-500 bg-slate-950 items-center text-white text-xl gap-2">
      <div class="bg-slate-500 p-1 pr-2 border-4 rounded-l-[0.625rem] border-slate-400 -m-1 rounded-r-[1rem]">
        <Icon name="BsDiamondFill" stroke-width={2} class="stroke-amber-100 fill-amber-300" />
      </div>
      <Number class="text-amber-400" bold>
        {resources.gold}
      </Number>
    </div>
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
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <Icon name="TbDroplet" stroke-width={2} class="stroke-amber-100 fill-blue-500" />
        <div class="flex gap-0.5">
          <Number class="text-xl text-white" bold>
            {income.water}
          </Number>
          <Show when={expenses.water !== 0}>
            <div class="text-xs self-baseline font-bold">
              <Show when={expenses.water < 0}>
                <div class="flex text-red-500">
                  (<Number>{expenses.water}</Number>)
                </div>
              </Show>
              <Show when={expenses.water > 0}>
                <div class="flex text-green-500">
                  (+<Number>{expenses.water}</Number>)
                </div>
              </Show>
            </div>
          </Show>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="TbBolt" stroke-width={2} class="stroke-amber-100 fill-yellow-700" />
        <div class="flex gap-0.5">
          <Number class="text-xl text-white" bold>
            {income.power}
          </Number>
          <Show when={expenses.power !== 0}>
            <div class="text-xs self-baseline font-bold">
              <Show when={expenses.power < 0}>
                <div class="flex text-red-500">
                  (<Number>{expenses.power}</Number>)
                </div>
              </Show>
              <Show when={expenses.power > 0}>
                <div class="flex text-green-500">
                  (+<Number>{expenses.power}</Number>)
                </div>
              </Show>
            </div>
          </Show>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="TbDroplet" stroke-width={2} class="stroke-amber-100 fill-slate-700" />
        <div class="flex gap-0.5">
          <Number class="text-xl text-white" bold>
            {income.oil}
          </Number>
          <Show when={expenses.oil !== 0}>
            <div class="text-xs self-baseline font-bold">
              <Show when={expenses.oil < 0}>
                <div class="flex text-red-500">
                  (<Number>{expenses.oil}</Number>)
                </div>
              </Show>
              <Show when={expenses.oil > 0}>
                <div class="flex text-green-500">
                  (+<Number>{expenses.oil}</Number>)
                </div>
              </Show>
            </div>
          </Show>
        </div>
      </div>
    </div>
  </section>
);
