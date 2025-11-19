"use client"
import { createContext } from "react";
import type { TFolder, TFile } from "~/lib/types/api";

type BreadcrumbContextType = {
  currentCrumbId: string | null
  breadcrumbs: { id: string, name: string }[] | null
  setBreadcrumbs: (crumb: { id: string, name: string }) => void
  setCurrentcrumbId: (id: string | null) => void
  data: { folder: TFolder[], file: TFile[] }
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>(
  {} as BreadcrumbContextType
);

