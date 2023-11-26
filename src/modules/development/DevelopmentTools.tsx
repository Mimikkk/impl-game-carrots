import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { createStorage } from "@logic/Storage/createStorage.js";
import { type TabItem, Tabulator } from "@components/containers/Tabulator/Tabulator.js";
import s from "./DevelopmentTools.module.scss";
import { AvailableIconsTab } from "@modules/development/Tabs/AvailableIcons.tab.js";

const tabs = [
  {
    id: "tab-1",
    name: "Available Icons",
    element: AvailableIconsTab,
    icon: "Add",
  },
] satisfies TabItem[];
export const DevelopmentTools = () => {
  const [activate, set] = createStorage("devtool-expanded", false);
  const toggle = () => set(!activate());

  return (
    <div class={s.tools}>
      <div class={s.container}>
        <div class={s.expand}>
          <ButtonIcon icon="Toolbox" square class={s.expander} onClick={toggle} />
        </div>
      </div>
      <div class={s.tabs} data-active={activate()}>
        <div class={s.tabulator}>
          <Tabulator id="devtool-tab" class="w-full gap-2" tabclass="text-white" tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
