export type DriveDataType = {
  id: string;
  name: string;
  type: "File" | "Folder" | "root";
  parent: string | null;
  url: string | null;
  size: string | null;
};


