import { type JSX, mergeProps, Show } from "solid-js";
import cx from "clsx";

export interface LabelProps {
  label: JSX.Element;
  class?: string;
  labelclass?: string;
  children: JSX.Element;
  position?: "left" | "right";
}

const initial = { position: "left" };
export const LabelText = (props: LabelProps) => {
  const $ = mergeProps(initial, props);

  const item = (
    <span
      class={cx($.labelclass, "text-amber-200 flex items-center justify-between transition-all w-0 overflow-hidden")}
    >
      {$.label}
    </span>
  );

  return (
    <div class={cx($.class, "group transition-all")}>
      <Show when={$.position === "left"}>{item}</Show>
      {$.children}
      <Show when={$.position === "right"}>{item}</Show>
    </div>
  );
};
