/**
 * @vitest-environment node
 * */
import { describe, expect, it } from "vitest";
import { EntityManager } from "./entity.manager.js";
import type { Entity } from "@modules/management/models/traits/entity.trait.js";

interface X {
  name: string;
}

interface Y {
  name: string;
  dependencies: Entity[];
}

describe("Managers - Entity Manager", () => {
  beforeEach(() => {
    EntityManager.map.clear();
    EntityManager.restarts.clear();
    EntityManager.restart();
  });

  it("should correctly restart service on restart", () => {
    const X = {
      prototypes: [{ name: "first" }, { name: "second" }] satisfies X[],
      first: () => -1,
      second: () => -1,
    };
    const Y = {
      prototypes: [{ name: "first", dependencies: [{ id: X.first }, { id: X.second }] }] satisfies Y[],
      first: () => -1,
    };
    EntityManager.create(X.prototypes, (items) => ([X.first, X.second] = items));
    EntityManager.create(Y.prototypes, (items) => ([Y.first] = items));

    expect(X.first()).toBe(-1);
    expect(X.second()).toBe(-1);
    expect(Y.first()).toBe(-1);

    EntityManager.restart();

    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);

    EntityManager.restart();

    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);
  });

  it("should allow for dynamic registration", () => {
    const item = { name: "third" } as X & Partial<Entity>;

    expect(item.id?.()).toBe(undefined);

    EntityManager.register(item);

    expect(() => EntityManager.register(item)).throws();

    expect(item.id?.()).toBe(1);

    EntityManager.unregister(item);

    expect(() => EntityManager.unregister(item)).throws();

    expect(item.id?.()).toBe(undefined);

    EntityManager.register(item);

    expect(item.id?.()).toBe(2);
  });
});
