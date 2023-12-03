import { TextField } from "@components/forms/TextField/TextField.js";
import { Button } from "@components/buttons/Button/Button.js";
import { Grid } from "@components/containers/Grid/Grid.js";
import { LandIcon } from "@shared/logic-components/icons/Icons.js";
import { Number } from "@components/texts/NumberText.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { Item } from "@modules/interface/sections/TopRight/item.js";
import { createQueryable } from "@utils/search.js";

const items: Item[] = [
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
  Item.create("land", "Island", 2341231232),
];

export const InventoryModal = () => {
  const { query, queried, setQuery } = createQueryable(items, {
    threshold: 0.4,
    isCaseSensitive: true,
    keys: ["name"],
  });

  return (
    <Modal title="Inventory" id={InventoryModal.name} default>
      <div class="center gap-4">
        <div class="flex flex-col self-baseline gap-4">
          <TextField label="search..." value={query()} onChange={setQuery} />
          <Button class="w-full">Sell all</Button>
        </div>
        <Grid
          class="border rounded-sm box-content p-2"
          itemclass="border rounded overflow-visible"
          gap={12}
          items={queried()}
          rows={4}
          columns={6}
          sizes={{ height: 64, width: 64 }}
          after={(items) => {
            return (
              <div class="flex gap-2">
                <span class="flex gap-2">
                  <span>Total worth:</span>
                  <Number class="text-amber-200">{items.reduce((total, item) => total + item.count, 0)}</Number>
                </span>
              </div>
            );
          }}
        >
          {(item) => (
            <div class="relative full center">
              <span>
                <LandIcon />
              </span>
              <Number class="abr-0 border bg-black -m-1.5 h-5 rounded-sm center px-1">{item.count}</Number>
            </div>
          )}
        </Grid>
      </div>
    </Modal>
  );
};
