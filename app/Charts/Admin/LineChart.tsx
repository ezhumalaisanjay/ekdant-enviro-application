"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export function LineChartComponent() {
  
  const chartData = [
    { month: "July", ratings: 50, mobile: 80 },
    { month: "August", ratings: 55, mobile: 200 },
    { month: "September", ratings: 39, mobile: 120 },
    { month: "October", ratings: 56, mobile: 190 },
    { month: "November", ratings: 47, mobile: 130 },
    { month: "December", ratings: 44, mobile: 140 },
  ]
  
  const chartConfig = {
    ratings: {
      label: "ratings",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Feedbacks and Ratings</CardTitle>
        <CardDescription>July - Dec 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="ratings"
              type="natural"
              stroke="var(--color-ratings)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-ratings)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% last 6 months <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total ratings and feedbacks for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
