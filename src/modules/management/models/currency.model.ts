import { EntityManager } from "@modules/management/managers/entity.manager.js";

export interface Currency {
  name: string;
  description: string;
}

export namespace Currencies {
  const prototypes: Currency[] = [
    {
      name: "gold",
      description:
        "A lifeblood mostly used to pay for upkeep and maintenance of placed entities. Serves as a medium of exchange and a measure of value for various transactions and trade.",
    },
    {
      name: "water",
      description:
        "Water plays a crucial role as a currency, primarily used for irrigating crops to support agricultural production and sustenance.",
    },
    {
      name: "oil",
      description:
        "Serves as a key currency, primarily employed for fueling mechanical machines and equipment, essential for various industrial and technological processes.",
    },
    {
      name: "power",
      description:
        "Power is a significant currency, predominantly utilized for operating electrical machines and devices; modern infrastructure.",
    },
  ];

  const [initialize, restart_] = EntityManager.create(prototypes, (items) => {
    [gold, water, oil, power] = items;
  });

  export const restart = restart_;
  export let [gold, water, oil, power] = initialize();
}
