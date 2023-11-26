import * as Registry from "solid-icons/cg";
import type { Strip } from "@utils/strip.js";
import type { IconProps as SolidIconProps } from "solid-icons";
import cx from "clsx";
import { mergeProps, splitProps } from "solid-js";

export const IconRegistry = Registry;
export type IconName = Strip<keyof typeof Registry, "Cg">;
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface IconProps extends SolidIconProps {
  name: IconName;
  size?: IconSize;
}

const classBySize = (size?: IconSize) => {
  switch (size) {
    case "xs":
      return "w-4 h-4";
    case "sm":
      return "w-5 h-5";
    case "md":
      return "w-6 h-6";
    case "lg":
      return "w-8 h-8";
    case "xl":
      return "w-10 h-10";
    case "2xl":
      return "w-12 h-12";
    case "3xl":
      return "w-14 h-14";
    default:
      return undefined;
  }
};

const initial = { size: "md" } as const;
export const Icon = (props: IconProps) => {
  const [icon, rest] = splitProps(mergeProps(initial, props), ["size", "class"]);
  const Element = Registry[`Cg${props.name}`];

  return <Element class={cx(classBySize(icon.size), icon.class)} {...rest} />;
};
