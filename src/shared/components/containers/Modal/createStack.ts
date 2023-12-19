import { type Accessor, createMemo, createSignal } from "solid-js";
import { Modal as IModal } from "@logic/modals.js";

export const createStack = () => {
  const [value, set] = createSignal<Accessor<IModal>[]>([]);
  const stack = value as unknown as Accessor<Accessor<IModal>[]> & {
    pop<T extends {}>(): IModal<T>;
    push(modal: Accessor<IModal>): void;
    top<T extends {}>(): IModal<T>;
  };

  stack.pop = (): IModal => {
    const modals = value();
    const modal = modals.pop()!;

    set([...modals]);

    return modal();
  };
  stack.push = (modal: Accessor<IModal>) => set((modals) => [...modals, modal]);
  stack.top = createMemo(() => value().at(-1)?.() ?? IModal.empty);

  return stack;
};
