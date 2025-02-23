export type EntrancesItem = {
  id: string;
  name: string;
  ref: string;
  bracelet: string;
  isPartner: string;
  createdAt: string;
  isOut: boolean;
  entranceId?: string;
  companions?: EntrancesItem[];
};
