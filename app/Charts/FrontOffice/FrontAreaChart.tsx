"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export function FrontOfficeAreaChartComponent() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {

  const getRecords = async (category: string, type: string) => {
    try {

      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

      // Get the start of the week (Sunday as the first day of the week)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek); // Adjust the date to the previous Sunday

      // Get the end of the week (Saturday as the last day of the week)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get the Saturday

      const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_dashboard_barchart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          category, 
          type, 
          start_date: format(startOfWeek, "yyyy-MM-dd"),
          end_date: format(endOfWeek, "yyyy-MM-dd") 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json(); // Parse JSON once
      const responseData = result.areaChartData
      console.log("Response Customer Visited Data:", result);
  
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
    walkin: {
      label: "walkin",
      color: "hsl(var(--chart-1))",
    },
    email: {
      label: "email",
      color: "hsl(var(--chart-2))",
    },
    call: {
      label: "call",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Customers Visited</CardTitle>
        <CardDescription>
          Showing total customers visited for the Week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dayOfWeek"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="email"
              type="natural"
              fill="var(--color-email)"
              fillOpacity={0.4}
              stroke="var(--color-email)"
              stackId="a"
            />
            <Area
              dataKey="walkin"
              type="natural"
              fill="var(--color-walkin)"
              fillOpacity={0.4}
              stroke="var(--color-walkin)"
              stackId="a"
            />
            <Area
              dataKey="call"
              type="natural"
              fill="var(--color-call)"
              fillOpacity={0.4}
              stroke="var(--color-call)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              This Week (Sunday - Saturday)
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
