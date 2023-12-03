import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import cx from "clsx";
import s from "./Button.module.scss";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  square?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const classBySize = (size: ButtonProps["size"]) => {
  switch (size) {
    case "xs":
      return "h-6";
    case "sm":
      return "h-8";
    case "md":
      return "h-10";
    case "lg":
      return "h-12";
    case "xl":
      return "h-24";
    case "2xl":
      return "h-36";
    case "3xl":
      return "h-48";
    default:
      return "";
  }
};

const initial = { size: "md", type: "button" } as const;
export const Button = (props: ButtonProps) => {
  const $ = mergeProps(initial, props);

  return (
    <button {...$} class={cx(s.button, classBySize($.size), $.square && "aspect-square", $.class)}>
      {$.children}
    </button>
  );
};
