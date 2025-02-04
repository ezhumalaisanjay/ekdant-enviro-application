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

interface ChartData {
  status: string
  tickets: number
  fill: string
}

export function PieChartComponent() {
  const [chartData, setChartData] = React.useState<ChartData[]>([])
  //const [totalTickets, setTotalTickets] = React.useState(0)
  
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
        const responseData = result.pieChartPriorityData;
        console.log("Response PieChartPriority Data:", result);
    
        setChartData(responseData);
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
    getRecords("piechartpriority", "piechartpriority"); // Fetch data for piechart with last 7 days
  
  }, [])

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


  const totalTickets = React.useMemo(() => {
    if (chartData.length === 0) return 0
    return chartData.reduce((acc, curr) => acc + (curr.tickets || 0), 0)
  }, [chartData])


  return (
    <Card className="flex flex-col w-full">
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
