import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Grid } from "@components/containers/Grid/Grid.js";
import { LandIcon } from "@shared/logic-components/icons/Icons.js";
import { Number } from "@components/texts/NumberText.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Product } from "@modules/management/models/product.model.js";
import { createQueryable } from "@utils/search.js";
import { createMemo, createSignal } from "solid-js";
import cx from "clsx";
import s from "./InventoryModal.module.scss";

const items: Product[] = [
  Product.create("land", "Island Island Island Island", 2341231232, 17),
  Product.create("land", "Island", 2341231232, 34),
  Product.create("land", "Island", 2341231232, 72),
];

const { query, queried, setQuery } = createQueryable(items, {
  threshold: 0.4,
  isCaseSensitive: true,
  keys: ["name"],
});
const [selected, select] = createSignal<null | Product>(null);

export const InventoryModal = () => (
  <Modal title="Inventory" id={InventoryModal.name} default>
    <div class="center gap-4">
      <InventoryControls />
      <Grid
        class="border rounded-sm box-content p-3"
        itemclass="overflow-visible"
        gap={12}
        items={queried()}
        rows={4}
        columns={4}
        sizes={{ height: 64, width: 96 }}
        after={InventoryAfter}
        children={InventoryItem}
      />
    </div>
  </Modal>
);

const InventoryItem = (item: Product) => (
  <div onClick={() => select(item)} data-selected={selected() === item} class={s.item}>
    <span title={item.name} class={s.label}>
      {item.name}
    </span>
    <Number title={`${item.value}`} class={s.price}>
      {item.value}
    </Number>
    <LandIcon />
    <Number title={`${item.count}`} class={s.count}>
      {item.count}
    </Number>
  </div>
);
const InventoryControls = () => (
  <div class="flex flex-col self-baseline gap-4">
    <TextField label="search..." value={query()} onChange={setQuery} />
    <Button class="w-full">Sell all</Button>
  </div>
);
const InventoryAfter = (items: Product[]) => {
  const total = createMemo(() => items.reduce((total, item) => total + item.count * item.value, 0));
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
};
