import { Icon, type IconName, IconRegistry } from "@components/buttons/Icon/Icon.js";
import { createMemo, createSignal, For } from "solid-js";
import { TextField } from "@components/forms/TextField/TextField.js";
import { cacheBy } from "@utils/cacheBy.js";
import s from "./AvailableIcons.tab.module.scss";

const names = Object.keys(IconRegistry).map((name) => name.replace("Cg", "") as IconName);

const filtered = cacheBy(
  (value: string) => names.filter((name) => name.toLowerCase().includes(value)),
  (value) => value,
);

export const AvailableIconsTab = () => {
  const [query, setQuery] = createSignal("");
  const queried = createMemo(() => filtered(query().replace(/ +/g, "").toLowerCase()));

  return (
    <div class={s.tab}>
      <TextField class={s.search} label="search..." value={query()} onChange={setQuery} />
      <div class={s.icons}>
        <For each={queried()}>
          {(name) => (
            <div class={s.icon}>
              <Icon name={name} size="lg" />
              <span class={s.label}>{name}</span>
            </div>
          )}
        </For>
      </div>
      <span class="self-start">
        <span>Total:</span> <span class="text-amber-300">{queried().length}</span>
      </span>
    </div>
  );
};
