"use client"
import { createContext } from "react";
import type { DriveDataType } from "~/lib/types/api";

type BreadcrumbContextType = {
  currentCrumbId: string
  breadcrumbs:  { id: string, name: string }[] | null
  setBreadcrumbs: (crumb: { id: string, name: string }) => void
  setCurrentcrumbId: (id: string) => void
  data: DriveDataType[]
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>(
  {} as BreadcrumbContextType
);

