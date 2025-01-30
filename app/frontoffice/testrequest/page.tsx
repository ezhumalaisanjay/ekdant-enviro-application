"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../app-sidebar/AppSidebar";
import ServiceRequestForm from "../../Form/ServiceRequest";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Table from "../../Table/index"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frame, PieChart, X } from "lucide-react";

export default function ServiceRequest() {
 
  const name_user = localStorage.getItem('name_user') || "Default User"; // Provide a default if null
  const email_user = localStorage.getItem('email_user') || "default@example.com"; // Provide a default if null

  const data = {
    user: {
      name: name_user,
      email: email_user,
      avatar: "/avatars/shadcn.jpg",
    },
  
    projects: [
      {
        name: "DashBoard",
        url: "/frontoffice/dashboard",
        icon: Frame,
        title: "Dashboard",
        id: 0,
      },
      {
        name: "Test Request",
        url: "/frontoffice/testrequest",
        icon: PieChart,
        title: "Service Request",
        id: 1,
      },
    ],
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar active={1} data={data} />
        <div className="flex flex-col w-full p-3">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <Link href="/frontoffice/dashboard"> DashBoard </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="hidden md:block font-semibold text-slate-800">
                    <BreadcrumbLink href="#">Service Request</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div>
            <div className="flex justify-between items-center m-3">
              <h1 className="font-semibold">Service Request</h1>
              <Drawer>
                <DrawerTrigger className="p-2 rounded-lg text-sm text-white font-semibold bg-blue-500 hover:bg-blue-400">
                  Add Service Request
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="flex justify-between">
                    <div>
                      <DrawerTitle>Service Request Form</DrawerTitle>
                      <DrawerDescription></DrawerDescription>
                    </div>
                    <DrawerClose>
                      <Button variant="outline"><X /></Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <ServiceRequestForm />
                </DrawerContent>
              </Drawer>
            </div>
            <div className="min-w-full overflow-x-auto">
              <Table />
            </div>
          </div>
          </div>
      </SidebarProvider>
    </>
  );
}

