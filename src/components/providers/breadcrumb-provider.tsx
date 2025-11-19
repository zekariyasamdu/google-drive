"use client";
import React from "react";
import { BreadcrumbContext } from "~/contexts/breadcrub-context";
import { useDriveData } from "~/hooks/use-drive-data";

export default function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const driveData = useDriveData();
  const [currentCrumbId, _setCurrentCrumbId] = React.useState<string | null>(null);
  const [breadcrumbs, _setBreadcrumbs] = React.useState<
    { id: string; name: string }[]
  >([]);

  const setCurrentcrumbId = React.useCallback((id: string | null) => {
    _setCurrentCrumbId(id);

    if (id === null) {
      _setBreadcrumbs([]);
      return;
    }

    _setBreadcrumbs((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      return prev.slice(0, index + 1);
    });
  }, []);

  const setBreadcrumbs = React.useCallback(
    (crumb: { id: string; name: string }) => {
      _setBreadcrumbs((i) => [...i, crumb]);
    },
    [],
  );

  const filteredData = React.useMemo(() => {
    const filteredFolder = driveData.folders.filter((item) => item.parent === currentCrumbId);
    const filteredFile = driveData.files.filter((item) => item.parent === currentCrumbId);
    return { folder: filteredFolder, file: filteredFile }
  }, [driveData, currentCrumbId]);

  const value = React.useMemo(() => {
    return {
      currentCrumbId,
      setCurrentcrumbId,
      breadcrumbs,
      setBreadcrumbs,
      data: filteredData,
    };
  }, [
    currentCrumbId,
    setCurrentcrumbId,
    breadcrumbs,
    setBreadcrumbs,
    filteredData,
  ]);

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}
