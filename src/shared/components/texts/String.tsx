import { type JSX, mergeProps } from "solid-js";

export interface StringProps {
  class?: string;
  title?: string;
  children: JSX.Element;
}

export const String = (props: StringProps) => {
  const $ = mergeProps(
    { title: props.title ?? typeof props.children === "string" ? (props.children as string) : undefined },
    props,
  );

  return (
    <span title={$.title} class={$.class}>
      {$.children}
    </span>
  );
};
