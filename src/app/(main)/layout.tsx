"use client"
import React from "react"
import { AppSidebar } from "~/components/app-sidebar"
import UploadButton from "~/components/button/upload"
import Header from "~/components/header"
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
    <SidebarProvider>
      <BreadcrumbProvider>
        <AppSidebar />
        <QueryClientProvider client={queryClient}>
          <main className="w-full relative">
            <Header />
            {children}
            <UploadButton className="absolute right-20 bottom-15" />
          </main>
        </QueryClientProvider>
      </BreadcrumbProvider>
    </SidebarProvider>
  )
}
