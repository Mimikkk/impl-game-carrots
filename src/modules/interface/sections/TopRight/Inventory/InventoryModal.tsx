import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Grid } from "@components/containers/Grid/Grid.js";
import { LandIcon } from "@shared/logic-components/icons/Icons.js";
import { Number } from "@components/texts/NumberText.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { type Product, Products } from "@modules/management/models/product.model.js";
import { createQueryable } from "@utils/search.js";
import { createMemo, createSignal } from "solid-js";
import cx from "clsx";
import s from "./InventoryModal.module.scss";
import type { Identifier } from "@modules/management/models/traits/entity.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";
import { memo } from "@utils/memo.js";
import { Space } from "@components/texts/Space.js";

interface ProductWithCount {
  product: Product;
  count: number;
}

export namespace ProductWithCount {
  export const create = (id: Identifier, count: number): ProductWithCount => ({
    product: EntityManager.read(id),
    count,
  });
}

const items: ProductWithCount[] = [
  ProductWithCount.create(Products.flour, 1231217),
  ProductWithCount.create(Products.wheat, 3123214),
  ProductWithCount.create(Products.tortilla, 72),
];

const { query, queried, setQuery } = createQueryable(items, {
  threshold: 0.4,
  isCaseSensitive: true,
  keys: ["product.name", "product.description"],
});
const [selected, select] = createSignal<null | ProductWithCount>(null);

export const InventoryModal = () => (
  <Modal title="Inventory" id={InventoryModal.name} default>
    <div class="grid grid-cols-3 gap-4">
      <InventoryControls />
      <Grid
        class="border rounded-sm box-content p-3"
        containerclass="col-span-2"
        itemclass="overflow-visible"
        gap={12}
        items={queried()}
        rows={4}
        columns={4}
        sizes={{ height: 64, width: 124 }}
        after={InventoryAfter}
        children={InventoryItem}
      />
      <div class="col-span-3">
        <div>{selected()?.product.description}</div>
        <div>{selected()?.product.description}</div>
      </div>
    </div>
  </Modal>
);

const upperFirst = memo((str: string) => str.charAt(0).toUpperCase() + str.slice(1));

const InventoryItem = (item: ProductWithCount) => (
  <button onClick={() => select(item)} data-selected={selected() === item} class={s.item}>
    <span title={item.product.name} class={s.label}>
      {upperFirst(item.product.name)}
    </span>
    <div class={cx(s.price, "group transition-all")}>
      <span class="transition-all w-0 overflow-hidden group-hover:w-12">
        Value:
        <Space />
      </span>
      <Number title={`${item.product.value}`}>{item.product.value}</Number>
    </div>
    <LandIcon />
    <div class={cx(s.count, "group transition-all")}>
      <span class="transition-all w-0 overflow-hidden group-hover:w-12">
        Held:
        <Space />
      </span>
      <Number title={`${item.count}`}>{item.count}</Number>
    </div>
  </button>
);
const InventoryControls = () => (
  <div class="flex flex-col self-baseline gap-4">
    <TextField label="search..." value={query()} onChange={setQuery} />
    <Button class="w-full">Sell all</Button>
  </div>
);
const InventoryAfter = (items: ProductWithCount[]) => {
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
};
