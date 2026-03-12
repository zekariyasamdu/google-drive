import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import StorageSize from "~/components/storage-size";
import QueryClientWrapper from "~/components/client-wrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientWrapper>
      <SidebarProvider>
        <AppSidebar>
          <StorageSize />
        </AppSidebar>
        <main className="relative w-full">{children}</main>
      </SidebarProvider>
    </QueryClientWrapper>
  );
}
