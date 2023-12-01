import type { JSX } from "solid-js";
import { For, mergeProps } from "solid-js";
import cx from "clsx";
import { createGrid } from "@components/containers/Grid/createGrid.js";

export interface GridProps<T> {
  class?: string;
  itemclass?: string;
  rows: number;
  columns?: number;
  items: T[];
  sizes: { width: number; height: number };
  gap?: { x: number; y: number } | number;
  children(item: T, index: number, row: number, column: number): JSX.Element;
  itemprops?: (item: T, index: number, row: number, column: number) => JSX.HTMLAttributes<HTMLDivElement>;
}

export const Grid = <T,>(iprops: GridProps<T>) => {
  const props = mergeProps({ columns: 1 }, iprops, {
    gap: {
      x: typeof iprops.gap === "number" ? iprops.gap : iprops.gap?.x ?? 0,
      y: typeof iprops.gap === "number" ? iprops.gap : iprops.gap?.y ?? 0,
    },
  });

  let ref: HTMLDivElement = undefined!;
  const grid = createGrid(mergeProps({ ref: () => ref }, props));

  return (
    <div class={props.class}>
      <div ref={ref} style={grid().styles.container}>
        <div style={grid().styles.list}>
          <For each={grid().rows.items}>
            {(row) => (
              <For each={grid().columns.items}>
                {(column) => {
                  let index = row.index * props.columns + column.index;
                  const item = props.items[index];
                  if (!item) return null;

                  return (
                    <div
                      class={cx("overflow-hidden", props.itemclass)}
                      style={grid().styles.item(row, column)}
                      {...iprops.itemprops?.(item, index, row.index, column.index)}
                    >
                      {props.children(item, index, row.index, column.index)}
                    </div>
                  );
                }}
              </For>
            )}
          </For>
        </div>
      </div>
      <span>
        Total: <span class="text-amber-300">{props.items.length}</span>
      </span>
    </div>
  );
};
