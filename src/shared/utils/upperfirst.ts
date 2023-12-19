import { memo } from "@utils/memo.js";

export const upperfirst = memo((str: string) => str.charAt(0).toUpperCase() + str.slice(1));
