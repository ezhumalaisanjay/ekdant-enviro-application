"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  Testing_in_Progress: {
    label: "Testing",
    color: "hsl(var(--chart-1))",
  },
  Reports_Generated: {
    label: "Reports Generated",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type ChartDataItem = {
  date: string; // or Date, depending on how your data is structured
  Testing_in_Progress: number;
  Reports_Generated: number;
};

export function BigBarChartComponent() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("Testing_in_Progress")
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([])

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
        
        
            // Format dates as YYYY-MM-DD
            const formatDate = (date: Date) => date.toISOString().split("T")[0];
        
            const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_dashboard_barchart", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                category, 
                type, 
                start_date: formatDate(startOfMonth),
                end_date: formatDate(endOfMonth) 
              }),
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const result = await response.json(); // Parse JSON once
            const responseData = result.barchartlabData
            console.log("Response Big BarChartLab Data:", result);
        
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
        getRecords("barchartlab", "barchartlab"); // Fetch data for piechart with last 7 days
      
      }, [])

  const total = React.useMemo(() => {
    return {
      Testing_in_Progress: chartData.reduce((acc, curr) => acc + (curr.Testing_in_Progress || 0), 0),
      Reports_Generated: chartData.reduce((acc, curr) => acc + (curr.Reports_Generated || 0), 0),
    };
  }, [chartData]);  // Recalculate total whenever chartData changes

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Lab Status</CardTitle>
          <CardDescription>
            Showing Last Month Overview
          </CardDescription>
        </div>
        <div className="flex">
          {["Testing_in_Progress", "Reports_Generated"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
