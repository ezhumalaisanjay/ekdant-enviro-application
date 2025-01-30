"use client"

import { TrendingUp } from "lucide-react"
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

export function AreaChartComponent() {
  
  const chartData = [
    { day: "Sunday", walkin: 15, email: 13, call : 21 },
    { day: "Monday", walkin: 12, email: 5, call : 20 },
    { day: "Tuesday", walkin: 19, email: 7, call : 22 },
    { day: "Wednesday", walkin: 18, email: 6, call : 10 },
    { day: "Thursday", walkin: 16, email: 2, call : 18 },
    { day: "Friday", walkin: 21, email: 9, call : 11 },
    { day: "Saturday", walkin: 22, email: 6, call : 12 },
  ]
  
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
        <CardTitle>Customer Visited Source</CardTitle>
        <CardDescription>
          Showing total customers visited source for the week
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
              dataKey="day"
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
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this Week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              This Week (Sunday - Saturday)
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
