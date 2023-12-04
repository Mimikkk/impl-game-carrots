import "./styles.scss";
import { render } from "solid-js/web";
import { GameWorld } from "@modules/world/GameWorld.js";
import { GameInterface } from "@modules/interface/GameInterface.js";
import { DevelopmentTools } from "@modules/development/DevelopmentTools.js";
import { Modals } from "@logic/modals.js";

const Application = () => (
  <main inert={Modals.isSomeOpen()} class="w-screen h-screen bg-gray-700">
    <GameInterface />
    <GameWorld />
    <DevelopmentTools />
  </main>
);

render(Application, document.body);
