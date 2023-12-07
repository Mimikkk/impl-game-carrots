export type Identifier = () => number;

export interface Entity {
  id: Identifier;
}

export namespace Entity {
  export const is = <T extends object>(resource: T): resource is T & Entity => "id" in resource;
}
