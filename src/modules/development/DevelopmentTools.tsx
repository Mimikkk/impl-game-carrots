import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";
import { type TabItem, Tabulator } from "@components/containers/Tabulator/Tabulator.js";
import s from "./DevelopmentTools.module.scss";
import { AvailableIconsTab } from "@modules/development/Tabs/AvailableIcons.tab.js";
import { Devtools } from "@modules/development/devtools.js";

const tabs = [
  {
    id: "tab-1",
    name: "Available Icons",
    element: AvailableIconsTab,
    icon: "CgAdd",
  },
] satisfies TabItem[];

const { toggle, active, createKeyboardShortcut } = Devtools;
export const DevelopmentTools = () => {
  createKeyboardShortcut();

  return (
    <div class={s.tools}>
      <div class={s.container}>
        <div class={s.expand}>
          <ButtonIcon icon="CgToolbox" variant="text" class={s.expander} onClick={toggle} />
        </div>
      </div>
      <div class={s.tabs} data-active={active()}>
        <div class={s.tabulator}>
          <Tabulator id="devtool-tab" class="w-full gap-2" tabclass="text-white" tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
