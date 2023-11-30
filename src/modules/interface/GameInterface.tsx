import { Icon } from "@components/buttons/Icon/Icon.js";
import { expenses, income, resources, tax, turn, turnsTillTax } from "@modules/management/management.js";
import { Number } from "@components/forms/texts/NumberText.js";
import { Show } from "solid-js";

export const Space = () => <>&nbsp;</>;

export const GameInterface = () => {
  return (
    <div class="fixed p-4 w-full h-full">
      <div class="absolute top-4">
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
      </div>
      <div class="absolute bottom-4">
        <div class="flex gap-2">
          <div class="relative w-6 h-6">
            <Icon
              name="BsDiamondFill"
              stroke-width={2}
              size="xs"
              class="bottom-0 right-0 absolute stroke-amber-100 fill-amber-300"
            />
            <Icon class="absolute fill-neutral-600 stroke-amber-100 stroke" stroke-width={2} name="BiSolidWrench" />
          </div>
          <Number class="text-red-500 text-xl" bold>
            {Math.abs(expenses.gold)}
          </Number>
        </div>
        <div class="text-white text-2xl flex gap-2">
          <span>Day</span>
          <Number>{turn()}</Number>
        </div>
      </div>
      <div class="absolute right-4">
        <div class="flex gap-2">
          <div class="w-10 h-10 bg-slate-800 border-4 border-slate-500 flex items-center justify-center rounded-sm">
            <Icon name="BsDiamondFill" stroke-width={2} size="xs" class="stroke-amber-100 fill-amber-300" />
          </div>
          <div class="w-10 h-10 bg-slate-800 border-4 border-slate-500 flex items-center justify-center rounded-sm">
            <Icon name="TbCards" stroke-width={2} class="stroke-amber-100 fill-amber-700" />
          </div>
          <div class="w-10 h-10 bg-slate-800 border-4 border-slate-500 flex items-center justify-center rounded-sm">
            <Icon name="BiSolidBookBookmark" stroke-width={2} size="sm" class="stroke-amber-100 fill-blue-700" />
          </div>
        </div>
      </div>
      <div class="absolute bottom-4 right-4">
        <div class="w-36 h-36 bg-slate-800 border-8 border-slate-500 flex items-center justify-center rounded-sm">
          <Icon name="TbArrowBigRightLine" stroke-width={2} size="2xl" class="stroke-amber-100 fill-amber-700" />
        </div>
      </div>
    </div>
  );
};
