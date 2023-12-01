import { Icon } from "@components/buttons/Icon/Icon.js";
import { Button } from "@components/buttons/Button/Button.js";
import { nextTurn } from "@modules/management/management.js";

interface Props {
  class?: string;
}

export const BottomRight = (props: Props) => {
  return (
    <section class={props.class}>
      <Button class="w-36 h-36 border-8" onClick={() => nextTurn()}>
        <Icon name="TbArrowBigRightLine" stroke-width={2} size="2xl" class="stroke-amber-100 fill-amber-700" />
      </Button>
    </section>
  );
};
