import { createEffect, createSignal, createUniqueId, type Ref, Show } from "solid-js";
import cx from "clsx";
import s from "./TextField.module.scss";

type ChangeEvent = Event & { currentTarget?: HTMLInputElement; target?: HTMLInputElement };
export interface TextFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent) => void;
  class?: string;
  ref?: Ref<HTMLInputElement>;
}

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const TextField = (props: TextFieldProps) => {
  const id = createUniqueId();
  const [value, setValue] = createSignal(props.value ?? "");

  createEffect(() => {
    if (props.value === value()) return;
    setValue(props.value ?? "");
  });

  return (
    <div class={cx(s.field, props.class)}>
      <Show when={props.label}>
        <label for={id} class={s.label}>
          {upperFirst(props.label!)}
        </label>
      </Show>
      <input
        id={id}
        ref={props.ref}
        class={s.input}
        placeholder=" "
        value={value()}
        onInput={(event) => {
          const { value } = event.currentTarget;

          setValue(value);
          props.onChange?.(value, event);
        }}
      />
    </div>
  );
};
