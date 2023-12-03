export interface Item {
  type: string;
  name: string;
  count: number;
}

export namespace Item {
  export const create = (type: string, name: string, count: number): Item => ({ type, name, count });
  export const single = (type: string, name: string): Item => create(type, name, 1);
}
