import { Icon, type IconName, IconRegistry } from "@components/buttons/Icon/Icon.js";
import { createEffect, createMemo, createSignal } from "solid-js";
import { TextField } from "@components/forms/TextField/TextField.js";
import s from "./AvailableIcons.tab.module.scss";
import { Devtools } from "@modules/development/devtools.js";
import { Grid } from "@components/containers/Grid/Grid.js";

const names = Object.keys(IconRegistry) as IconName[];

const filtered = (value: string) => names.filter((name) => name.toLowerCase().includes(value));
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
      <Grid itemclass={s.container} items={queried()} rows={4} columns={8} sizes={{ width: 64, height: 64 }} gap={4}>
        {(name) => <Icon class={s.icon} name={name} />}
      </Grid>
    </div>
  );
};
