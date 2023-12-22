import { Grid } from "@components/containers/Grid/Grid.js";
import { Number } from "@components/texts/Number.js";
import { createMemo } from "solid-js";
import cx from "clsx";
import s from "./InventoryModal.module.scss";
import { Icon } from "@components/buttons/Icon/Icon.js";
import { LabelText } from "@components/texts/LabelText.js";
import { String } from "@components/texts/String.js";
import { upperfirst } from "@utils/upperfirst.js";
import { Inventory } from "@modules/management/inventory.logic.js";

const { iconById, queried, selected, select } = Inventory;
export const InventoryGrid = () => (
  <Grid
    class="border rounded-sm box-content p-3"
    containerclass="col-span-2"
    itemclass="overflow-visible"
    gap={12}
    items={queried()}
    rows={4}
    columns={4}
    sizes={{ height: 64, width: 124 }}
    after={(items) => {
      const total = createMemo(() => items.reduce((total, item) => total + item.count * item.product.value, 0));
      const types = createMemo(() => items.length);
      const worth = createMemo(() => items.reduce((total, item) => total + item.count, 0));

      return (
        <div class={s.after}>
          <div class={s.keyvalue}>
            <span>Total:</span>
            <Number class={s.value}>{total()}</Number>
          </div>
          <div class={s.keyvalue}>
            <span>Types:</span>
            <Number class={s.value}>{types()}</Number>
          </div>
          <div class={cx(s.keyvalue, "ml-auto")}>
            <span>Worth:</span>
            <Number class={s.value}>{worth()}</Number>
          </div>
        </div>
      );
    }}
  >
    {(item) => (
      <button onClick={() => select(item)} data-selected={selected() === item} class={s.item}>
        <String class={s.label}>{upperfirst(item.product.name)}</String>
        <LabelText class={s.price} label="Value:" labelclass="group-hover:w-10">
          <Number title={`${item.product.value}`}>{item.product.value}</Number>
        </LabelText>
        <Icon size="lg" name={iconById(item.product)} />
        <LabelText class={s.count} label="Held:" labelclass="group-hover:w-8">
          <Number title={`${item.count}`}>{item.count}</Number>
        </LabelText>
      </button>
    )}
  </Grid>
);
