export type TFile = {
  id: number;
  name: string;
  parent: number | null;
  url: string;
  size: string;
};

export type TFolder = {
  id: number;
  name: string;
  parent: number | null;
};

