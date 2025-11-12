import type React from "react"
import { AppSidebar } from "~/components/app-sidebar"
import Header from "~/components/header"
import { SidebarProvider } from "~/components/ui/sidebar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full">
        <Header />
          {children}
      </main>
    </SidebarProvider>
  )
}
