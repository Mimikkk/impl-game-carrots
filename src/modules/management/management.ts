import { createSignal } from "solid-js";

export const [gold, setGold] = createSignal(0);
export const [turn, setTurn] = createSignal(0);
export const [turnsTillPay, setTurnTillPlay] = createSignal(0);
export const [pay, setPay] = createSignal(5);
