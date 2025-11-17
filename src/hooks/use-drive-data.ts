import type { DriveDataType } from "~/lib/types/api";

export function useDriveData() {
  const rootId = "1";
  const projectsId = "2";
  const imagesId = "3";
  const schoolId = "4";

  const data: DriveDataType[] = [
    {
      id: rootId,
      name: "My Drive",
      type: "root",
      parent: null,
      url: "",
      size: "",
    },

    // ------- Folders -------
    {
      id: projectsId,
      name: "Projects",
      type: "Folder",
      parent: rootId,
      url: "",
      size: "",
    },
    {
      id: imagesId,
      name: "Images",
      type: "Folder",
      parent: rootId,
      url: "",
      size: "",
    },
    {
      id: schoolId,
      name: "School",
      type: "Folder",
      parent: rootId,
      url: "",
      size: "",
    },

    // ------- Files in root -------
    {
      id: "10",
      name: "resume.pdf",
      type: "File",
      parent: rootId,
      url: "/files/resume.pdf",
      size: "1.2 MB",
    },
    {
      id: "11",
      name: "todo.txt",
      type: "File",
      parent: rootId,
      url: "/files/todo.txt",
      size: "4 KB",
    },

    // ------- Files inside Projects -------
    {
      id: "12",
      name: "portfolio.zip",
      type: "File",
      parent: projectsId,
      url: "/files/portfolio.zip",
      size: "22 MB",
    },
    {
      id: "13",
      name: "landing-page.png",
      type: "File",
      parent: projectsId,
      url: "/files/landing-page.png",
      size: "540 KB",
    },
  ];

  return data;
}
