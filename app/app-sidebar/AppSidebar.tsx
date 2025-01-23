"use client"

import type * as React from "react"
import {
  Frame,
  PieChart,
} from "lucide-react"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarRail } from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "../../imges/ekdant-logo-icon.png"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  projects: [
    {
      name: "DashBoard",
      url: "/dashboard",
      icon: Frame,
      title: "Dashboard",
      id: 0,
    },
    {
      name: "Test Request",
      url: "/testrequest",
      icon: PieChart,
      title: "Service Request",
      id: 1,
    },
  ],
}

export function AppSidebar({ active }: { active: number}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <div>
            <Image src={logo} alt="Logo" width={30} height={30}/>
            <div className="text-xs text-green-600 font-semibold">Ekdant Enviro Services Ltd</div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} active={active}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

