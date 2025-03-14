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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export function FrontOfficeBarChartComponent() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
      const getRecords = async (category:string, type:string) => {
        try {
          // Get current date
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
          const responseData = result.barchartData;
          console.log("Response Pickup Data:", result);
      
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
      
      getRecords("barchart", "barchart"); // Fetch data for barchart with last 7 days
      
    }, []) 
  
  const chartConfig = {
    pickUp: {
      label: "Pickup",
      color: "hsl(var(--chart-3))",
    },
    dropoff: {
      label: "Drop-off",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Pickup and Drop-off</CardTitle>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="pickUp" fill="var(--color-pickUp)" radius={4} />
            <Bar dataKey="dropoff" fill="var(--color-dropoff)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          Showing total pickup and drop-off samples for the week
        </div>
      </CardFooter>
    </Card>
  )
}
