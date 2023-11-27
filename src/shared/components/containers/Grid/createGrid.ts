import { createRows } from "@components/containers/Grid/createRows.js";
import { createColumns } from "@components/containers/Grid/createColumns.js";
import type { VirtualItem } from "@tanstack/virtual-core";

export interface GridOptions {
  ref: () => HTMLElement;
  items: number;
  rows: number;
  columns: number;
  sizes: { width: number; height: number };
  gap: { x: number; y: number };
}

export const createGrid = (props: GridOptions) => {
  const rowCount = Math.ceil(props.items / props.columns);
  const height = ~~(props.rows * props.sizes.height + props.gap.y * (props.rows - 1));
  const width = ~~(props.columns * props.sizes.width + 16 + props.gap.x * (props.columns - 1));

  const rows = createRows(props.ref, rowCount, props.sizes.height + props.gap.y);
  const columns = createColumns(props.ref, props.columns, props.sizes.width + props.gap.x);

  const styles = {
    container: {
      overflow: "auto",
      height: `${height}px`,
      width: `${width}px`,
    },
    list: {
      position: "relative",
      height: `${rows.size - props.gap.y}px`,
      width: `${columns.size - props.gap.x}px`,
    },
    item: (row: VirtualItem<unknown>, column: VirtualItem<unknown>) =>
      ({
        position: "absolute",
        top: 0,
        width: `${column.size - props.gap.x}px`,
        height: `${row.size - props.gap.y}px`,
        transform: `translate(${column.start}px, ${row.start}px)`,
      } as const),
  } as const;
  return { height, width, rows, columns, styles };
};
