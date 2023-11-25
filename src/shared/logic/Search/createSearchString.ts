import { createSearchParam } from "@logic/Search/createSearchParam.js";
import { identity } from "@typing/identity.js";

export const createSearchString = (param: string, fallback: string) =>
  createSearchParam(param, fallback, identity, identity);
