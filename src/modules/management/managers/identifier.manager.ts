import type { Identifier } from "@modules/management/models/traits/entity.trait.js";

export namespace IdentifierManager {
  export let id = 0;

  export const next = (): Identifier => {
    const value = ++id;
    return () => value;
  };

  export const reset = (): void => {
    id = 0;
  };
}
