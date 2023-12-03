import { Icon } from "@components/buttons/Icon/Icon.js";
import { Number } from "@components/texts/NumberText.js";
import { expense, turn } from "@modules/management/management.js";

interface Props {
  class?: string;
}

export const BottomLeft = (props: Props) => {
  return (
    <section class={props.class}>
      <div class="flex gap-2">
        <div class="relative w-6 h-6">
          <Icon name="BsDiamondFill" stroke-width={2} size="xs" class="abr-0 stroke-amber-100 fill-amber-300" />
          <Icon class="absolute fill-neutral-600 stroke-amber-100 stroke" stroke-width={2} name="BiSolidWrench" />
        </div>
        <Number class="text-red-500 text-xl" bold>
          {Math.abs(expense.gold)}
        </Number>
      </div>
      <div class="text-white text-2xl flex gap-2">
        <span>Day</span>
        <Number>{turn()}</Number>
      </div>
    </section>
  );
};
