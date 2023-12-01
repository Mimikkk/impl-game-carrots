import { Portal } from "solid-js/web";
import type { JSX } from "solid-js";
import { createEffect, mergeProps, on, onCleanup, onMount, Show } from "solid-js";
import cx from "clsx";
import s from "./Modal.module.scss";
import { Modals } from "@logic/modals.js";
import { Defer } from "@utils/constants.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";

export interface ModalProps {
  id: string;
  class?: string;
  children: JSX.Element;
  default?: boolean;
  onOpen?(): void;
  onClose?(): void;
  size?: "md";
  title?: string;
}

const initial = { default: false } as const;
export const Modal = (iprops: ModalProps) => {
  const props = mergeProps(initial, iprops);
  const modal = Modals.signal(props.id);

  createEffect(
    on(
      modal,
      (modal) => createEffect(on(modal.isOpen, (open) => (open ? props.onOpen?.() : props.onClose?.()), Defer)),
      Defer,
    ),
  );

  onMount(() => Modals.attach(props.id, props));
  onCleanup(() => Modals.detach(props.id));

  const Content = () => {
    onMount(Modals.update);
    onCleanup(Modals.update);

    return (
      <div inert={false} role="dialog" aria-modal="true" class={cx(s.modal, s[props.size!])}>
        <div onClick={() => modal()?.close()} class={s.background} />
        <div class={cx("absolute shadow-md shadow-slate-950 min-w-[300px] w-full max-w-[600px]", props.class)}>
          <div class="h-full flex flex-col gap-1 bg-slate-950 border-t-4 border-2 transition-all rounded-t-md rounded-b-sm border-slate-300 hover:border-amber-200 focus-within:border-amber-200">
            <div class="flex bg-gradient-to-b from-slate-800 to-slate-950 justify-between pt-1 pb-0.5 px-2 gap-2">
              <span class="font-bold text-slate-200">{props.title}</span>
              <ButtonIcon icon="OcX" class="text-slate-200" onClick={() => modal().close()} />
            </div>
            <div class="px-2">
              <div class="text-white">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Show when={modal()?.isOpen()}>
      <Portal>
        <Content />
      </Portal>
    </Show>
  );
};
