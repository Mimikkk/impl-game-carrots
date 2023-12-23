import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { createMemo, For, Show } from "solid-js";
import cx from "clsx";
import { Space } from "@components/texts/Space.js";
import { Icon } from "@components/buttons/Icon/Icon.js";
import { upperfirst } from "@utils/upperfirst.js";
import { InventoryGrid } from "@modules/interface/sections/TopRight/Inventory/InventoryGrid.js";
import { Modals } from "@logic/modals.js";
import type { Recipe } from "@modules/management/models/recipe.model.js";
import { String } from "@components/texts/String.js";
import type { Entity } from "@modules/management/models/traits/entity.trait.js";
import type { Countable } from "@modules/management/models/traits/countable.trait.js";
import { Inventory } from "@modules/management/inventory.logic.js";

const { iconById, recipes, selected } = Inventory;

const RecipeModal = () => {
  const recipe = createMemo(() => recipemodal().state?.recipe!);

  const title = createMemo(() => `Recipe${recipe() ? ` - ${upperfirst(recipe().name)}` : ""}`);

  return (
    <Modal size="sm" id={RecipeModal.name} title={title()}>
      <Show when={recipe()}>
        <div>{recipe().description}</div>
        <div class="center-y gap-2">
          <span>Produces:</span>
          <div>
            <For each={recipe().produces}>{(countable) => <CountableLabel countable={countable} />}</For>
          </div>
        </div>
      </Show>
    </Modal>
  );
};
const recipemodal = Modals.signal<{ recipe: Recipe }>(RecipeModal.name);

export const InventoryModal = () => (
  <Modal size="lg" title="Inventory" id={InventoryModal.name} default>
    <RecipeModal />
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col h-full self-baseline gap-4">
        <TextField label="search..." value={Inventory.query()} onChange={Inventory.setQuery} />
        <Button
          class="w-full"
          onClick={() => {
            Inventory.setItems([]);
          }}
        >
          Sell all
        </Button>
        <Show when={selected()}>
          <Button
            class="mt-auto w-full"
            onClick={() => {
              if (!selected()) return;

              Inventory.setItems((items) => items.filter((item) => item !== selected()));
            }}
          >
            Sell selected
          </Button>
        </Show>
      </div>
      <InventoryGrid />
      <div class={cx("transition-all col-span-3 overflow-auto", selected() ? "h-48" : "h-0")}>
        <div>{selected()?.product.description}</div>
        <Show when={recipes().length}>
          <div class="flex gap-1">
            <span>
              <span class="text-amber-300">Recipes:</span>
              <Space />
            </span>
            <For each={recipes()} children={RecipeButton} />
          </div>
        </Show>
      </div>
    </div>
  </Modal>
);

const RecipeButton = (recipe: Recipe) => (
  <Button variant="text" onClick={(event) => recipemodal().open({ event, with: { recipe } })}>
    <For each={recipe.produces}>{(countable) => <CountableLabel countable={countable} />}</For>
    <Space />
    <String class="transition-all text-amber-300 group-hover:text-amber-400">{upperfirst(recipe.name)}</String>
  </Button>
);

interface CountableLabelProps {
  countable: Countable & Entity;
  class?: string;
}

const CountableLabel = (props: CountableLabelProps) => (
  <span class={cx(props.class, "flex items-center gap-1")}>
    <Icon size="sm" name={iconById(props.countable)} />x{props.countable.count}
  </span>
);
