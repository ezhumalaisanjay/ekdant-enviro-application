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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function LegendChartComponent() {
  
  const chartData = [
    { day: "Sunday", intransit: 1, received: 25, delivered: 25, },
    { day: "Monday", intransit: 2, received: 46, delivered: 46,  },
    { day: "Tuesday", intransit: 7, received: 45, delivered: 45,  },
    { day: "Wednesday", intransit: 3, received: 39, delivered: 39,  },
    { day: "Thursday", intransit: 7, received: 33, delivered: 33,  },
    { day: "Friday", intransit: 3, received: 31, delivered: 31,  },
    { day: "Saturday", intransit: 0, received: 20, delivered: 20,  },
  ]
  
  const chartConfig = {
    intransit: {
      label: "In-Transit",
      color: "hsl(var(--chart-1))",
    },
    received: {
      label: "Received",
      color: "hsl(var(--chart-2))",
    },
    delivered: {
      label: "Delivered",
      color: "hsl(var(--chart-3))"
    }
  } satisfies ChartConfig
    
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Logistics Overview</CardTitle>
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
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="intransit"
              stackId="a"
              fill="var(--color-intransit)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="received"
              stackId="a"
              fill="var(--color-received)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="delivered"
              stackId="a"
              fill="var(--color-delivered)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total transit and delivered samples for the week.
        </div>
      </CardFooter>
    </Card>
  )
}
