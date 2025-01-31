"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../app-sidebar/AppSidebar";
import CustomerDetailsForm from "../../Form/ClientDetails/customerDetailsForm";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { Frame, HeartHandshake, PieChart, X } from "lucide-react";
import { useEffect, useState } from "react";
import ClientDetailsTable from "@/app/Table/ClientDetails";

export default function ClientDetails() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect( () => {
      if (typeof window !== 'undefined') {
        const userName = localStorage.getItem('name_user') || "Default User";
        const userEMAIL = localStorage.getItem('email_user') || "default@example.com";
        setUserEmail(userEMAIL);
        setUsername(userName);
      }
    }, [])
  
  const data = {
    user: {
      name: username,
      email: userEmail,
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
      {
        name: "Client Details",
        url: "/frontoffice/clientdetails",
        icon: HeartHandshake,
        title: "Client Details",
        id: 2,
      },
    ],
  }

  const handleDrawer = () => {
    setDrawerOpen(false);
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar active={2} data={data} />
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
                  <BreadcrumbItem className="hidden md:block">
                    <Link href="/frontoffice/testrequest">Service Request</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="hidden md:block font-semibold text-slate-800">
                    <BreadcrumbLink href="#">Client Details</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div>
            <div className="flex justify-between items-center m-3">
              <h1 className="font-semibold">Client Details</h1>
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger className="p-2 rounded-lg text-sm text-white font-semibold bg-blue-500 hover:bg-blue-400">
                  Add Client
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="flex justify-between">
                    <div>
                      <DrawerTitle>Client Details Form</DrawerTitle>
                      <DrawerDescription></DrawerDescription>
                    </div>
                    <DrawerClose>
                      <X />
                    </DrawerClose>
                  </DrawerHeader>
                  <CustomerDetailsForm drawerClose={handleDrawer}/>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="min-w-full overflow-x-auto">
              <ClientDetailsTable />
            </div>
          </div>
          </div>
      </SidebarProvider>
    </>
  );
}

