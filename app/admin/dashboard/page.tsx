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
import { AreaChartComponent } from "../../Charts/Admin/AreaChart";
import { BarChartComponent } from "../../Charts/Admin/BarChart";
import { PieChartComponent } from "../../Charts/Admin/PieChart";
import { BigAreaChartComponent } from "../../Charts/Admin/BigAreaChart";
import { LineChartComponent } from "../../Charts/Admin/LineChart";
import { LegendChartComponent } from "../../Charts/Admin/LegendChart"
import { StepChartComponent } from "../../Charts/Admin/PieChartActive";
import { Frame, PieChart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashBoard() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
      url: "/admin/dashboard",
      icon: Frame,
      title: "Dashboard",
      id: 0,
    },
    {
      name: "Test Request",
      url: "/admin/testrequest",
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
                  <Link href="/admin/dashboard"> DashBoard </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          { /*main Content here */ }
          <div className="grid gap-3">
            <div className="flex flex-wrap justify-evenly gap-3">
              <AreaChartComponent />
              <BarChartComponent />
              <PieChartComponent />
            </div>
            <div>
              <BigAreaChartComponent />
            </div>
            <div className="flex flex-wrap justify-evenly gap-3">
              <LineChartComponent />
              <LegendChartComponent />
              <StepChartComponent />
            </div>
          </div>
          </div>
      </SidebarProvider>
    </>
  );
}

