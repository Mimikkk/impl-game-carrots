import { TopLeft } from "./sections/TopLeft.js";
import { BottomLeft } from "./sections/BottomLeft.js";
import { TopRight } from "./sections/TopRight.js";
import { BottomRight } from "./sections/BottomRight.js";

export const GameInterface = () => (
  <div class="fixed w-full h-full">
    <TopLeft class="absolute left-4 top-4" />
    <BottomLeft class="absolute left-4 bottom-4" />
    <TopRight class="absolute top-4 right-4" />
    <BottomRight class="absolute bottom-4 right-4" />
  </div>
);
