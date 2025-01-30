"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

const chartData = [
  { status: "high", tickets: 56, fill: "var(--color-high)" },
  { status: "moderate", tickets: 70, fill: "var(--color-moderate)" },
  { status: "medium", tickets: 74, fill: "var(--color-medium)" },
  { status: "low", tickets: 85, fill: "var(--color-low)" },
]

const chartConfig = {
  tickets: {
    label: "Tickets",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-1))",
  },
  moderate: {
    label: "Moderate",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

export function PieChartComponent() {
  React.useEffect(() => {
    const getRecords = async (category, type) => {
      try {
        // Get current date
        const endDate = new Date();
        // Get start date (7 days before today)
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
    
        // Format dates as YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split("T")[0];
    
        const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_dashboard_barchart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            category, 
            type, 
            start_date: formatDate(startDate), 
            end_date: formatDate(endDate) 
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json(); // Parse JSON once
        console.log("Response Data:", result);
    
        return result; // Return parsed result
    
      } catch (error) {
        console.error("Error fetching records:", error.message);
        return { error: error.message };
      }
    };
    
    // Example calls:
    getRecords("piechart", "piechart"); // Fetch data for piechart with last 7 days
    getRecords("barchart", "barchart"); // Fetch data for barchart with last 7 days
    
  }, []) 

  const totalTickets = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tickets, 0)
  }, [])

  return (
    <Card className="flex flex-col w-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Priorities of Tickets</CardTitle>
        <CardDescription>Weekly Overview </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tickets"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTickets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Tickets for the week
        </div>
      </CardFooter>
    </Card>
  )
}
