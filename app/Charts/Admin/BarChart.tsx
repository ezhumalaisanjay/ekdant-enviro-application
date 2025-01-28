"use client"

import { TrendingUp } from "lucide-react"
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

export function BarChartComponent() {

  const chartData = [
    { day: "Sunday", inprocess: 9, completed: 40 },
    { day: "Monday", inprocess: 7, completed: 39 },
    { day: "Tuesday", inprocess: 5, completed: 50 },
    { day: "Wednesday", inprocess: 2, completed: 37 },
    { day: "Thursday", inprocess: 0, completed: 36 },
    { day: "friday", inprocess: 3, completed: 38 },
    { day: "saturday", inprocess: 10, completed: 30 },
  ]
  
  const chartConfig = {
    inprocess: {
      label: "In-process",
      color: "hsl(var(--chart-1))",
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Lab Status</CardTitle>
        <CardDescription>Sunday - Saturday</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="inprocess" fill="var(--color-inprocess)" radius={4} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this Week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total pending and completed requests for the week
        </div>
      </CardFooter>
    </Card>
  )
}
