import { Portal } from "solid-js/web";
import { type JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import cx from "clsx";
import s from "./Modal.module.scss";
import { Modals } from "@logic/modals.js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { createListener } from "@logic/createListener.js";
import { createStack } from "@components/containers/Modal/createStack.js";

export interface ModalProps {
  id: string;
  class?: string;
  children: JSX.Element;
  default?: boolean;
  size?: "sm" | "md" | "lg";
  title?: string;
  controlless?: boolean;

  onChange?(open: boolean): void;
}

const stack = createStack();
const initial = { default: false, controlless: false, size: "md" } satisfies Partial<ModalProps>;
export const Modal = (props: ModalProps) => {
  const $ = mergeProps(initial, props);
  const modal = Modals.signal($.id);

  onMount(() => Modals.attach($.id, $));
  onCleanup(() => Modals.detach($.id));

  const Content = () => {
    onMount(() => {
      $.onChange?.(true);
      Modals.update();

      stack.push(modal);
      if ($.controlless || stack().length > 1) return;
      createListener("keydown", ({ key }) => key === "Escape" && stack.top().close());
    });

    const close = () => {
      $.onChange?.(false);
      modal().close();
      Modals.update();

      stack.pop()!.parent()?.focus();
    };

    return (
      <div inert={stack.top() !== modal()} role="dialog" aria-modal class={cx(s.modal, s[`size-${$.size}`])}>
        <div onClick={$.controlless ? undefined : close} class={s.background} />
        <div class={cx(s.container, $.class)}>
          <div class={s.card}>
            <div class={s.header}>
              <span class="font-bold text-slate-200">{$.title}</span>
              <Show when={!$.controlless}>
                <ButtonIcon icon="OcX" variant="text" onClick={close} />
              </Show>
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
