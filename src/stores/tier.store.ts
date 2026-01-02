// TODO add types

import { atom } from "nanostores";
import localforage from "localforage";

export const $tierLists = atom<any[]>([]);
export const $tierRows = atom<any[]>([]);

export const configTierStore = async () => {
  localforage.config({
    name: "tier-store",
    version: 1.0,
    storeName: "keyvaluepairs",
    description: "Tier lists store",
  });
};

export const getTierLists = async () => {
  // TODO types
  const tierLists = (await localforage.getItem("tier-lists")) as null | any[];
  console.log(tierLists);

  if (!tierLists) {
    return;
  }
  $tierLists.set(tierLists);
};

export const getTierList = async (id: string) => {
  // TODO types
  const tierLists = (await localforage.getItem("tier-lists")) as null | any[];

  if (!tierLists) {
    return;
  }
  const tierList = tierLists.find((tierList) => tierList.id === id);
  if (!tierList) {
    return;
  }
  $tierRows.set(tierList.tiers);
};
