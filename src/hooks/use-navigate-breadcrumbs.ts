"use client"
import React from "react";
import { BreadcrumbContext } from "~/contexts/breadcrub-context";

export function useNavigateBreadcrumbs() {
  const data = React.useContext(BreadcrumbContext);
  if (!data) throw new Error("'useNavigateBreadcrumbs' must be in BreadcrumbProvider")
  return data
}
