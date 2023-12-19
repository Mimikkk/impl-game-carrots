import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import cx from "clsx";

export interface NumberProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  children: number;
  bold?: boolean;
  precision?: number;
}

const format = new Intl.NumberFormat("en-US", {
  notation: "engineering",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

const initial = { precision: 10e4 } as const;
export const Number = (props: NumberProps) => {
  const $ = mergeProps(initial, props);

  return (
    <div title={`${$.children}`} {...$} class={cx($.bold ? "font-bold" : undefined, $.class)}>
      <span>{$.children > $.precision ? format($.children) : $.children}</span>
    </div>
  );
};
