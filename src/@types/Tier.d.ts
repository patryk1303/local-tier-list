export type TierElement = {
  id: string;
  image: string;
  label?: string;
};

export type TierRow = {
  id: string;
  tier: string;
  backgroundColor: string;
  elements: TierElement[];
};

export type TierList = {
  tiers: TierRow[];
  elements: TierElement[];
};

export type TierListWithId = TierList & {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
