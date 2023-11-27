import * as CgRegistry from "solid-icons/cg";
import type { IconProps as SolidIconProps } from "solid-icons";
import cx from "clsx";
import { mergeProps, splitProps } from "solid-js";

export type IconName = keyof typeof CgRegistry;
// | keyof typeof BsRegistry
// | keyof typeof BiRegistry
// | keyof typeof AiRegistry
// | keyof typeof FiRegistry
// | keyof typeof FaRegistry
// | keyof typeof HiRegistry
// | keyof typeof ImRegistry
// | keyof typeof IoRegistry
// | keyof typeof OcRegistry
// | keyof typeof RiRegistry
// | keyof typeof SiRegistry
// | keyof typeof TbRegistry
// | keyof typeof TiRegistry
// | keyof typeof VsRegistry
// | keyof typeof WiRegistry;
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export const IconRegistry = Object.assign(
  {},
  CgRegistry,
  // BsRegistry,
  // BiRegistry,
  // AiRegistry,
  // FiRegistry,
  // FaRegistry,
  // HiRegistry,
  // ImRegistry,
  // IoRegistry,
  // OcRegistry,
  // RiRegistry,
  // SiRegistry,
  // TbRegistry,
  // TiRegistry,
  // VsRegistry,
  // WiRegistry,
);

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
  const Element = IconRegistry[props.name];

  return <Element class={cx(classBySize(icon.size), icon.class)} {...rest} />;
};
