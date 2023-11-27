import type { FuseResult, IFuseOptions } from "fuse.js";
import Fuse from "fuse.js";
import { createMemo, createSignal } from "solid-js";

const extract = <T>({ item }: FuseResult<T>) => item;

export interface SearchOptions<T> extends IFuseOptions<T> {
  limit?: number;
}

export const createSearch = <T>(items: T[], options?: SearchOptions<T>) => {
  const fuse = new Fuse(items, options);
  fuse.setCollection(items);

  return (query: string, limit: undefined | number = options?.limit) =>
    query === ""
      ? items
      : limit === undefined
      ? fuse.search(query).map(extract)
      : fuse.search(query, { limit }).map(extract);
};

export const createQueryable = <T>(items: T[], options?: SearchOptions<T>) => {
  const search = createSearch(items, options);
  const [query, setQuery] = createSignal("");
  const queried = createMemo(() => search(query()));

  return { query, setQuery, queried };
};
