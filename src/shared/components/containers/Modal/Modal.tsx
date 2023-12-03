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
export const Modal = (props: ModalProps) => {
  const $ = mergeProps(initial, props);
  const modal = Modals.signal($.id);

  onMount(() => Modals.attach($.id, $));
  onCleanup(() => Modals.detach($.id));

  const Content = () => {
    onMount(() => {
      $.onOpen?.();
      Modals.update();

      createListener("keydown", ({ key }) => key === "Escape" && modal().close());
    });
    onCleanup(() => {
      $.onClose?.();
      Modals.update();
      modal().parent()?.focus();
    });

    return (
      <div inert={false} role="dialog" aria-modal="true" class={cx(s.modal, s[$.size!])}>
        <div onClick={() => modal()?.close()} class={s.background} />
        <div class={cx(s.container, $.class)}>
          <div class={s.card}>
            <div class={s.header}>
              <span class="font-bold text-slate-200">{$.title}</span>
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
              <div class="text-white">{$.children}</div>
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
