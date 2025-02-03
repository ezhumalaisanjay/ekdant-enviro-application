"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BigAreaChartComponent() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const chartData = [
    { date: "2024-04-01", walkin: 222, email: 150, call: 50 },
    { date: "2024-04-02", walkin: 97, email: 180, call: 50 },
    { date: "2024-04-03", walkin: 167, email: 120, call: 50 },
    { date: "2024-04-04", walkin: 242, email: 260, call: 50 },
    { date: "2024-04-05", walkin: 373, email: 290, call: 50 },
    { date: "2024-04-06", walkin: 301, email: 340, call: 50 },
    { date: "2024-04-07", walkin: 245, email: 180, call: 50 },
    { date: "2024-04-08", walkin: 409, email: 320, call: 50 },
    { date: "2024-04-09", walkin: 59, email: 110, call: 50 },
    { date: "2024-04-10", walkin: 261, email: 190, call: 50 },
    { date: "2024-04-11", walkin: 327, email: 350, call: 50 },
    { date: "2024-04-12", walkin: 292, email: 210, call: 50 },
    { date: "2024-04-13", walkin: 342, email: 380, call: 50 },
    { date: "2024-04-14", walkin: 137, email: 220, call: 50 },
    { date: "2024-04-15", walkin: 120, email: 170, call: 50 },
    { date: "2024-04-16", walkin: 138, email: 190, call: 50 },
    { date: "2024-04-17", walkin: 446, email: 360, call: 50 },
    { date: "2024-04-18", walkin: 364, email: 410, call: 50 },
    { date: "2024-04-19", walkin: 243, email: 180, call: 50 },
    { date: "2024-04-20", walkin: 89, email: 150, call: 50 },
    { date: "2024-04-21", walkin: 137, email: 200, call: 50 },
    { date: "2024-04-22", walkin: 224, email: 170, call: 50 },
    { date: "2024-04-23", walkin: 138, email: 230, call: 50 },
    { date: "2024-04-24", walkin: 387, email: 290, call: 50 },
    { date: "2024-04-25", walkin: 215, email: 250, call: 50 },
    { date: "2024-04-26", walkin: 75, email: 130, call: 50 },
    { date: "2024-04-27", walkin: 383, email: 420, call: 50 },
    { date: "2024-04-28", walkin: 122, email: 180, call: 50 },
    { date: "2024-04-29", walkin: 315, email: 240, call: 50 },
    { date: "2024-04-30", walkin: 454, email: 380, call: 50 },
    { date: "2024-05-01", walkin: 165, email: 220, call: 50 },
    { date: "2024-05-02", walkin: 293, email: 310, call: 50 },
    { date: "2024-05-03", walkin: 247, email: 190, call: 50 },
    { date: "2024-05-04", walkin: 385, email: 420, call: 50 },
    { date: "2024-05-05", walkin: 481, email: 390, call: 50 },
    { date: "2024-05-06", walkin: 498, email: 520, call: 50 },
    { date: "2024-05-07", walkin: 388, email: 300, call: 50 },
    { date: "2024-05-08", walkin: 149, email: 210, call: 50 },
    { date: "2024-05-09", walkin: 227, email: 180, call: 50 },
    { date: "2024-05-10", walkin: 293, email: 330, call: 50 },
    { date: "2024-05-11", walkin: 335, email: 270, call: 50 },
    { date: "2024-05-12", walkin: 197, email: 240, call: 50 },
    { date: "2024-05-13", walkin: 197, email: 160, call: 50 },
    { date: "2024-05-14", walkin: 448, email: 490, call: 50 },
    { date: "2024-05-15", walkin: 473, email: 380, call: 50 },
    { date: "2024-05-16", walkin: 338, email: 400, call: 50 },
    { date: "2024-05-17", walkin: 499, email: 420, call: 50 },
    { date: "2024-05-18", walkin: 315, email: 350, call: 50 },
    { date: "2024-05-19", walkin: 235, email: 180, call: 50 },
    { date: "2024-05-20", walkin: 177, email: 230, call: 50 },
    { date: "2024-05-21", walkin: 82, email: 140, call: 50 },
    { date: "2024-05-22", walkin: 81, email: 120, call: 50 },
    { date: "2024-05-23", walkin: 252, email: 290, call: 50 },
    { date: "2024-05-24", walkin: 294, email: 220, call: 50 },
    { date: "2024-05-25", walkin: 201, email: 250, call: 50 },
    { date: "2024-05-26", walkin: 213, email: 170, call: 50 },
    { date: "2024-05-27", walkin: 420, email: 460, call: 50 },
    { date: "2024-05-28", walkin: 233, email: 190, call: 50 },
    { date: "2024-05-29", walkin: 78, email: 130, call: 50 },
    { date: "2024-05-30", walkin: 340, email: 280, call: 50 },
    { date: "2024-05-31", walkin: 178, email: 230, call: 50 },
    { date: "2024-06-01", walkin: 178, email: 200, call: 50 },
    { date: "2024-06-02", walkin: 470, email: 410, call: 50 },
    { date: "2024-06-03", walkin: 103, email: 160, call: 50 },
    { date: "2024-06-04", walkin: 439, email: 380, call: 50 },
    { date: "2024-06-05", walkin: 88, email: 140, call: 50 },
    { date: "2024-06-06", walkin: 294, email: 250, call: 50 },
    { date: "2024-06-07", walkin: 323, email: 370, call: 50 },
    { date: "2024-06-08", walkin: 385, email: 320, call: 50 },
    { date: "2024-06-09", walkin: 438, email: 480, call: 50 },
    { date: "2024-06-10", walkin: 155, email: 200, call: 50 },
    { date: "2024-06-11", walkin: 92, email: 150, call: 50 },
    { date: "2024-06-12", walkin: 492, email: 420, call: 50 },
    { date: "2024-06-13", walkin: 81, email: 130, call: 50 },
    { date: "2024-06-14", walkin: 426, email: 380, call: 50 },
    { date: "2024-06-15", walkin: 307, email: 350, call: 350 },
    { date: "2024-06-16", walkin: 371, email: 310, call: 50 },
    { date: "2024-06-17", walkin: 475, email: 520, call: 50 },
    { date: "2024-06-18", walkin: 107, email: 170, call: 50 },
    { date: "2024-06-19", walkin: 341, email: 290, call: 50 },
    { date: "2024-06-20", walkin: 408, email: 450, call: 50 },
    { date: "2024-06-21", walkin: 169, email: 210, call: 50 },
    { date: "2024-06-22", walkin: 317, email: 270, call: 50 },
    { date: "2024-06-23", walkin: 480, email: 530, call: 100 },
    { date: "2024-06-24", walkin: 132, email: 180, call: 50 },
    { date: "2024-06-25", walkin: 141, email: 190, call: 50 },
    { date: "2024-06-26", walkin: 434, email: 380, call: 50 },
    { date: "2024-06-27", walkin: 448, email: 490, call: 50 },
    { date: "2024-06-28", walkin: 149, email: 200, call: 50 },
    { date: "2024-06-29", walkin: 103, email: 160, call: 50 },
    { date: "2024-06-30", walkin: 446, email: 400, call: 50 },
  ]
  
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    walkin: {
      label: "Walkin",
      color: "hsl(var(--chart-1))",
    },
    email: {
      label: "Email",
      color: "hsl(var(--chart-2))",
    },
    call: {
      label: "Call",
      color: "hsl(var(--chart-3))"
    }
  } satisfies ChartConfig
  

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-walkin)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-walkin)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCall" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-call)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-call)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="email"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-email)"
              stackId="a"
            />
            <Area
              dataKey="walkin"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-walkin)"
              stackId="a"
            />
            <Area
              dataKey="call"
              type="natural"
              fill="url(#fillCall)"
              stroke="var(--color-call)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
