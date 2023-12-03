import { TopLeft } from "./sections/TopLeft.js";
import { BottomLeft } from "./sections/BottomLeft.js";
import { TopRight } from "./sections/TopRight.js";
import { BottomRight } from "./sections/BottomRight.js";

export const GameInterface = () => (
  <div class="fixed full">
    <TopLeft class="atl-4" />
    <BottomLeft class="abl-4" />
    <TopRight class="atr-4" />
    <BottomRight class="abr-4" />
  </div>
);
