"use client";
import React from "react";
import { BreadcrumbContext } from "~/contexts/breadcrub-context";

export default function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCrumbId, _setCurrentCrumbId] = React.useState<number | null>(null);
  const [breadcrumbs, _setBreadcrumbs] = React.useState<
    { id: number; name: string }[]
  >([]);

  const setCurrentcrumbId = React.useCallback((id: number | null) => {
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
    (crumb: { id: number; name: string }) => {
      _setBreadcrumbs((i) => [...i, crumb]);
    },
    [],
  );

  const value = React.useMemo(() => {
    return {
      currentCrumbId,
      setCurrentcrumbId,
      breadcrumbs,
      setBreadcrumbs,
    };
  }, [
    currentCrumbId,
    setCurrentcrumbId,
    breadcrumbs,
    setBreadcrumbs,
  ]);

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}
