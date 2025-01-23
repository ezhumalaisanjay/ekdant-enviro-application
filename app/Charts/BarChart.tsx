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
const chartData = [
  { day: "Sunday", requests: 186, accepted: 80 },
  { day: "Monday", requests: 305, accepted: 200 },
  { day: "Tuesday", requests: 237, accepted: 120 },
  { day: "Wednesday", requests: 73, accepted: 50 },
  { day: "Thursday", requests: 209, accepted: 130 },
  { day: "Saturday", requests: 214, accepted: 140 },
]

const chartConfig = {
  requests: {
    label: "requests",
    color: "hsl(var(--chart-1))",
  },
  accepted: {
    label: "accepted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>This Week - Requests and Accepted</CardTitle>
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
            <Bar dataKey="requests" fill="var(--color-requests)" radius={4} />
            <Bar dataKey="accepted" fill="var(--color-accepted)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this Week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total request and accepted requests for the week
        </div>
      </CardFooter>
    </Card>
  )
}
