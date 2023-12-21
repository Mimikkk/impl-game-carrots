import { type Accessor, createMemo, createSignal, on } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { Defer } from "@utils/constants.js";

export interface Modal<State extends {} = any> {
  parent: Accessor<HTMLElement>;
  state: State;
  setState(state: State): void;
  isOpen(): boolean;
  setOpen(open: boolean): void;
  open(options?: OpenOptions<State> | MouseEvent): void;
  toggle(open?: any): void;
  close(): void;
}
interface OpenOptions<State> {
  event?: MouseEvent;
  with?: State;
}

export namespace Modal {
  export interface CreateProps {
    default: boolean;
  }

  export const create = (props: CreateProps): Modal => {
    const [isOpen, setOpen] = createSignal(props.default);
    const [state, setState] = createStore({});
    const [parent, setParent] = createSignal<HTMLElement>(undefined!);

    return {
      parent,
      state,
      setState,
      isOpen,
      setOpen,
      toggle(value) {
        if (typeof value === "boolean") setOpen(value);
        else setOpen((open) => !open);
      },
      open(state) {
        if (state instanceof MouseEvent) {
          setParent(state.currentTarget as HTMLElement);
        } else {
          if (state?.with) setState(state.with);
          if (state?.event) setParent(state.event.currentTarget as HTMLElement);
        }
        setOpen(true);
      },
      close() {
        setState(reconcile({}));
        setParent(undefined!);
        return setOpen(false);
      },
    };
  };

  export const empty: Modal = {
    parent: () => undefined!,
    isOpen: () => false,
    toggle() {},
    close() {},
    open() {},
    setOpen() {},
    setState() {},
    state: {},
  };
}

export namespace Modals {
  export const [store, setStore] = createStore<Record<string, Modal>>({});
  /** Vite bug - check regularly */
  let _;

  export const read = <State extends {}>(id: string): Modal<State> => store[id] ?? Modal.empty;
  export const signal = <State extends {}>(id: string): Accessor<Modal<State>> => createMemo(() => read<State>(id));

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
    on(shouldUpdate, () => Object.values(store).some((modal) => modal.isOpen()), Defer),
  );
}
