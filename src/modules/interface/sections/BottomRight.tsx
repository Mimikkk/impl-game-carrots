import { Icon } from "@components/buttons/Icon/Icon.js";

interface Props {
  class?: string;
}

export const BottomRight = (props: Props) => {
  return (
    <section class={props.class}>
      <div class="w-36 h-36 bg-slate-800 border-8 border-slate-500 flex items-center justify-center rounded-sm">
        <Icon name="TbArrowBigRightLine" stroke-width={2} size="2xl" class="stroke-amber-100 fill-amber-700" />
      </div>
    </section>
  );
};
