"use client"

import { type LucideIcon } from "lucide-react"
import type * as React from "react"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarRail } from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "../../imges/ekdant-logo-icon.png"

// This is sample data.
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  url: string;
  icon: LucideIcon;
  title: string;
}

interface DataItem {
  user: User;
  projects: Project[];
}


export function AppSidebar({ active, data }: { active: number; data: DataItem}) {
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

