import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { For, Show } from "solid-js";
import cx from "clsx";
import { Space } from "@components/texts/Space.js";
import { Icon } from "@components/buttons/Icon/Icon.js";
import { upperfirst } from "@utils/upperfirst.js";
import { Inventory } from "@modules/interface/sections/TopRight/Inventory/inventory.logic.js";
import { InventoryGrid } from "@modules/interface/sections/TopRight/Inventory/InventoryGrid.js";
import { Modals } from "@logic/modals.js";
import type { Recipe } from "@modules/management/models/recipe.model.js";
import { String } from "@components/texts/String.js";

const { iconById, recipes, query, setQuery, selected } = Inventory;

const RecipeModal = () => {
  return (
    <Modal id={RecipeModal.name} title={recipemodal().state.recipe?.name}>
      <div>hehe</div>
    </Modal>
  );
};
const recipemodal = Modals.signal<{ recipe: Recipe }>(RecipeModal.name);

export const InventoryModal = () => (
  <Modal size="lg" title="Inventory" id={InventoryModal.name} default>
    <RecipeModal />
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col h-full self-baseline gap-4">
        <TextField label="search..." value={query()} onChange={setQuery} />
        <Button class="w-full">Sell all</Button>
        <Show when={selected()}>
          <Button class="mt-auto w-full">Sell selected</Button>
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
  <button
    onClick={(event) => recipemodal().open({ event, with: { recipe } })}
    class="flex group transition-all hover:bg-slate-700 rounded-sm px-2 hover:border-opacity-100 border-opacity-0 border border-amber-300 active:border-amber-500"
  >
    <For each={recipe.produces}>
      {(product) => (
        <span class="flex items-center gap-1">
          <Icon size={"sm"} name={iconById(product)} />x{product.count}
        </span>
      )}
    </For>
    <Space />
    <String class="transition-all text-amber-300 group-hover:text-amber-400">{upperfirst(recipe.name)}</String>
  </button>
);
