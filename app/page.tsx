"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar/AppSidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import HeaderSection from "./Header/header"
import { useEffect, useState } from "react";
import { MobileSidebar } from "./app-sidebar/AppSidebar";

export default function Layout() {
  return (
    <div className="flex">
      <SidebarProvider> 
        <AppSidebar /> 
        <main className="w-full"> 
          <SidebarTrigger />
          <div>
            <ServiceRequest />
          </div>  
        </main> 
        </SidebarProvider>
    </div>
  );
}

