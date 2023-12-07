/**
 * @vitest-environment node
 * */
import { IdentifierManager } from "./identifier.manager.js";

describe("[Managers] Identifier Manager", () => {
  const { next, reset } = IdentifierManager;
  beforeEach(reset);

  const use = () => next()();
  it("Should assign consistent id", () => {
    const id = next();

    expect(id()).toBe(1);
    expect(id()).toBe(1);
  });

  it("Should assign next ids", () => {
    expect(use()).toBe(1);
    expect(use()).toBe(2);
    expect(use()).toBe(3);
  });

  it("Should assign reset ids assignment", () => {
    expect(use()).toBe(1);
    reset();
    expect(use()).toBe(1);
  });
});
