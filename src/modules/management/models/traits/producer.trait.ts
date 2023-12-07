import type { Entity } from "@modules/management/models/traits/entity.trait.js";
import type { Countable } from "@modules/management/models/traits/countable.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Producer {
  produces: (Countable & Entity)[];
}

export namespace Producer {
  export const read = (): Producer[] => EntityManager.find((item) => "produces" in item);
}
