import type { Entity } from "@modules/management/models/traits/entity.trait.js";
import type { Countable } from "@modules/management/models/traits/countable.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Consumer {
  consumes: (Countable & Entity)[];
}

export namespace Consumer {
  export const read = (): Consumer[] => EntityManager.find((item) => "consumes" in item);
}
