"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
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
import { TrendingUp } from "lucide-react"

const desktopData = [
  { status: "new", tickets: 14, fill: "var(--color-new)" },
  { status: "intransit", tickets: 16, fill: "var(--color-intransit)" },
  { status: "delivered", tickets: 20, fill: "var(--color-delivered)" },
  { status: "testing", tickets: 15, fill: "var(--color-testing)" },
  { status: "completed", tickets: 7, fill: "var(--color-completed)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  tickets: {
    label: "Tickets",
  },
  mobile: {
    label: "Mobile",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  intransit: {
    label: "In-transit",
    color: "hsl(var(--chart-2))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-3))",
  },
  testing: {
    label: "Testing",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function StepChartComponent() {
  
  const id = "pie-interactive"
  const [activeStatus, setActiveStatus] = React.useState(desktopData[0].status)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.status === activeStatus),
    [activeStatus]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.status), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Ticket Status</CardTitle>
          <CardDescription></CardDescription>
        </div>
        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="tickets"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 5} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 15}
                    innerRadius={outerRadius + 6}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].tickets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Status for the day
        </div>
      </CardFooter>
    </Card>
  )
}
