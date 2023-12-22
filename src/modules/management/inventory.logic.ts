import { type Product, Products } from "@modules/management/models/product.model.js";
import type { Entity, Identifier } from "@modules/management/models/traits/entity.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";
import type { IconName } from "@components/buttons/Icon/Icon.js";
import { createQueryable } from "@utils/search.js";
import { createMemo, createSignal, on } from "solid-js";
import { RecipeManager } from "@modules/management/managers/recipe.manager.js";

export namespace Inventory {
  export interface ProductWithCount {
    product: Product & Entity;
    count: number;
  }

  export namespace ProductWithCount {
    export const create = (id: Identifier, count: number): ProductWithCount => ({
      product: EntityManager.read(id),
      count,
    });
  }

  export const iconById = ({ id }: Entity): IconName => {
    if (id === Products.flour) return "AiFillAlert";
    if (id === Products.wheat) return "AiFillBank";
    if (id === Products.tortilla) return "AiFillAmazonCircle";
    return "IoEarth";
  };

  export const items: ProductWithCount[] = [
    ProductWithCount.create(Products.flour, 1231217),
    ProductWithCount.create(Products.wheat, 3123214),
    ProductWithCount.create(Products.tortilla, 72),
  ];

  export const { query, queried, setQuery } = createQueryable(items, {
    threshold: 0.4,
    isCaseSensitive: true,
    keys: ["product.name", "product.description"],
  });
  export const [selected, set] = createSignal<null | ProductWithCount>(null);
  export const select = (item: ProductWithCount) => set(selected() === item ? null : item);
  export const recipes = createMemo(
    on(selected, (selected) =>
      selected ? RecipeManager.where(({ consumes }) => consumes.some(({ id }) => id === selected.product.id)) : [],
    ),
  );
}
