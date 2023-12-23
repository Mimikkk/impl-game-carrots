import { TopLeft } from "./sections/TopLeft.js";
import { BottomLeft } from "./sections/BottomLeft.js";
import { TopRight } from "./sections/TopRight/TopRight.js";
import { BottomRight } from "./sections/BottomRight.js";
import { Modal } from "@components/containers/Modal/Modal.js";
import { MainMenu } from "@modules/management/mainmenu.logic.js";
import type { JSX } from "solid-js";
import { Button } from "@components/buttons/Button/Button.js";

const Menu = (props: { children: JSX.Element }) => {
  return <div class="flex flex-col gap-2">{props.children}</div>;
};

const MenuItem = (props: { children: JSX.Element }) => <Button>{props.children}</Button>;
Menu.Item = MenuItem;

const MenuModal = () => (
  <Modal
    title="Menu główne"
    controlless
    id={MainMenu.Id}
    default={MainMenu.openOnStartup()}
    onChange={MainMenu.setOpenOnStartup}
  >
    <Menu>
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
      <Menu.Item>3</Menu.Item>
    </Menu>
  </Modal>
);

export const GameInterface = () => (
  <div class="fixed full">
    <MenuModal />
    <TopLeft class="atl-4" />
    <BottomLeft class="abl-4" />
    <TopRight class="atr-4" />
    <BottomRight class="abr-4" />
  </div>
);
