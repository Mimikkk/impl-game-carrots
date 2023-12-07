/**
 * @vitest-environment node
 * */
import { describe, expect, it } from "vitest";
import { EntityManager } from "./entity.manager.js";
import type { Entity } from "@modules/management/models/traits/entity.trait.js";

describe("Managers - Entity Manager", () => {
  interface X {
    name: string;
  }

  interface Y {
    name: string;
    dependencies: Entity[];
  }

  const { map, restarts, register, unregister, create, restart } = EntityManager;
  beforeEach(() => {
    map.clear();
    restarts.clear();
    restart();
  });

  it("should correctly restart service with invalidated identifiers", () => {
    const X = {
      prototypes: [{ name: "first" }, { name: "second" }] satisfies X[],
      first: () => -1,
      second: () => -1,
    };
    const Y = {
      prototypes: [{ name: "first", dependencies: [{ id: X.first }, { id: X.second }] }] satisfies Y[],
      first: () => -1,
    };
    expect(X.first()).toBe(-1);
    expect(X.second()).toBe(-1);
    expect(Y.first()).toBe(-1);

    [X.first, X.second] = create(X.prototypes, (items) => ([X.first, X.second] = items));
    [Y.first] = create(Y.prototypes, (items) => ([Y.first] = items));

    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);

    restart();

    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);

    restart();

    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);
  });

  it("should allow for dynamic registration of a identifier", () => {
    const item = { name: "third" } as X & Partial<Entity>;

    expect(item.id?.()).toBe(undefined);

    register(item);

    expect(() => register(item)).throws();

    expect(item.id?.()).toBe(1);

    unregister(item);

    expect(() => unregister(item)).throws();

    expect(item.id?.()).toBe(undefined);

    register(item);

    expect(item.id?.()).toBe(2);
  });
});
