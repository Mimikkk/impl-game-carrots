import { render } from "solid-js/web";
import "./styles.scss";
import { GameWorld } from "@modules/world/GameWorld.js";
import { GameInterface } from "@modules/interface/GameInterface.js";
import { DevelopmentTools } from "@modules/development/DevelopmentTools.js";

export const Application = () => (
  <main class="w-auto h-auto bg-amber-200">
    <GameInterface />
    <GameWorld />
    <DevelopmentTools />
  </main>
);

render(Application, document.body);
