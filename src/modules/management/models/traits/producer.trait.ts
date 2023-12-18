import type { Entity } from "@modules/management/models/traits/entity.trait.js";
import type { Countable } from "@modules/management/models/traits/countable.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Producer {
  produces: (Countable & Entity)[];
}

export namespace Producer {
  export const is = <T extends object>(item: T): item is T & Producer => "produces" in item;
  export const read = (): Producer[] => EntityManager.find(is);
}
