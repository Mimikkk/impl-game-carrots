import { EntityManager } from "@modules/management/managers/entity.manager.js";
import { Products } from "@modules/management/models/product.model.js";
import type { Producer } from "@modules/management/models/traits/producer.trait.js";
import type { Consumer } from "@modules/management/models/traits/consumer.trait.js";
import { Currencies } from "@modules/management/models/currency.model.js";

export interface Crop extends Producer, Consumer {
  name: string;
  description: string;
}

export namespace Crops {
  const prototypes: Crop[] = [
    {
      name: "wheat",
      description: "Foundational agricultural crop with versatile applications of its product in processing.",
      produces: [
        {
          id: Products.wheat,
          count: 1,
        },
      ],
      consumes: [
        {
          id: Currencies.water,
          count: 1,
        },
      ],
    },
  ];

  export let [wheat] = EntityManager.create(prototypes, (items) => {
    [wheat] = items;
  });
}
