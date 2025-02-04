"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
    label: "Records",
  },
  In_Transit: {
    label: "In-Transit",
    color: "hsl(var(--chart-1))",
  },
  Delivered_to_Lab: {
    label: "Delivered to Lab",
    color: "hsl(var(--chart-2))",
  },
  Sample_Received: {
    label: "Sample Received",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

type ChartDataItem = {
  date: string; // or Date, depending on how your data is structured
  In_Transit: number;
  Delivered_to_Lab: number;
  Sample_Received: number;
};

export function BigLineChartComponent({startOfMonth, endOfMonth}: {startOfMonth: Date; endOfMonth:Date}) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("In_Transit")
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([]);

  React.useEffect(() => {
      
        const getRecords = async (category: string, type: string) => {
          try {
        
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
            const responseData = result.barchartlogisticData;     
            console.log("Response Big BarChartLogistics Data:", result);
        
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
        getRecords("barchartlogistic", "barchartlogistic"); // Fetch data for piechart with last 7 days
      
      }, [startOfMonth, endOfMonth])

  const total = React.useMemo(
    () => ({
      In_Transit: chartData.reduce((acc, curr) => acc + (curr.In_Transit || 0), 0),
      Delivered_to_Lab: chartData.reduce((acc, curr) => acc + (curr.Delivered_to_Lab || 0), 0),
      Sample_Received: chartData.reduce((acc, curr) => acc + (curr.Sample_Received || 0), 0),
    }),
    [chartData]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Logistics Overview</CardTitle>
          <CardDescription>
            Showing Last month Logistics Overview
          </CardDescription>
        </div>
        <div className="flex">
          {["In_Transit", "Sample_Received", "Delivered_to_Lab"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground text-nowrap">
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
          <LineChart
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
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
