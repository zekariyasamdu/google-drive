"use client";
import React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">{children}</main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
