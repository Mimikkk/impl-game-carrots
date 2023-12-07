import { EntityManager } from "@modules/management/managers/entity.manager.js";
import type { Consumer } from "@modules/management/models/traits/consumer.trait.js";

export interface Processor extends Consumer {
  name: string;
  description: string;
}

export namespace Processors {
  const prototypes: Processor[] = [
    {
      name: "mill",
      description:
        "Mechanical processor unit used for grinding grains, such as wheat, into flour. It typically consists of grinding stones or other mechanisms to crush the grains, resulting in finely ground flour suitable for various culinary purposes.",
      consumes: [],
    },
    {
      name: "oven",
      description:
        "Heat-based processor unit used for baking and cooking a wide range of food items, including tortillas. It provides controlled heating to transform raw ingredients, like tortilla dough, into a finished, edible product through the application of dry heat.",
      consumes: [],
    },
  ];

  export let [mill, oven] = EntityManager.create(prototypes, (items) => {
    [mill, oven] = items;
  });
}
