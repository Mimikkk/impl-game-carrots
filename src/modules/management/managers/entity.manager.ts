import type { Identifier } from "@modules/management/models/traits/entity.trait.js";
import { Entity } from "@modules/management/models/traits/entity.trait.js";
import { fp } from "@utils/fp.js";
import { IdentifierManager } from "./identifier.manager.js";
import { clone } from "remeda";

export namespace EntityManager {
  const idm = IdentifierManager;
  export const map = new Map<Identifier, Entity>();

  const make = <T>(item: T): T & Entity => {
    const resource: T & Entity = item as T & Entity;
    resource.id = idm.next();

    return resource as T & Entity;
  };

  export const [register, registers] = fp.mapping((resource): Identifier => {
    if ("id" in resource) throw Error(`Resource '${resource.id}' already registered`, resource);

    make(resource);
    map.set(resource.id, resource);
    return resource.id;
  });
  export const [unregister, unregisters] = fp.mapping((resource): Identifier => {
    if (!("id" in resource)) throw Error(`Resource '${resource.id}' not registered`, resource);

    map.delete(resource.id);
    let id = resource.id;
    delete resource.id;
    return id;
  });
  export const [read, reads] = fp.mapping(<T extends object>(id: Identifier): T & Entity => {
    const resource = map.get(id);
    if (resource === undefined) throw Error(`Resource with id '${id}' not found`);
    return resource as T & Entity;
  });

  export const find = <T extends object>(predicate: (resource: object & Entity) => boolean): (T & Entity)[] => {
    const resources: (T & Entity)[] = [];

    for (const resource of map.values()) if (predicate(resource)) resources.push(resource as T & Entity);

    return resources;
  };

  export const restarts = new Set<() => void>();
  export const create = <T>(prototypes: T[], handle: (ids: Identifier[]) => void) => {
    let current: undefined | T[];

    const initialize = () => {
      if (current) unregisters(current);
      current = clone(prototypes);
      return registers(current);
    };

    restarts.add(() => handle(initialize()));

    return initialize();
  };

  export const restart = () => {
    idm.reset();
    for (const restart of restarts) restart();
  };
}
