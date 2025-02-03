"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
  { date: "2024-04-01", Testing_in_Progress: 222, Reports_Generated: 150 },
  { date: "2024-04-02", Testing_in_Progress: 97, Reports_Generated: 180 },
  { date: "2024-04-03", Testing_in_Progress: 167, Reports_Generated: 120 },
  { date: "2024-04-04", Testing_in_Progress: 242, Reports_Generated: 260 },
  { date: "2024-04-05", Testing_in_Progress: 373, Reports_Generated: 290 },
  { date: "2024-04-06", Testing_in_Progress: 301, Reports_Generated: 340 },
  { date: "2024-04-07", Testing_in_Progress: 245, Reports_Generated: 180 },
  { date: "2024-04-08", Testing_in_Progress: 409, Reports_Generated: 320 },
  { date: "2024-04-09", Testing_in_Progress: 59, Reports_Generated: 110 },
  { date: "2024-04-10", Testing_in_Progress: 261, Reports_Generated: 190 },
  { date: "2024-04-11", Testing_in_Progress: 327, Reports_Generated: 350 },
  { date: "2024-04-12", Testing_in_Progress: 292, Reports_Generated: 210 },
  { date: "2024-04-13", Testing_in_Progress: 342, Reports_Generated: 380 },
  { date: "2024-04-14", Testing_in_Progress: 137, Reports_Generated: 220 },
  { date: "2024-04-15", Testing_in_Progress: 120, Reports_Generated: 170 },
  { date: "2024-04-16", Testing_in_Progress: 138, Reports_Generated: 190 },
  { date: "2024-04-17", Testing_in_Progress: 446, Reports_Generated: 360 },
  { date: "2024-04-18", Testing_in_Progress: 364, Reports_Generated: 410 },
  { date: "2024-04-19", Testing_in_Progress: 243, Reports_Generated: 180 },
  { date: "2024-04-20", Testing_in_Progress: 89, Reports_Generated: 150 },
  { date: "2024-04-21", Testing_in_Progress: 137, Reports_Generated: 200 },
  { date: "2024-04-22", Testing_in_Progress: 224, Reports_Generated: 170 },
  { date: "2024-04-23", Testing_in_Progress: 138, Reports_Generated: 230 },
  { date: "2024-04-24", Testing_in_Progress: 387, Reports_Generated: 290 },
  { date: "2024-04-25", Testing_in_Progress: 215, Reports_Generated: 250 },
  { date: "2024-04-26", Testing_in_Progress: 75, Reports_Generated: 130 },
  { date: "2024-04-27", Testing_in_Progress: 383, Reports_Generated: 420 },
  { date: "2024-04-28", Testing_in_Progress: 122, Reports_Generated: 180 },
  { date: "2024-04-29", Testing_in_Progress: 315, Reports_Generated: 240 },
  { date: "2024-04-30", Testing_in_Progress: 454, Reports_Generated: 380 },
  { date: "2024-05-01", Testing_in_Progress: 165, Reports_Generated: 220 },
  { date: "2024-05-02", Testing_in_Progress: 293, Reports_Generated: 310 },
  { date: "2024-05-03", Testing_in_Progress: 247, Reports_Generated: 190 },
  { date: "2024-05-04", Testing_in_Progress: 385, Reports_Generated: 420 },
  { date: "2024-05-05", Testing_in_Progress: 481, Reports_Generated: 390 },
  { date: "2024-05-06", Testing_in_Progress: 498, Reports_Generated: 520 },
  { date: "2024-05-07", Testing_in_Progress: 388, Reports_Generated: 300 },
  { date: "2024-05-08", Testing_in_Progress: 149, Reports_Generated: 210 },
  { date: "2024-05-09", Testing_in_Progress: 227, Reports_Generated: 180 },
  { date: "2024-05-10", Testing_in_Progress: 293, Reports_Generated: 330 },
  { date: "2024-05-11", Testing_in_Progress: 335, Reports_Generated: 270 },
  { date: "2024-05-12", Testing_in_Progress: 197, Reports_Generated: 240 },
  { date: "2024-05-13", Testing_in_Progress: 197, Reports_Generated: 160 },
  { date: "2024-05-14", Testing_in_Progress: 448, Reports_Generated: 490 },
  { date: "2024-05-15", Testing_in_Progress: 473, Reports_Generated: 380 },
  { date: "2024-05-16", Testing_in_Progress: 338, Reports_Generated: 400 },
  { date: "2024-05-17", Testing_in_Progress: 499, Reports_Generated: 420 },
  { date: "2024-05-18", Testing_in_Progress: 315, Reports_Generated: 350 },
  { date: "2024-05-19", Testing_in_Progress: 235, Reports_Generated: 180 },
  { date: "2024-05-20", Testing_in_Progress: 177, Reports_Generated: 230 },
  { date: "2024-05-21", Testing_in_Progress: 82, Reports_Generated: 140 },
  { date: "2024-05-22", Testing_in_Progress: 81, Reports_Generated: 120 },
  { date: "2024-05-23", Testing_in_Progress: 252, Reports_Generated: 290 },
  { date: "2024-05-24", Testing_in_Progress: 294, Reports_Generated: 220 },
  { date: "2024-05-25", Testing_in_Progress: 201, Reports_Generated: 250 },
  { date: "2024-05-26", Testing_in_Progress: 213, Reports_Generated: 170 },
  { date: "2024-05-27", Testing_in_Progress: 420, Reports_Generated: 460 },
  { date: "2024-05-28", Testing_in_Progress: 233, Reports_Generated: 190 },
  { date: "2024-05-29", Testing_in_Progress: 78, Reports_Generated: 130 },
  { date: "2024-05-30", Testing_in_Progress: 340, Reports_Generated: 280 },
  { date: "2024-05-31", Testing_in_Progress: 178, Reports_Generated: 230 },
  { date: "2024-06-01", Testing_in_Progress: 178, Reports_Generated: 200 },
  { date: "2024-06-02", Testing_in_Progress: 470, Reports_Generated: 410 },
  { date: "2024-06-03", Testing_in_Progress: 103, Reports_Generated: 160 },
  { date: "2024-06-04", Testing_in_Progress: 439, Reports_Generated: 380 },
  { date: "2024-06-05", Testing_in_Progress: 88, Reports_Generated: 140 },
  { date: "2024-06-06", Testing_in_Progress: 294, Reports_Generated: 250 },
  { date: "2024-06-07", Testing_in_Progress: 323, Reports_Generated: 370 },
  { date: "2024-06-08", Testing_in_Progress: 385, Reports_Generated: 320 },
  { date: "2024-06-09", Testing_in_Progress: 438, Reports_Generated: 480 },
  { date: "2024-06-10", Testing_in_Progress: 155, Reports_Generated: 200 },
  { date: "2024-06-11", Testing_in_Progress: 92, Reports_Generated: 150 },
  { date: "2024-06-12", Testing_in_Progress: 492, Reports_Generated: 420 },
  { date: "2024-06-13", Testing_in_Progress: 81, Reports_Generated: 130 },
  { date: "2024-06-14", Testing_in_Progress: 426, Reports_Generated: 380 },
  { date: "2024-06-15", Testing_in_Progress: 307, Reports_Generated: 350 },
  { date: "2024-06-16", Testing_in_Progress: 371, Reports_Generated: 310 },
  { date: "2024-06-17", Testing_in_Progress: 475, Reports_Generated: 520 },
  { date: "2024-06-18", Testing_in_Progress: 107, Reports_Generated: 170 },
  { date: "2024-06-19", Testing_in_Progress: 341, Reports_Generated: 290 },
  { date: "2024-06-20", Testing_in_Progress: 408, Reports_Generated: 450 },
  { date: "2024-06-21", Testing_in_Progress: 169, Reports_Generated: 210 },
  { date: "2024-06-22", Testing_in_Progress: 317, Reports_Generated: 270 },
  { date: "2024-06-23", Testing_in_Progress: 480, Reports_Generated: 530 },
  { date: "2024-06-24", Testing_in_Progress: 132, Reports_Generated: 180 },
  { date: "2024-06-25", Testing_in_Progress: 141, Reports_Generated: 190 },
  { date: "2024-06-26", Testing_in_Progress: 434, Reports_Generated: 380 },
  { date: "2024-06-27", Testing_in_Progress: 448, Reports_Generated: 490 },
  { date: "2024-06-28", Testing_in_Progress: 149, Reports_Generated: 200 },
  { date: "2024-06-29", Testing_in_Progress: 103, Reports_Generated: 160 },
  { date: "2024-06-30", Testing_in_Progress: 446, Reports_Generated: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  Testing_in_Progress: {
    label: "Testing",
    color: "hsl(var(--chart-1))",
  },
  Reports_Generated: {
    label: "Reports Generated",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BigBarChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Testing_in_Progress")

  const total = React.useMemo(
    () => ({
      Testing_in_Progress: chartData.reduce((acc, curr) => acc + curr.Testing_in_Progress, 0),
      Reports_Generated: chartData.reduce((acc, curr) => acc + curr.Reports_Generated, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Lab Status</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["Testing_in_Progress", "Reports_Generated"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
