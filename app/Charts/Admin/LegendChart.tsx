"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

export function LegendChartComponent() {
  const [chartData, setChartData] = useState([]);
  
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
          const responseData = result.barchartlogisticData;     
          console.log("Response Logistics Data:", result);
      
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
      getRecords("barchartlogistic", "barchartlogistic"); // Fetch data for piechart with last 7 days
    
    }, [])
  
  const chartConfig = {
    In_Transit: {
      label: "In-Transit",
      color: "hsl(var(--chart-1))",
    },
    Sample_Received: {
      label: "Received",
      color: "hsl(var(--chart-2))",
    },
    Delivered_to_Lab: {
      label: "Delivered",
      color: "hsl(var(--chart-3))"
    }
  } satisfies ChartConfig
    
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Logistics Overview</CardTitle>
        <CardDescription>Sunday - Saturday</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dayOfWeek"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="In_Transit"
              stackId="a"
              fill="var(--color-In_Transit)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="Sample_Received"
              stackId="a"
              fill="var(--color-Sample_Received)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Delivered_to_Lab"
              stackId="a"
              fill="var(--color-Delivered_to_Lab)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          Showing total transit and delivered samples for the week.
        </div>
      </CardFooter>
    </Card>
  )
}
