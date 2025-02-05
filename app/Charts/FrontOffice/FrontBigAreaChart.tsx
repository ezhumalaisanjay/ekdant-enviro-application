"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format } from "date-fns"

export function FrontOfficeBigAreaChartComponent() {
  const [chartData, setChartData] = React.useState([])

   React.useEffect(() => {
    
      const getRecords = async (category: string, type: string) => {
        try {

          const today = new Date();
          // Get the previous month
          const prevMonth = today.getMonth() - 1;
          const prevYear = prevMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
          const prevMonthDate = new Date(prevYear, prevMonth, 1); // Set to the 1st day of the previous month

          // Get the start of the previous month (1st day)
          const startOfMonth = new Date(prevMonthDate);

          // Get the end of the previous month (last day)
          const endOfMonth = new Date(prevYear, prevMonth + 1, 0); // 0th day of the next month gives the last day of the current month
      
          const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_dashboard_barchart", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              category, 
              type, 
              start_date: format(startOfMonth, "yyyy-MM-dd"),
              end_date: format(endOfMonth, "yyyy-MM-dd") 
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json(); // Parse JSON once
          const responseData = result.areaChartData
          console.log("Response Big Customer Visited Data:", result);
      
          setChartData(responseData)
          return responseData; // Return parsed result
      
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error fetching records:", error.message);
            return { error: error.message };
          } else {
            console.error("Unknown error:", error);
            return { error: "An unknown error occurred" };
          }
        }
      };
      
      // Example calls:
      getRecords("areachart", "areachart"); // Fetch data for piechart with last 7 days
    
    }, [])

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    walkin: {
      label: "Walkin",
      color: "hsl(var(--chart-1))",
    },
    email: {
      label: "Email",
      color: "hsl(var(--chart-2))",
    },
    call: {
      label: "Call",
      color: "hsl(var(--chart-3))"
    }
  } satisfies ChartConfig
  
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Customer Visited Source</CardTitle>
          <CardDescription>
          Showing total customers visited source for the last month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-walkin)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-walkin)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCall" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-call)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-call)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="email"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-email)"
              stackId="a"
            />
            <Area
              dataKey="walkin"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-walkin)"
              stackId="a"
            />
            <Area
              dataKey="call"
              type="natural"
              fill="url(#fillCall)"
              stroke="var(--color-call)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
