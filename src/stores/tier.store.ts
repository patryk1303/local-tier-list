import { atom } from "nanostores";
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";
import type { TierRow, TierListWithId } from "@/@types/Tier";

export const DEFAULT_TIER_ROWS: TierRow[] = [
  { id: "tier-s", tier: "S", backgroundColor: "#ccaa00", elements: [] },
  { id: "tier-a", tier: "A", backgroundColor: "#cc9900", elements: [] },
  { id: "tier-b", tier: "B", backgroundColor: "#cc6600", elements: [] },
  { id: "tier-c", tier: "C", backgroundColor: "#cc3300", elements: [] },
  { id: "tier-d", tier: "D", backgroundColor: "#cc0000", elements: [] },
];

export const $tierLists = atom<TierListWithId[]>([]);
export const $currentTierList = atom<TierListWithId | null>(null);
export const $tierRows = atom<TierRow[]>(DEFAULT_TIER_ROWS);

export const configTierStore = async () => {
  localforage.config({
    name: "tier-store",
    version: 1.0,
    storeName: "tier-lists-store",
    description: "Tier lists store",
  });
};

export const getTierLists = async (): Promise<TierListWithId[]> => {
  const tierLists = await localforage.getItem<TierListWithId[]>("tier-lists");

  if (tierLists && Array.isArray(tierLists)) {
    $tierLists.set(tierLists);
    return tierLists;
  }

  const emptyTierLists: TierListWithId[] = [];
  await localforage.setItem("tier-lists", emptyTierLists);
  $tierLists.set(emptyTierLists);
  return emptyTierLists;
};

export const getTierList = async (
  id: string,
): Promise<TierListWithId | undefined> => {
  const tierLists = await getTierLists();
  const tierList = tierLists.find((list) => list.id === id);

  if (tierList) {
    $currentTierList.set(tierList);
    $tierRows.set(tierList.tiers);
  }

  return tierList;
};

const saveTierLists = async (tierLists: TierListWithId[]): Promise<void> => {
  await localforage.setItem("tier-lists", tierLists);
  $tierLists.set(tierLists);
};

export const addTierList = async (
  tierListData: Omit<TierListWithId, "id" | "createdAt" | "updatedAt">,
): Promise<TierListWithId> => {
  const tierLists = await getTierLists();
  const newTierList: TierListWithId = {
    ...tierListData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedTierLists = [...tierLists, newTierList];
  await saveTierLists(updatedTierLists);

  return newTierList;
};

export const updateTierList = async (
  id: string,
  tierListData: Partial<Omit<TierListWithId, "id" | "createdAt" | "updatedAt">>,
): Promise<TierListWithId | null> => {
  const tierLists = await getTierLists();
  const existingTierList = tierLists.find((list) => list.id === id);

  if (!existingTierList) {
    return null;
  }

  const updatedTierList: TierListWithId = {
    ...existingTierList,
    ...tierListData,
    id: existingTierList.id,
    name: tierListData.name ?? existingTierList.name,
    tiers: tierListData.tiers ?? existingTierList.tiers,
    elements: tierListData.elements ?? existingTierList.elements,
    createdAt: existingTierList.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const updatedTierLists = tierLists.map((list) =>
    list.id === id ? updatedTierList : list,
  );
  await saveTierLists(updatedTierLists);

  if ($currentTierList.get()?.id === id) {
    $currentTierList.set(updatedTierList);
    $tierRows.set(updatedTierList.tiers);
  }

  return updatedTierList;
};

export const deleteTierList = async (id: string): Promise<boolean> => {
  const tierLists = await getTierLists();
  const filteredTierLists = tierLists.filter((list) => list.id !== id);

  if (filteredTierLists.length === tierLists.length) {
    return false;
  }

  await saveTierLists(filteredTierLists);

  if ($currentTierList.get()?.id === id) {
    $currentTierList.set(null);
  }

  return true;
};

export const setCurrentTierList = async (
  tierList: TierListWithId | null,
): Promise<void> => {
  $currentTierList.set(tierList);
  if (tierList) {
    $tierRows.set(tierList.tiers);

    const tierLists = await getTierLists();
    const index = tierLists.findIndex((list) => list.id === tierList.id);
    if (index !== -1) {
      const updatedTierLists = [...tierLists];
      updatedTierLists[index] = tierList;
      await saveTierLists(updatedTierLists);
    }
  } else {
    $tierRows.set(DEFAULT_TIER_ROWS);
  }
};

export const getCurrentTierList = (): TierListWithId | null => {
  return $currentTierList.get();
};
