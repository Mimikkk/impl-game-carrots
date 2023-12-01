import { Icon } from "@components/buttons/Icon/Icon.js";

interface Props {
  class?: string;
}

export const TopRight = (props: Props) => {
  return (
    <section class={props.class}>
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
    </section>
  );
};
