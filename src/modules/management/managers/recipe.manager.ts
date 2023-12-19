import { type Recipe, Recipes } from "@modules/management/models/recipe.model.js";
import type { Entity } from "@modules/management/models/traits/entity.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";

export namespace RecipeManager {
  export const recipes = Recipes.list.map(EntityManager.read<Recipe>);

  export const find = (predicate: (recipe: Recipe & Entity) => boolean): (Recipe & Entity) | undefined =>
    recipes.find(predicate);

  export const where = (predicate: (recipe: Recipe & Entity) => boolean): (Recipe & Entity)[] =>
    recipes.filter(predicate);
}
