import { createEffect, createSignal, Show } from "solid-js";
import cx from "clsx";
import s from "./TextField.module.scss";

type ChangeEvent = Event & { currentTarget?: HTMLInputElement; target?: HTMLInputElement };
export interface TextFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent) => void;
  class?: string;
}

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const TextField = (props: TextFieldProps) => {
  const [value, setValue] = createSignal(props.value ?? "");

  createEffect(() => {
    if (props.value === value()) return;
    setValue(props.value ?? "");
  });

  return (
    <div class={cx(s.field, props.class)}>
      <Show when={props.label}>
        <span class={s.label}>{upperFirst(props.label!)}</span>
      </Show>
      <input
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
