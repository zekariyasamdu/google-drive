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
        <AppSidebar />
        <main className="relative w-full">
          <QueryClientWrapper>
            <Header />
            {children}
          </QueryClientWrapper>
        </main>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
}
