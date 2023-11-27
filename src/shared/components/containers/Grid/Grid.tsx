import type { JSX } from "solid-js";
import { For, mergeProps } from "solid-js";
import { createRows } from "@components/containers/Grid/createRows.js";
import { createColumns } from "@components/containers/Grid/createColumns.js";
import cx from "clsx";
import type { VirtualItem } from "@tanstack/virtual-core";
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
}

const initial = { columns: 1 } as const;
export const Grid = <T,>(props: GridProps<T>) => {
  const merged = mergeProps(initial, props);
  const gap = {
    x: typeof merged.gap === "number" ? merged.gap : merged.gap?.x ?? 0,
    y: typeof merged.gap === "number" ? merged.gap : merged.gap?.y ?? 0,
  };

  let ref: HTMLDivElement = undefined!;
  const grid = createGrid({
    ref: () => ref,
    items: merged.items.length,
    rows: merged.rows,
    columns: merged.columns,
    sizes: merged.sizes,
    gap,
  });

  return (
    <div class={merged.class}>
      <div ref={ref} style={grid.styles.container}>
        <div style={grid.styles.list}>
          <For each={grid.rows.items}>
            {(row) => (
              <For each={grid.columns.items}>
                {(column) => {
                  let index = row.index * merged.columns + column.index;

                  return (
                    <div class={cx("overflow-hidden", merged.itemclass)} style={grid.styles.item(row, column)}>
                      {props.children(merged.items[index], index, row.index, column.index)}
                    </div>
                  );
                }}
              </For>
            )}
          </For>
        </div>
      </div>
      <span>
        Total: <span class="text-amber-300">{merged.items.length}</span>
      </span>
    </div>
  );
};
