import { Icon, type IconName, IconRegistry } from "@components/buttons/Icon/Icon.js";
import { createEffect, createMemo, createSignal } from "solid-js";
import { TextField } from "@components/forms/TextField/TextField.js";
import { cacheBy } from "@utils/cacheBy.js";
import s from "./AvailableIcons.tab.module.scss";
import { Devtools } from "@modules/development/devtools.js";
import { Grid } from "@components/containers/Grid/Grid.js";

const names = Object.keys(IconRegistry) as IconName[];

const filtered = cacheBy(
  (value: string) => names.filter((name) => name.toLowerCase().includes(value)),
  (value) => value,
);
const gridParams = { rows: 4, columns: 8, sizes: { width: 64, height: 64 }, gap: { x: 4, y: 8 } };
export const AvailableIconsTab = () => {
  const [query, setQuery] = createSignal("");
  const queried = createMemo(() => filtered(query().replace(/ +/g, "").toLowerCase()));

  let ref: HTMLInputElement | undefined = undefined;
  createEffect(() => {
    if (!ref || !Devtools.active()) return;
    setQuery("");
    ref.focus();
  });

  return (
    <div class={s.tab}>
      <TextField ref={ref} class={s.search} label="search..." value={query()} onChange={setQuery} />
      <Grid itemclass={s.container} items={names} {...gridParams}>
        {(name) => <Icon class={s.icon} name={name} />}
      </Grid>
      <span class="self-start">
        <span>Total:</span> <span class="text-amber-300">{queried().length}</span>
      </span>
    </div>
  );
};
