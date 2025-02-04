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
import { LineChartComponent } from "../../Charts/Admin/LineChart";
import { LegendChartComponent } from "../../Charts/Admin/LegendChart"
import { StepChartComponent } from "../../Charts/Admin/PieChartActive";
import { Frame, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BigAreaChartComponent } from "@/app/Charts/Admin/BigAreaChart";
import { BigBarChartComponent } from "@/app/Charts/Admin/BigBarChart";
import { BigLineChartComponent } from "@/app/Charts/Admin/BigLineChart";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { RadialLineChartComponent } from "@/app/Charts/Admin/RadialLineChart";
import { CustomBarChartComponent } from "@/app/Charts/Admin/CustomBarChart";
import { CustomPieChartComponent } from "@/app/Charts/Admin/CustomPieChart";

export default function AdminDashBoard() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [index, setIndex] = useState(0);
  const [month, setMonth] = useState<string>("2025-01");

  const today = new Date();
  // Get the previous month
  const prevMonth = today.getMonth() - 1;
  const prevYear = prevMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
  const prevMonthDate = new Date(prevYear, prevMonth, 1); // Set to the 1st day of the previous month

  // Get the start of the previous month (1st day)
  const PrevStartOfMonth = new Date(prevMonthDate);

  // Get the end of the previous month (last day)
  const PrevEndOfMonth = new Date(prevYear, prevMonth + 1, 0);

  const formattedPrevStartOfMonth = format(PrevStartOfMonth, "yyyy-MM-dd")
  const formattedPrevEndOfMonth = format(PrevEndOfMonth, "yyyy-MM-dd")
  const [startOfMonth, setStartOfMonth] = useState<string>(formattedPrevStartOfMonth);
  const [endOfMonth, setEndOfMonth] = useState<string>(formattedPrevEndOfMonth);

  useEffect( () => {
    if (typeof window !== 'undefined') {
      const userName = localStorage.getItem('name_user') || "Default User";
      const userEMAIL = localStorage.getItem('email_user') || "default@example.com";
      setUserEmail(userEMAIL);
      setUsername(userName);
    }
  }, [])

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = e.target.value; // e.g., '2025-02'

     // Split the year and month
    const [yearStr, monthStr] = selectedMonth.split('-');
    
    // Convert the year and month to numbers
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    
    setMonth(selectedMonth);

    // Create a date object for the start of the month (1st day)
    const startOfMonth = new Date(year, month - 1, 1);

    // Create a date object for the end of the month (last day)
    const endOfMonth = new Date(year, month, 0);
    
    // Log the start and end of the month
    console.log('Start of month:', format(startOfMonth, "yyyy-MM-dd"));
    console.log('End of month:', format(endOfMonth, "yyyy-MM-dd"));
    const formattedStartDate = format(startOfMonth, "yyyy-MM-dd");
    const formattedEndDate = format(endOfMonth, "yyyy-MM-dd")

    setStartOfMonth(formattedStartDate);
    setEndOfMonth(formattedEndDate)
  };

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
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar active={0} data={data} />
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

          {/*main Content here */}
          <div className="mb-4 flex lg:flex-nowrap flex-wrap gap-3">
            <RadialLineChartComponent />
            <CustomBarChartComponent />
            <CustomPieChartComponent />
          </div>

          <div className="flex items-center justify-center mb-3">
            <Button 
              variant="ghost" 
              className={index === 0 ? "border-b border-green-500 rounded-none font-semibold bg-green-200" : "" + "rounded-none hover:bg-green-100"}
              onClick={() => setIndex(0)}
              >Weekly</Button>
            <Button 
              variant="ghost" 
              className={index === 1 ? "border-b border-green-500 rounded-none font-semibold bg-green-200" : "" + "rounded-none hover:bg-green-100"}
              onClick={() => setIndex(1)}
              >Monthly</Button>
          </div>
          {index === 0 ?
          <div className="grid gap-3">
            <div className="flex lg:flex-nowrap flex-wrap justify-evenly gap-3">
              <AreaChartComponent />
              <BarChartComponent />
              <PieChartComponent />
            </div>
            <div className="flex lg:flex-nowrap flex-wrap justify-evenly gap-3">
              <LineChartComponent />
              <LegendChartComponent />
              <StepChartComponent />
            </div>
          </div> :
          <>
            <div className="flex justify-end items-center m-2">
              <div>
                <Input
                  type="month"
                  value={month}
                  onChange={handleMonthChange}
                  id="month-picker"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <BigAreaChartComponent startOfMonth={startOfMonth} endOfMonth={endOfMonth} />
              <BigBarChartComponent startOfMonth={startOfMonth} endOfMonth={endOfMonth} />
              <BigLineChartComponent startOfMonth={startOfMonth} endOfMonth={endOfMonth} />
            </div> 
          </>}
        </div>
      </SidebarProvider>
    </>
  );
}

