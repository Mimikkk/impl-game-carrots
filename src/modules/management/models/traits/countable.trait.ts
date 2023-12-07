import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Countable {
  count: number;
}

export namespace Countable {
  export const read = (): Countable[] => EntityManager.find((item) => "count" in item);
}
