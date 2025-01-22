"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar/AppSidebar";
import ServiceRequestForm from "../Form/ServiceRequest";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Table from "../Table/index"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

export default function ServiceRequest() {
  
  return (
    <>
      <SidebarProvider>
        <AppSidebar active={1} />
        <div className="flex flex-col w-full p-3">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink><Link href="/dashboard"> DashBoard </Link></BreadcrumbLink>
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
                  <DrawerHeader>
                    <DrawerTitle>Service Request Form</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
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

