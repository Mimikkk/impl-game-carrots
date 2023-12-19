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

const { iconById, recipes, query, setQuery, selected } = Inventory;
export const InventoryModal = () => (
  <Modal title="Inventory" id={InventoryModal.name} default>
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
                  <span class="text-amber-300 hover:text-amber-500">{upperfirst(recipe.name)}</span>
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  </Modal>
);
