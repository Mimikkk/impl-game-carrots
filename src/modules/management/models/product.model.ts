import { EntityManager } from "@modules/management/managers/entity.manager.js";
export interface Product {
  name: string;
  description: string;
  value: number;
}

export namespace Products {
  const prototypes: Product[] = [
    {
      name: "wheat",
      description: "Agricultural product with versatile applications in food production and processing.",
      value: 1,
    },
    {
      name: "flour",
      description:
        "Flour is a product derived from wheat, widely used in baking and food preparation, making it a valuable commodity.",
      value: 3,
    },
    {
      name: "tortilla",
      description: "Staple food made from flour for sustenance.",
      value: 10,
    },
  ];

  export let [wheat, flour, tortilla] = EntityManager.create(prototypes, (items) => {
    [wheat, flour, tortilla] = items;
  });
}
