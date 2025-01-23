import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { AreaChartComponent } from "../Charts/AreaChart";
import { BarChartComponent } from "../Charts/BarChart";
import { PieChartComponent } from "../Charts/PieChart";
import { BigAreaChartComponent } from "../Charts/BigAreaChart";
import { LineChartComponent } from "../Charts/LineChart";
import { LegendChartComponent } from "../Charts/LegendChart"
import { StepChartComponent } from "../Charts/StepChart";

export default function DashBoard() {
  
  return (
    <>
      <SidebarProvider>
        <AppSidebar active={0}/>
        <div className="flex flex-col w-full p-3">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block font-semibold text-slate-800">
                    <BreadcrumbLink><Link href="/dashboard"> DashBoard </Link></BreadcrumbLink>
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

