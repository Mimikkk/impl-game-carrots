import * as Registry from "solid-icons/cg";
import type { Strip } from "@shared/types/strip.js";
import type { IconProps as SolidIconProps } from "solid-icons";

export type IconName = Strip<keyof typeof Registry, "Cg">;

export interface IconProps extends SolidIconProps {
  name: IconName;
}

export const Icon = (props: IconProps) => {
  const Element = Registry[`Cg${props.name}`];

  return <Element {...props} />;
};
