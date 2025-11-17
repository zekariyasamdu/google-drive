"use client"
// TODO: make breadcrumbs appear when a folder is clicked
// TODO: make breadcrumbs disappear when a breadcumb previous to them is clicked
import React from "react";
import {BreadcrumbContext} from "~/contexts/breadcrub-context";
import { useDriveData } from "~/hooks/use-drive-data";
import type { DriveDataType } from "~/lib/types/api";

export default function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const driveData = useDriveData();
  const [currentCrumbId, _setCurrentCrumbId] = React.useState("1");
  const [breadcrumbs, _setBreadcrumbs] = React.useState<{ id: string, name: string}[]>([])

  const setCurrentcrumbId = React.useCallback((id: string) => {
    _setCurrentCrumbId(id);
  }, []);

  const setBreadcrumbs = React.useCallback((crumb: { id: string, name: string }) => {
    _setBreadcrumbs(i => [...i, crumb]);
  }, []);

  const filteredData: DriveDataType[] = React.useMemo(() => {
    return driveData.filter(item => item.parent === currentCrumbId);
  }, [driveData, currentCrumbId]);

  const value = React.useMemo(() => {
    return {
      currentCrumbId,
      setCurrentcrumbId,
      breadcrumbs,
      setBreadcrumbs,
      data: filteredData,
    };
  }, [currentCrumbId, setCurrentcrumbId, breadcrumbs, setBreadcrumbs, filteredData,]);

  return (
    <BreadcrumbContext.Provider value={value} >
      {children}
    </BreadcrumbContext.Provider>
  );
}
