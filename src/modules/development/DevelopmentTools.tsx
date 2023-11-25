import { createSignal } from "solid-js";
import { ButtonIcon } from "@components/buttons/ButtonIcon/ButtonIcon.js";

const [height, setHeight] = createSignal(0);
export const DevelopmentTools = () => (
  <div class="fixed bottom-0 w-full bg-slate-950 z-10">
    <div class="relative">
      <div class="absolute bottom-[-2px] z-20 bg-slate-950 right-0 p-1 border-t-2 border-l-2 rounded-l rounded-b-none flex justify-center items-center">
        <ButtonIcon
          icon="Toolbox"
          square
          class="text-white hover:text-amber-100 hover:bg-slate-400 rounded-full cursor-pointer transition-all"
          onClick={() => {
            setHeight((height) => (height === 0 ? 200 : 0));
          }}
        />
      </div>
    </div>
    <div style={{ height: `${height()}px` }} class="transition-all">
      <div class="border-t-2 px-4 py-2 flex">
        <div class="flex gap-4">
          Tabs
          <div>Icons</div>
        </div>
      </div>
    </div>
  </div>
);
