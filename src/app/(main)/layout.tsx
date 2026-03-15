import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import QueryClientWrapper from "~/components/client-wrapper";
import DNDWrapper from "~/components/dnd-wrapper";
import Header from "~/components/header";
import StorageSize from "~/components/storage-size";
import { SidebarProvider } from "~/components/ui/sidebar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <QueryClientWrapper>
        <AppSidebar>
          <StorageSize />
        </AppSidebar>
        <main className="relative w-full">
          <Header />
          <DNDWrapper>{children}</DNDWrapper>
        </main>
      </QueryClientWrapper>
    </SidebarProvider>
  );
}
