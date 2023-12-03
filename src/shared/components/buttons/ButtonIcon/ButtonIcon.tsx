import type { IconName, IconSize } from "@components/buttons/Icon/Icon.js";
import { Icon } from "@components/buttons/Icon/Icon.js";
import { type JSX, mergeProps, splitProps } from "solid-js";
import cx from "clsx";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface ButtonIconProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  icon: IconName;
  iconsize?: IconSize;
  iconclass?: string;
  square?: boolean;
}

const classBySize = (size?: ButtonSize) => {
  switch (size) {
    case "xs":
      return "h-4 text-xs";
    case "sm":
      return "h-5 text-sm";
    case "md":
      return "h-6";
    case "lg":
      return "h-8 text-lg";
    case "xl":
      return "h-10 text-xl";
    case "2xl":
      return "h-12 text-2xl";
    case "3xl":
      return "h-14 text-3xl";
    default:
      return undefined;
  }
};
const classBySquare = (square?: boolean) => (square ? "aspect-square" : undefined);

const keys = ["iconsize", "iconclass", "icon", "size", "class", "children", "square"] as const;
const initial = { size: "md", iconsize: "xs" } as const;
export const ButtonIcon = (props: ButtonIconProps) => {
  const [managed, rest] = splitProps(mergeProps(initial, props), keys);

  return (
    <button
      class={cx(
        "center gap-2 rounded-full aspect-square hover:bg-slate-500 text-white transition-all hover:text-amber-100",
        classBySize(managed.size),
        classBySquare(managed.square),
        managed.class,
      )}
      {...rest}
    >
      <Icon name={managed.icon} class={managed.iconclass} size={managed.iconsize} />
      {managed.children}
    </button>
  );
};
