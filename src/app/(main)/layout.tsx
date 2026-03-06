import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import QueryClientWrapper from "~/components/client-wrapper";
import Header from "~/components/header";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <QueryClientWrapper>
        <AppSidebar />
        <main className="relative w-full">
          <Header />
          {children}
        </main>
      </QueryClientWrapper>
    </SidebarProvider>
  );
}
