import { type Accessor, createMemo, createSignal, on } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { Defer } from "@utils/constants.js";

export interface Modal<State extends {} = any> {
  state: State;
  setState(state: State): void;
  isOpen(): boolean;
  setOpen(open: boolean): void;
  open(with_?: State): void;
  toggle(open?: any): void;
  close(): void;
}

export namespace Modal {
  export interface CreateProps {
    default: boolean;
  }
  export const create = (props: CreateProps): Modal => {
    const [isOpen, setOpen] = createSignal(props.default);
    const [state, setState] = createStore({});

    return {
      state,
      setState,
      isOpen,
      setOpen,
      toggle(value) {
        if (typeof value === "boolean") setOpen(value);
        else setOpen((open) => !open);
      },
      open(state) {
        if (state) setState(state);
        setOpen(true);
      },
      close: () => {
        setState(reconcile({}));
        return setOpen(false);
      },
    };
  };
}

export namespace Modals {
  export const [store, setStore] = createStore<Record<string, Modal>>({});

  export const read = <State extends {}>(id: string): Modal<State> | undefined => store[id];
  export const signal = <State extends {}>(id: string): Accessor<Modal<State>> => createMemo(() => store[id]);

  export interface AttachProps {
    default: boolean;
  }
  export const attach = (id: string, props: AttachProps) => {
    if (id in store) throw Error(`Modal with id '${id}' already exists`);

    setStore(id, Modal.create(props));
  };

  export const detach = (id: string) => {
    let modal = store[id];
    if (!modal) throw Error(`Modal with id '${id}' does not exist`);

    modal.setOpen(false);
    setStore(id, undefined!);
  };

  const [shouldUpdate, setUpdate] = createSignal(false);
  export const update = () => setUpdate((value) => !value);

  export const isSomeOpen = createMemo(
    on(shouldUpdate, () => Object.values(Modals.store).some((modal) => modal.isOpen()), Defer),
  );
}
