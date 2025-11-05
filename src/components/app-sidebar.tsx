"use client"
import {  Trash, Star, Clock, Home} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
 

const items = [
  {
    title: "My Drive",
    url: "/dashboard/my-drive",
    icon: Home,
  },
  {
    title: "Starred",
    url: "/dashboard/starred",
    icon: Star,
  },
  {
    title: "Recent",
    url: "/dashboard/recent",
    icon: Clock,
  },
  {
    title: "Trash",
    url: "/dashboard/trash",
    icon: Trash,
  },
]

export function AppSidebar() {
  return (
   <Sidebar variant="floating" >
    <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
            Drive
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

      <SidebarContent  >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton  asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
