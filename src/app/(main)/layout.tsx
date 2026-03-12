import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import QueryClientWrapper from "~/components/client-wrapper";
import Header from "~/components/header";
import StorageSize from "~/components/storage-size";
import { SidebarProvider } from "~/components/ui/sidebar";
import { verifyUser } from "~/server/auth/verify-user";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifyUser();
  const userId = session.user.id;
  return (
    <SidebarProvider>
      <QueryClientWrapper>
        <AppSidebar>
          <StorageSize userId={userId} />
        </AppSidebar>
        <main className="relative w-full">
          <Header />
          {children}
        </main>
      </QueryClientWrapper>
    </SidebarProvider>
  );
}
