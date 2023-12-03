import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import cx from "clsx";

export interface NumberTextProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  children: number;
  bold?: boolean;
  precision?: number;
}

const intl = new Intl.NumberFormat("en-US", {
  notation: "engineering",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const initial = { precision: 3 } as const;
export const Number = (props: NumberTextProps) => {
  const $ = mergeProps(initial, props);

  return (
    <div title={`${$.children}`} {...$} class={cx($.bold ? "font-bold" : undefined, $.class)}>
      <span>{$.children > $.precision ? intl.format($.children) : $.children}</span>
    </div>
  );
};
