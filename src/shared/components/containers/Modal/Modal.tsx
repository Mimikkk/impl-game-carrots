import { Portal } from "solid-js/web";
import type { JSX } from "solid-js";
import { createSignal, mergeProps, on, onCleanup, onMount, Show } from "solid-js";
import cx from "clsx";
import s from "./Modal.module.scss";
import { Modals } from "@components/containers/Modal/modals.js";

export interface ModalProps {
  id: string;
  class?: string;
  children: JSX.Element;
  default?: boolean;
  onOpen?(): void;
  onClose?(): void;
}

const initial = { default: false } as const;
export const Modal = (iprops: ModalProps) => {
  const props = mergeProps(initial, iprops);
  const modal = Modals.signal(props.id);

  createSignal(on(modal, (modal) => (modal?.isOpen() ? props.onOpen?.() : props.onClose?.()), { defer: true }));

  onMount(() => Modals.attach(props.id, props));
  onCleanup(() => Modals.detach(props.id));

  return (
    <Show when={modal()?.isOpen()}>
      <Portal>
        <div class={s.modal}>
          <div onClick={() => modal()?.close()} class={s.background} />
          <div class={cx("absolute shadow-md shadow-slate-950", props.class)}>{props.children}</div>
        </div>
      </Portal>
    </Show>
  );
};
