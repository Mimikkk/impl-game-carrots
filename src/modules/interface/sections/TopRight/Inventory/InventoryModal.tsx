import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Grid } from "@components/containers/Grid/Grid.js";
import { Number } from "@components/texts/NumberText.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { type Product, Products } from "@modules/management/models/product.model.js";
import { createQueryable } from "@utils/search.js";
import { createMemo, createSignal, For, on, Show } from "solid-js";
import cx from "clsx";
import s from "./InventoryModal.module.scss";
import type { Entity, Identifier } from "@modules/management/models/traits/entity.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";
import { memo } from "@utils/memo.js";
import { Space } from "@components/texts/Space.js";
import { type Recipe, Recipes } from "@modules/management/models/recipe.model.js";
import { Icon, type IconName } from "@components/buttons/Icon/Icon.js";

interface ProductWithCount {
  product: Product & Entity;
  count: number;
}

export namespace ProductWithCount {
  export const create = (id: Identifier, count: number): ProductWithCount => ({
    product: EntityManager.read(id),
    count,
  });
}

const iconById = ({ id }: Entity): IconName => {
  if (id === Products.flour) return "AiFillAlert";
  if (id === Products.wheat) return "AiFillBank";
  if (id === Products.tortilla) return "AiFillAmazonCircle";
  return "IoEarth";
};

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
const [selected, set] = createSignal<null | ProductWithCount>(null);
const select = (item: ProductWithCount) => set(selected() === item ? null : item);
const recipes = createMemo(
  on(selected, (selected) =>
    selected
      ? Recipes.list
          .map<Recipe>(EntityManager.read)
          .filter((recipe) => recipe.consumes.some((item) => item.id() === selected.product.id()))
      : [],
  ),
);

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
      <div class={cx("transition-all col-span-3 overflow-auto", selected() ? "h-48" : "h-0")}>
        <div>{selected()?.product.description}</div>
        <Show when={recipes().length}>
          <div class="flex gap-1">
            <span>
              <span class="text-amber-300">Recipes:</span>
              <Space />
            </span>
            <For each={recipes()}>
              {(recipe) => (
                <button class="flex group transition-all hover:bg-slate-700 rounded-sm px-2">
                  <For each={recipe.produces}>
                    {(product) => (
                      <span class="flex items-center gap-1">
                        <Icon size={"sm"} name={iconById(product)} />x{product.count}
                      </span>
                    )}
                  </For>
                  <Space />
                  <span class="text-amber-300 hover:text-amber-500">{upperFirst(recipe.name)}</span>
                </button>
              )}
            </For>
          </div>
        </Show>
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
      <span class="text-amber-200 flex items-center justify-between transition-all w-0 overflow-hidden group-hover:w-10">
        Value:
      </span>
      <Number title={`${item.product.value}`}>{item.product.value}</Number>
    </div>
    <Icon size="lg" name={iconById(item.product)} />
    <div class={cx(s.count, "group transition-all")}>
      <span class="text-amber-200 flex items-center justify-between transition-all w-0 overflow-hidden group-hover:w-8">
        Held:
      </span>
      <Number title={`${item.count}`}>{item.count}</Number>
    </div>
  </button>
);
const InventoryControls = () => (
  <div class="flex flex-col h-full self-baseline gap-4">
    <TextField label="search..." value={query()} onChange={setQuery} />
    <Button class="w-full">Sell all</Button>
    <Show when={selected()}>
      <Button class="mt-auto w-full">Sell selected</Button>
    </Show>
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
