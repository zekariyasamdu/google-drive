"use client";
import React, { useEffect } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import Header from "~/components/header";
import BreadcrumbProvider from "~/components/providers/breadcrumb-provider";
import { SidebarProvider } from "~/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authClient } from "~/lib/auth/auth-client";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const test = async () => {
      try {
        const accounts = await authClient.listAccounts();
        console.log(accounts);
      } catch (e) {
        console.error(e);
      }
    };
    void test();
  },[]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <BreadcrumbProvider>
          <AppSidebar />
          <main className="relative w-full">
            <Header />
            {children}
          </main>
        </BreadcrumbProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
