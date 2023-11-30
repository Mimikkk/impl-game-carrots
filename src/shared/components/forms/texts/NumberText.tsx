import type { JSX } from "solid-js";
import cx from "clsx";

export interface NumberTextProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  children: number;
  bold?: boolean;
}

const intl = new Intl.NumberFormat("en-US", {
  notation: "engineering",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export const Number = (props: NumberTextProps) => (
  <div {...props} class={cx(props.bold ? "font-bold" : undefined, props.class)}>
    <span>{props.children > 1e10 ? intl.format(props.children) : props.children}</span>
  </div>
);
