/**
 * @vitest-environment node
 * */
import { describe, expect, it } from "vitest";
import { EntityManager } from "./entity.manager.js";
import type { Entity, Identifier } from "@modules/management/models/traits/entity.trait.js";

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

    X = {
      prototypes: [{ name: "first" }, { name: "second" }] satisfies X[],
      first: () => -1,
      second: () => -1,
      initialize: () => [],
      restart: () => {},
    };

    Y = {
      prototypes: [{ name: "first", dependencies: [{ id: X.first }, { id: X.second }] }] satisfies Y[],
      first: () => -1,
      initialize: () => [],
      restart: () => {},
    };

    const [xInitialize, xRestart] = EntityManager.create(X.prototypes, (items) => ([X.first, X.second] = items));
    X.initialize = xInitialize;
    X.restart = xRestart;

    const [yInitialize, yRestart] = EntityManager.create(Y.prototypes, (items) => ([Y.first] = items));
    Y.initialize = yInitialize;
    Y.restart = yRestart;
  });

  let X: {
    prototypes: X[];
    first: () => number;
    second: () => number;
    initialize: () => Identifier[];
    restart: () => void;
  };
  let Y: {
    prototypes: Y[];
    first: () => number;
    initialize: () => Identifier[];
    restart: () => void;
  };

  it("should provide update ids with each restart", () => {
    expect(X.first()).toBe(-1);
    expect(X.second()).toBe(-1);
    expect(Y.first()).toBe(-1);

    X.restart();
    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(-1);

    Y.restart();
    expect(X.first()).toBe(1);
    expect(X.second()).toBe(2);
    expect(Y.first()).toBe(3);

    X.restart();
    expect(X.first()).toBe(4);
    expect(X.second()).toBe(5);
    expect(Y.first()).toBe(3);

    Y.restart();
    expect(X.first()).toBe(4);
    expect(X.second()).toBe(5);
    expect(Y.first()).toBe(6);
  });

  it("should correctly restart service on restart", () => {
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
