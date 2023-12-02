import { Portal } from "solid-js/web";
import type { JSX } from "solid-js";
import { mergeProps, onCleanup, onMount, Show } from "solid-js";
import cx from "clsx";
import s from "./Modal.module.scss";
import { Modals } from "@logic/modals.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { createListener } from "@logic/createListener.js";

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

  onMount(() => Modals.attach(props.id, props));
  onCleanup(() => Modals.detach(props.id));

  const Content = () => {
    onMount(() => {
      props.onOpen?.();
      Modals.update();

      createListener("keydown", ({ key }) => key === "Escape" && modal().close());
    });
    onCleanup(() => {
      props.onClose?.();
      Modals.update();
      modal().parent()?.focus();
    });

    return (
      <div inert={false} role="dialog" aria-modal="true" class={cx(s.modal, s[props.size!])}>
        <div onClick={() => modal()?.close()} class={s.background} />
        <div class={cx(s.container, props.class)}>
          <div class={s.card}>
            <div class={s.header}>
              <span class="font-bold text-slate-200">{props.title}</span>
              <ButtonIcon
                icon="OcX"
                class="text-slate-200"
                onClick={() => {
                  modal().close();
                  modal().parent()?.focus();
                }}
              />
            </div>
            <div class={s.content}>
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
