"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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

const chartConfig = {
  tickets: {
    label: "Tickets",
  },
  New: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  In_Transit: {
    label: "In-Transit",
    color: "hsl(var(--chart-2))",
  },
  Sample_Received: {
    label: "Received",
    color: "hsl(var(--chart-3))",
  },
  Delivered_to_Lab: {
    label: "Delivered",
    color: "hsl(var(--chart-4))",
  },
  Testing_in_Progress: {
    label: "Testing",
    color: "hsl(var(--chart-5))",
  },
  Report_Generated: {
    label: "Generated",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function CustomBarChartComponent() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const getRecords = async (category: string, type: string) => {
      try {

        const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_dashboard_barchart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            category, 
            type,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json(); // Parse JSON once
        const responseData = result.piecharttotalData
        console.log("Response Overall Total Ticket Status Data:", result);
    
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
    getRecords("horizontalbarchart", "horizontalbarchart"); // Fetch data for piechart with last 7 days
  
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ticket Status</CardTitle>
        <CardDescription>Overall Status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="tickets" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tickets" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          New, In-transit, Delivered to lab, Sample received, Testing in progress, Reports generated
        </div>
      </CardFooter>
    </Card>
  )
}
