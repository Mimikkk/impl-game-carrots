import type { IconName } from "@components/buttons/Icon/Icon.js";
import { For, type JSXElement, mergeProps } from "solid-js";
import { createSearchString } from "@logic/Search/createSearchString.js";
import { createStorage } from "@logic/Storage/createStorage.js";
import cx from "clsx";
import s from "./Tabulator.module.scss";

export interface TabItem {
  icon?: IconName;
  id: string;
  name: string;
  element: () => JSXElement;
  class?: string;
}

export interface TabulatorProps {
  id: string;
  tabs: TabItem[];
  tabclass?: string;
  navclass?: string;
  class?: string;
  default?: string;
  param?: boolean;
}

export const Tabulator = (props: TabulatorProps) => {
  const $ = mergeProps({ default: props.tabs[0].id }, props);

  const [selected, select] = $.param ? createSearchString($.id, $.default) : createStorage($.id, $.default);

  return (
    <div class={cx(s.tabulator, $.class)}>
      <div class={cx(s.nav, $.navclass)}>
        <For each={$.tabs}>
          {(tab) => (
            <div onClick={() => select(tab.id)} class={cx(s.navtab, $.tabclass, selected() === tab.id && s.selected)}>
              <div class={cx(s.text, selected() === tab.id && s.selected)}>{tab.name}</div>
            </div>
          )}
        </For>
      </div>
      {$.tabs.find((tab) => tab.id === selected())?.element()}
    </div>
  );
};
