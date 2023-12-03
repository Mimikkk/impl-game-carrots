import * as CgRegistry from "solid-icons/cg";
import * as BsRegistry from "solid-icons/bs";
import * as BiRegistry from "solid-icons/bi";
import * as AiRegistry from "solid-icons/ai";
import * as FiRegistry from "solid-icons/fi";
import * as FaRegistry from "solid-icons/fa";
import * as HiRegistry from "solid-icons/hi";
import * as ImRegistry from "solid-icons/im";
import * as IoRegistry from "solid-icons/io";
import * as OcRegistry from "solid-icons/oc";
import * as RiRegistry from "solid-icons/ri";
import * as SiRegistry from "solid-icons/si";
import * as TbRegistry from "solid-icons/tb";
import * as TiRegistry from "solid-icons/ti";
import * as VsRegistry from "solid-icons/vs";
import * as WiRegistry from "solid-icons/wi";
import type { IconProps as SolidIconProps } from "solid-icons";
import cx from "clsx";
import { mergeProps, splitProps } from "solid-js";

export type IconName =
  | keyof typeof CgRegistry
  | keyof typeof BsRegistry
  | keyof typeof BiRegistry
  | keyof typeof AiRegistry
  | keyof typeof FiRegistry
  | keyof typeof FaRegistry
  | keyof typeof HiRegistry
  | keyof typeof ImRegistry
  | keyof typeof IoRegistry
  | keyof typeof OcRegistry
  | keyof typeof RiRegistry
  | keyof typeof SiRegistry
  | keyof typeof TbRegistry
  | keyof typeof TiRegistry
  | keyof typeof VsRegistry
  | keyof typeof WiRegistry;
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export const IconRegistry = Object.assign(
  {},
  CgRegistry,
  BsRegistry,
  BiRegistry,
  AiRegistry,
  FiRegistry,
  FaRegistry,
  HiRegistry,
  ImRegistry,
  IoRegistry,
  OcRegistry,
  RiRegistry,
  SiRegistry,
  TbRegistry,
  TiRegistry,
  VsRegistry,
  WiRegistry,
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
  const [$, rest] = splitProps(mergeProps(initial, props), ["size", "class"]);
  const Element = IconRegistry[props.name];

  return <Element class={cx(classBySize($.size), $.class)} {...rest} />;
};
