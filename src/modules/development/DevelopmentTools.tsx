import { createSignal, For, type JSXElement } from "solid-js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import type { IconName } from "@components/buttons/Icon/Icon.js";

export interface TabItem {
  icon?: IconName;
  id?: string;
  name: string;
  element: () => JSXElement;
}

export interface TabProps {
  tabs: TabItem[];
  default?: string;
  param?: string;
}

export const Tabulator = (props: TabProps) => {
  const tabIndex = props.default ? props.tabs.findIndex((tab) => (tab.id || tab.name) === props.default) : -1;
  const [selected, select] = createSignal(tabIndex === -1 ? 0 : tabIndex);

  if (props.param) {
  }

  return (
    <div class="flex gap-2">
      <For each={props.tabs}>
        {(tab, index) => {
          return (
            <div onClick={() => select(index)} class={selected() === index() ? "border" : ""}>
              <div>{tab.name}</div>
              <ButtonIcon icon="Tab" square />
            </div>
          );
        }}
      </For>
    </div>
  );
};

const [height, setHeight] = createSignal(0);
export const DevelopmentTools = () => (
  <div class="fixed bottom-0 w-full bg-slate-950 z-10">
    <div class="relative">
      <div class="absolute bottom-[-2px] z-20 bg-slate-950 right-0 p-1 border-t-2 border-l-2 rounded-l flex justify-center items-center">
        <ButtonIcon
          icon="Toolbox"
          square
          class="text-white hover:text-amber-100 hover:bg-slate-400 rounded-full transition-all"
          onClick={() => setHeight((height) => (height ? 0 : 200))}
        />
      </div>
    </div>
    <div style={{ height: `${height()}px` }} class="transition-all">
      <div class="border-t-2 px-4 py-2 flex">
        <Tabulator
          default="tab-1"
          param="tab"
          tabs={[
            {
              id: "tab-1",
              name: "nazwa1",
              element: () => <div>test</div>,
              icon: "Add",
            },
            {
              id: "tab-2",
              name: "nazwa2",
              element: () => <div>test</div>,
              icon: "AddR",
            },
            {
              id: "tab-3",
              name: "nazwa3",
              element: () => <div>test</div>,
              icon: "Add",
            },
          ]}
        />
      </div>
    </div>
  </div>
);
