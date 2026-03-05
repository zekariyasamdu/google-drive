import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import QueryClientWrapper from "~/components/client-wrapper";
import Header from "~/components/header";
import BreadcrumbProvider from "~/components/providers/breadcrumb-provider";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <QueryClientWrapper>
          <AppSidebar />
          <main className="relative w-full">
            <Header />
            {children}
          </main>
        </QueryClientWrapper>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
}
