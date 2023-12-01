import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import cx from "clsx";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const initial = { type: "button" } as const;
export const Button = (props: ButtonProps) => {
  props = mergeProps(initial, props);

  return (
    <button
      {...props}
      class={cx(
        "bg-slate-800 border-4 border-slate-500 flex items-center justify-center rounded-sm hover:border-slate-400 hover:bg-slate-700 active:border-slate-600 active:bg-slate-950",
        props.class,
      )}
    >
      {props.children}
    </button>
  );
};
