"use client"
import { Trash, Star, Clock, Home, User, ChevronDown } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import StorageSize from "./storage-size";
import CreateFolderDialog from "./dialogs/create-folder";
import CreateFileDialog from "./dialogs/import-file";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";


const items = [
  {
    title: "My Drive",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Star",
    url: "/star",
    icon: Star,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: Trash,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent  >

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (

                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Add
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem >
                    <SidebarMenuButton asChild>
                      <CreateFolderDialog variant="sidebar" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem >
                    <SidebarMenuButton asChild>
                      <CreateFileDialog variant="sidebar"/>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>

            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem >
            <StorageSize />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
