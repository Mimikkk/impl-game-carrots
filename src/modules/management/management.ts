import { createEffect, createMemo, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { createStorage } from "@logic/Storage/createStorage.js";
import { Modals } from "@logic/modals.js";

export type ResourceType = "water" | "power" | "gold" | "oil";

export const [turn, setTurn] = createSignal(1);
export const nextTurn = () => setTurn((v) => v + 1);

export const [turnsTillTax, setTurnsTillTax] = createSignal(9);
export const [tax, setTax] = createSignal(24);

export const [maintenance, setMaintenance] = createSignal(-12);

export const [resources, setResources] = createStore({
  water: 0,
  power: 0,
  gold: 0,
  oil: 0,
});

const getGoldIncome = createMemo(() => 4);
const getPowerIncome = createMemo(() => 1);
const getWaterIncome = createMemo(() => 12);
const getOilIncome = createMemo(() => 3);
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

createEffect(
  on(
    [turn],
    () => {
      setResources((resources) => ({
        water: resources.water + balance.water,
        power: resources.power + balance.power,
        gold: resources.gold + balance.gold,
        oil: resources.oil + balance.oil,
      }));
    },
    { defer: true },
  ),
);

const getGoldExpenses = createMemo(() => 12 + maintenance());
const getPowerExpenses = createMemo(() => 2);
const getWaterExpenses = createMemo(() => 11);
const getOilExpenses = createMemo(() => 4);
export const [expense, setExpenses] = createStore({
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

const getGoldBalance = createMemo(() => income.gold - expense.gold);
const getPowerBalance = createMemo(() => income.power - expense.power);
const getWaterBalance = createMemo(() => income.water - expense.water);
const getOilBalance = createMemo(() => income.oil - expense.oil);
export const balance = {
  get water() {
    return getWaterBalance();
  },
  get power() {
    return getPowerBalance();
  },
  get gold() {
    return getGoldBalance();
  },
  get oil() {
    return getOilBalance();
  },
};

export const openMainMenu = (event: MouseEvent) => Modals.read("main-menu").open({ event });
