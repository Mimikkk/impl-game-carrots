import { Icon, type IconName, IconRegistry } from "@components/buttons/Icon/Icon.js";
import { createEffect, createSignal } from "solid-js";
import { TextField } from "@components/forms/TextField/TextField.js";
import s from "./AvailableIcons.tab.module.scss";
import { Devtools } from "@modules/development/devtools.js";
import { Grid } from "@components/containers/Grid/Grid.js";
import { createQueryable } from "@utils/search.js";

const names = Object.keys(IconRegistry) as IconName[];

export const AvailableIconsTab = () => {
  const { query, queried, setQuery } = createQueryable(names, { threshold: 0.4, isCaseSensitive: true });
  const [tooltip, setTooltip] = createSignal<string | null>(null);

  let ref: HTMLInputElement | undefined = undefined;
  createEffect(() => {
    if (!ref || !Devtools.active()) return;
    setQuery("");
    ref.focus();
  });

  return (
    <div class={s.tab}>
      <TextField ref={ref} class={s.search} label="search..." value={query()} onChange={setQuery} />
      <div class="h-6">{tooltip()}</div>
      <Grid
        itemprops={(name) => ({
          onClick: () => navigator.clipboard.writeText(name),
          onPointerEnter: () => setTooltip(name),
        })}
        itemclass={s.container}
        items={queried()}
        rows={6}
        columns={8}
        sizes={{ width: 64, height: 64 }}
        gap={4}
      >
        {(name) => <Icon class="w-full" name={name} onPointerEnter={() => setTooltip(name)} />}
      </Grid>
    </div>
  );
};
