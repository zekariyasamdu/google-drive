"use client"
import React from "react"
import { AppSidebar } from "~/components/app-sidebar"
import UploadBtn from "~/components/button/upload"
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
            <UploadBtn className="absolute right-20 bottom-15 border-amber-50  ut-button:bg-red" />
          </main>
        </QueryClientProvider>
      </BreadcrumbProvider>
    </SidebarProvider>
  )
}
