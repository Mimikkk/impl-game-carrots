import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import cx from "clsx";
import s from "./Button.module.scss";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const initial = { type: "button" } as const;
export const Button = (props: ButtonProps) => {
  props = mergeProps(initial, props);

  return (
    <button {...props} class={cx(s.button, props.class)}>
      {props.children}
    </button>
  );
};
