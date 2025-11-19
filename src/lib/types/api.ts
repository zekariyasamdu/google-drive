export type TFile = {
  id: string;
  name: string;
  type: "File";
  parent: string;
  url: string;
  size: string;
};

export type TFolder = {
  id: string;
  name: string;
  type: "Folder";
  parent: string | null;
};

