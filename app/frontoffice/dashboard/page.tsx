"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../app-sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { FrontOfficeBarChartComponent } from "../../Charts/FrontOffice/FrontBarChart";
import { FrontOfficePieChartComponent } from "../../Charts/FrontOffice/FrontPieChart";
import { FrontOfficeAreaChartComponent } from "../../Charts/FrontOffice/FrontAreaChart";
import { FrontOfficeBigAreaChartComponent } from "@/app/Charts/FrontOffice/FrontBigAreaChart";
import { Frame, PieChart } from "lucide-react";

export default function FrontOfficeDashBoard() {
  
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
        <AppSidebar active={0} data={data}/>
        <div className="flex flex-col w-full p-3">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block font-semibold text-slate-800">
                    <Link href="/frontoffice/dashboard"> DashBoard </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          { /*main Content here */ }
          <div className="grid gap-3">
            <div className="flex flex-wrap justify-evenly gap-3">
              <FrontOfficeAreaChartComponent />
              <FrontOfficeBarChartComponent />
              <FrontOfficePieChartComponent />
            </div>
            <div>
              <FrontOfficeBigAreaChartComponent />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
