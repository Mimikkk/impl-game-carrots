import { createMemo } from "solid-js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { createStorage } from "@logic/Storage/createStorage.js";
import { Tabulator } from "@components/containers/Tabulator/Tabulator.js";
import s from "./DevelopmentTools.module.scss";

export const DevelopmentTools = () => {
  const [expanded, expand] = createStorage("devtool-expanded", false);
  const height = createMemo(() => (expanded() ? 200 : 0));

  return (
    <div class={s.tools}>
      <div class={s.container}>
        <div class={s.expand}>
          <ButtonIcon icon="Toolbox" square class={s.expander} onClick={() => expand(!expanded())} />
        </div>
      </div>
      <div style={{ height: `${height()}px` }} class={s.tabs}>
        <div class={s.tabulator}>
          <Tabulator
            id="devtool-tab"
            class="w-full gap-2"
            tabclass="text-white"
            tabs={[
              {
                id: "tab-1",
                name: "nazwa1",
                element: () => <div class="bg-amber-200 text-white">test</div>,
                icon: "Add",
              },
              {
                id: "tab-2",
                name: "nazwa2",
                element: () => <div class="bg-amber-200 text-white">test</div>,
                icon: "AddR",
              },
              {
                id: "tab-3",
                name: "nazwa3",
                element: () => <div class="bg-amber-200 text-white">test</div>,
                icon: "Add",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
