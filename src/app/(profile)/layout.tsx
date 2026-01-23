"use client"
import React from "react"
import { AppSidebar } from "~/components/app-sidebar"
import BreadcrumbProvider from "~/components/providers/breadcrumb-provider"
import { SidebarProvider } from "~/components/ui/sidebar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <BreadcrumbProvider>
          <AppSidebar />
          <main className="w-full relative">
            {children}
          </main>
        </BreadcrumbProvider>
      </SidebarProvider >
    </QueryClientProvider>
  )
}
