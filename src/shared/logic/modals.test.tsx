import { describe, expect, it, type TestFunction } from "vitest";
import { Modals } from "@logic/modals.js";
import { createEffect, createRoot, on } from "solid-js";

const sfn =
  <Context, Fn extends (context: Context) => void>(fn: Fn): TestFunction<Context> =>
  async (context) =>
    createRoot(async (dispose) => (await fn(context), dispose()));

describe("Logic - Modals", () => {
  const modalId = "test";

  beforeEach(sfn(() => Modals.setStore(modalId, undefined!)));

  it(
    "should be attachable and detachable only once",
    sfn(() => {
      expect(Modals.store).toEqual({});

      expect(() => Modals.attach(modalId, { default: false })).not.throws();
      expect(() => Modals.attach(modalId, { default: false })).throws();

      expect(Modals.store).toEqual({ [modalId]: Modals.read(modalId) });

      expect(() => Modals.detach(modalId)).not.throws();
      expect(() => Modals.detach(modalId)).throws();

      expect(Modals.store).toEqual({});
    }),
  );

  it(
    "should be able to open and close with state and event",
    sfn(() => {
      Modals.attach(modalId, { default: false });
      const modal = Modals.read(modalId);

      expect(modal.isOpen()).toBe(false);
      modal.open({ event: { currentTarget: "test" } as any, with: { test: "test" } });
      expect(modal.isOpen()).toBe(true);
      expect(modal.parent()).toBe("test");
      expect(modal.state).toEqual({ test: "test" });
      modal.close();
      expect(modal.isOpen()).toBe(false);
      expect(modal.parent()).toBe(undefined);
      expect(modal.state).toEqual({});
    }),
  );

  it(
    "should be able to toggle",
    sfn(() => {
      Modals.attach(modalId, { default: false });
      const modal = Modals.read(modalId);

      expect(modal.isOpen()).toBe(false);
      modal.toggle();
      expect(modal.isOpen()).toBe(true);
      modal.toggle();
      expect(modal.isOpen()).toBe(false);
    }),
  );

  it(
    "should be able to create signals",
    sfn(async () => {
      const signal = Modals.signal(modalId);
      let count = 0;
      expect(count).toBe(0);

      Modals.attach(modalId, { default: false });

      createEffect(on(signal, () => ++count));

      await vi.waitFor(() => expect(count).toBe(1));

      Modals.detach(modalId);

      await vi.waitFor(() => expect(count).toBe(2));
    }),
  );

  it(
    "should react to some element being opened",
    sfn(async () => {
      Modals.attach(modalId, { default: false });
      const signal = Modals.signal(modalId);

      let count = 0;
      createEffect(on(Modals.isSomeOpen, () => ++count));

      await vi.waitFor(() => expect(count).toBe(0));

      signal().open();

      await vi.waitFor(() => expect(count).toBe(1));
    }),
  );
});
