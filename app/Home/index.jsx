"use client"

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { MobileSidebar } from "../app-sidebar/AppSidebar";
import { AppSidebar } from "../app-sidebar/AppSidebar";
import HeaderSection from "../Header/header"
import { SidebarProvider } from "@/components/ui/sidebar";

function Home() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => setWidth(window.innerWidth); 
    window.addEventListener("resize", handleWidth);
    
    return () => {
      window.removeEventListener("resize", handleWidth);
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Top Header */
      width < 768 ? 
      <ResizablePanelGroup
      direction="vertical"
      className="min-h-[640px] rounded-lg border md:min-w-[450px]"
    >
        <ResizablePanel defaultSize={11} className="bg-blue-400">
          <div className="flex h-full items-center justify-between">
            <MobileSidebar />
            <HeaderSection />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={89}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Main</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup> 
          :
      <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={15}>
          <div className="flex h-[636px] items-center justify-center p-6">
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={85}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={11} className="bg-blue-400">
              <div className="flex h-full items-center justify-end p-6">
                <HeaderSection />
              </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={89}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Main</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>}
    </div>
  );
}

export default Home