import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
type UserView = "dashboard" | "star" | "trash";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function processPath(path: string) {
  const pathArray = path.split("/");
  const currentCrumbId = Number(pathArray[2]);
  const currrentPath = pathArray[1];
  const folderId = isNaN(currentCrumbId) ? null : currentCrumbId;
  if (!currrentPath) {
    throw new Error("Empty route!");
  }
  const routeName = currrentPath as UserView;
  return {
    routeName,
    folderId,
  };
}
