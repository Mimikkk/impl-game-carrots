import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const [turn, setTurn] = createSignal(1);
export const [turnsTillTax, setTurnsTillTax] = createSignal(9);
export const [tax, setTax] = createSignal(24);

export const [maintenance, setMaintenance] = createSignal(-12);

export const [resources, setResources] = createStore({
  water: 0,
  power: 0,
  gold: 0,
  oil: 0,
});

export const [income, setIncome] = createStore({
  get water() {
    return getWaterIncome();
  },
  get power() {
    return getPowerIncome();
  },
  get gold() {
    return getGoldIncome();
  },
  get oil() {
    return getOilIncome();
  },
});

const getGoldIncome = createMemo(() => 4);
const getPowerIncome = createMemo(() => 2);
const getWaterIncome = createMemo(() => 12);
const getOilIncome = createMemo(() => 4);

export const [expenses, setExpenses] = createStore({
  get water() {
    return getWaterExpenses();
  },
  get power() {
    return getPowerExpenses();
  },
  get gold() {
    return getGoldExpenses();
  },
  get oil() {
    return getOilExpenses();
  },
});

const getGoldExpenses = createMemo(() => -12 - maintenance());
const getPowerExpenses = createMemo(() => 2);
const getWaterExpenses = createMemo(() => 12);
const getOilExpenses = createMemo(() => -4);
