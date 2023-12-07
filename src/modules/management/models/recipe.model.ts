import type { Producer } from "@modules/management/models/traits/producer.trait.js";
import type { Consumer } from "@modules/management/models/traits/consumer.trait.js";
import { EntityManager } from "@modules/management/managers/entity.manager.js";
import { Products } from "@modules/management/models/product.model.js";
import type { Requiremental } from "@modules/management/models/traits/requiremental.trait.js";
import { Processors } from "@modules/management/models/processor.model.js";

export interface Recipe extends Producer, Consumer, Requiremental {
  name: string;
  description: string;
}

export namespace Recipes {
  const prototypes: Recipe[] = [
    {
      name: "flour",
      description:
        "Process of grinding wheat grains into fine powder, which is a fundamental ingredient in many recipes. It typically involves milling wheat and sieving to produce the desired texture and consistency.",
      produces: [
        {
          id: Products.flour,
          count: 1,
        },
      ],
      consumes: [
        {
          id: Products.wheat,
          count: 1,
        },
      ],
      requires: [
        {
          id: Processors.mill,
        },
      ],
    },
    {
      name: "tortilla",
      description:
        "Recipe outlines the step-by-step instructions for creating this flatbread from flour. It involves mixing, rolling, and cooking to produce a versatile food item commonly used in various dishes.",
      produces: [
        {
          id: Products.tortilla,
          count: 1,
        },
      ],
      consumes: [
        {
          id: Products.flour,
          count: 2,
        },
      ],
      requires: [
        {
          id: Processors.oven,
        },
      ],
    },
  ];

  export let [flour, tortilla] = EntityManager.create(prototypes, (items) => {
    [flour, tortilla] = items;
  });
}
