import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Countable {
  count: number;
}

export namespace Countable {
  export const is = <T extends object>(item: T): item is T & Countable => "count" in item;
  export const read = (): Countable[] => EntityManager.find(is);
}
