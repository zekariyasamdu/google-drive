import type { TFolder, TFile } from "~/lib/types/api";

export function useDriveData() {

  const folders: TFolder[] = [
    {
      id: "fld-001",
      name: "Documents",
      type: "Folder",
      parent: null,
    },
    {
      id: "fld-002",
      name: "Projects",
      type: "Folder",
      parent: "fld-001",
    },
    {
      id: "fld-003",
      name: "Images",
      type: "Folder",
      parent: "fld-001",
    },
    {
      id: "fld-004",
      name: "Music",
      type: "Folder",
      parent: null,
    },
    {
      id: "fld-005",
      name: "2025",
      type: "Folder",
      parent: "fld-002",
    },
  ];

  const files: TFile[] = [
    {
      id: "file-001",
      name: "resume.pdf",
      type: "File",
      parent: "fld-001",
      url: "/files/resume.pdf",
      size: "142 KB",
    },
    {
      id: "file-002",
      name: "design-sketch.png",
      type: "File",
      parent: "fld-003",
      url: "/files/design-sketch.png",
      size: "2.1 MB",
    },
    {
      id: "file-003",
      name: "app-plan.md",
      type: "File",
      parent: "fld-002",
      url: "/files/app-plan.md",
      size: "28 KB",
    },
    {
      id: "file-004",
      name: "lofi.mp3",
      type: "File",
      parent: "fld-004",
      url: "/files/lofi.mp3",
      size: "3.7 MB",
    },
    {
      id: "file-005",
      name: "report-jan.txt",
      type: "File",
      parent: "fld-005",
      url: "/files/report-jan.txt",
      size: "9 KB",
    },
  ];

  const data = {folders, files}
  return data;
}
