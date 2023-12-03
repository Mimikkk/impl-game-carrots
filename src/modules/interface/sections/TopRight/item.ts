export interface Item {
  type: string;
  name: string;
  count: number;
  value: number;
}

export namespace Item {
  export const create = (type: string, name: string, count: number, value: number): Item => ({
    type,
    name,
    count,
    value,
  });
  export const single = (type: string, name: string, value: number): Item => create(type, name, 1, value);
}
