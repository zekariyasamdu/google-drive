"use client"
import { createContext } from "react";

type BreadcrumbContextType = {
  currentCrumbId: number | null
  breadcrumbs: { id: number, name: string }[] | null
  setBreadcrumbs: (crumb: { id: number, name: string }) => void
  setCurrentcrumbId: (id: number | null) => void
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>(
  {} as BreadcrumbContextType
);

