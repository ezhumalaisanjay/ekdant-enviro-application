"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

export function StepChartComponent() {  
  const id = "pie-interactive"
  const [chartData, setChartData] = React.useState([])
  
    React.useEffect(() => {
    
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
              start_date: formatDate(startOfWeek),
              end_date: formatDate(endOfWeek) 
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json(); // Parse JSON once
          const responseData = result.piecharttotalData
          console.log("Response TicketStatus Data:", result);
      
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
      getRecords("piecharttotal", "piecharttotal"); // Fetch data for piechart with last 7 days
    
    }, [])

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  tickets: {
    label: "Tickets",
  },
  mobile: {
    label: "Mobile",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  intransit: {
    label: "In-transit",
    color: "hsl(var(--chart-2))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-3))",
  },
  testing: {
    label: "Testing",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

  return (
    <Card data-chart={id} className="flex flex-col w-[350px]">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Ticket Status</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
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
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 5} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 15}
                    innerRadius={outerRadius + 6}
                  />
                </g>
              )}
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

                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          
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
          Trending up by 5.2% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Status for the day
        </div>
      </CardFooter>
    </Card>
  )
}
