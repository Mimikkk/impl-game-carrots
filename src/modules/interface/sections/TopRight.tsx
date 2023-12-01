import { Icon } from "@components/buttons/Icon/Icon.js";
import cx from "clsx";
import { Button } from "@components/buttons/Button/Button.js";

interface Props {
  class?: string;
}
export const TopRight = (props: Props) => {
  return (
    <section class={cx(props.class)}>
      <div class="flex gap-2">
        <Button class="w-10 h-10">
          <Icon name="BsDiamondFill" stroke-width={2} size="xs" class="stroke-amber-100 fill-amber-300" />
        </Button>
        <Button class="w-10 h-10">
          <Icon name="TbCards" stroke-width={2} class="stroke-amber-100 fill-amber-700" />
        </Button>
        <Button class="w-10 h-10">
          <Icon name="BiSolidBookBookmark" stroke-width={2} size="sm" class="stroke-amber-100 fill-blue-700" />
        </Button>
      </div>
    </section>
  );
};
