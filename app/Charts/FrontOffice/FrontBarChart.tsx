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


export function FrontOfficeBarChartComponent() {

  const chartData = [
    { day: "Sunday", pickup: 35, dropoff: 15 },
    { day: "Monday", pickup: 30, dropoff: 5 },
    { day: "Tuesday", pickup: 37, dropoff: 3 },
    { day: "Wednesday", pickup: 40, dropoff: 1 },
    { day: "Thursday", pickup: 31, dropoff: 4 },
    { day: "friday", pickup: 37, dropoff: 2 },
    { day: "saturday", pickup: 33, dropoff: 16 },
  ]
  
  const chartConfig = {
    pickup: {
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
            <Bar dataKey="pickup" fill="var(--color-pickup)" radius={4} />
            <Bar dataKey="dropoff" fill="var(--color-dropoff)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this Week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total pickup and drop-off samples for the week
        </div>
      </CardFooter>
    </Card>
  )
}
