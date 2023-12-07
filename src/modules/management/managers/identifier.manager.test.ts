/**
 * @vitest-environment node
 * */
import { IdentifierManager } from "./identifier.manager.js";

describe("Managers - Identifier Manager", () => {
  beforeEach(IdentifierManager.reset);

  it("Should assign consistent id", () => {
    const id = IdentifierManager.next();
    expect(id()).toBe(1);
    expect(id()).toBe(1);
  });

  it("Should assign next ids", () => {
    expect(IdentifierManager.next()()).toBe(1);
    expect(IdentifierManager.next()()).toBe(2);
    expect(IdentifierManager.next()()).toBe(3);
  });

  it("Should assign reset ids assignment", () => {
    expect(IdentifierManager.next()()).toBe(1);
    IdentifierManager.reset();
    expect(IdentifierManager.next()()).toBe(1);
  });
});
