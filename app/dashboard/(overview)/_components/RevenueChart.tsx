"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", revenue: 222 },
  { date: "2024-04-02", revenue: 97 },
  { date: "2024-04-03", revenue: 167 },
  { date: "2024-04-04", revenue: 242 },
  { date: "2024-04-05", revenue: 373 },
  { date: "2024-04-06", revenue: 301 },
  { date: "2024-04-07", revenue: 245 },
  { date: "2024-04-08", revenue: 409 },
  { date: "2024-04-09", revenue: 59 },
  { date: "2024-04-10", revenue: 261 },
  { date: "2024-04-11", revenue: 327 },
  { date: "2024-04-12", revenue: 292 },
  { date: "2024-04-13", revenue: 342 },
  { date: "2024-04-14", revenue: 137 },
  { date: "2024-04-15", revenue: 120 },
  { date: "2024-04-16", revenue: 138 },
  { date: "2024-04-17", revenue: 446 },
  { date: "2024-04-18", revenue: 364 },
  { date: "2024-04-19", revenue: 243 },
  { date: "2024-04-20", revenue: 89 },
  { date: "2024-04-21", revenue: 137 },
  { date: "2024-04-22", revenue: 224 },
  { date: "2024-04-23", revenue: 138 },
  { date: "2024-04-24", revenue: 387 },
  { date: "2024-04-25", revenue: 215 },
  { date: "2024-04-26", revenue: 75 },
  { date: "2024-04-27", revenue: 383 },
  { date: "2024-04-28", revenue: 122 },
  { date: "2024-04-29", revenue: 315 },
  { date: "2024-04-30", revenue: 454 },
  { date: "2024-05-01", revenue: 165 },
  { date: "2024-05-02", revenue: 293 },
  { date: "2024-05-03", revenue: 247 },
  { date: "2024-05-04", revenue: 385 },
  { date: "2024-05-05", revenue: 481 },
  { date: "2024-05-06", revenue: 498 },
  { date: "2024-05-07", revenue: 388 },
  { date: "2024-05-08", revenue: 149 },
  { date: "2024-05-09", revenue: 227 },
  { date: "2024-05-10", revenue: 293 },
  { date: "2024-05-11", revenue: 335 },
  { date: "2024-05-12", revenue: 197 },
  { date: "2024-05-13", revenue: 197 },
  { date: "2024-05-14", revenue: 448 },
  { date: "2024-05-15", revenue: 473 },
  { date: "2024-05-16", revenue: 338 },
  { date: "2024-05-17", revenue: 499 },
  { date: "2024-05-18", revenue: 315 },
  { date: "2024-05-19", revenue: 235 },
  { date: "2024-05-20", revenue: 177 },
  { date: "2024-05-21", revenue: 82 },
  { date: "2024-05-22", revenue: 81 },
  { date: "2024-05-23", revenue: 252 },
  { date: "2024-05-24", revenue: 294 },
  { date: "2024-05-25", revenue: 201 },
  { date: "2024-05-26", revenue: 213 },
  { date: "2024-05-27", revenue: 420 },
  { date: "2024-05-28", revenue: 233 },
  { date: "2024-05-29", revenue: 78 },
  { date: "2024-05-30", revenue: 340 },
  { date: "2024-05-31", revenue: 178 },
  { date: "2024-06-01", revenue: 178 },
  { date: "2024-06-02", revenue: 470 },
  { date: "2024-06-03", revenue: 103 },
  { date: "2024-06-04", revenue: 439 },
  { date: "2024-06-05", revenue: 88 },
  { date: "2024-06-06", revenue: 294 },
  { date: "2024-06-07", revenue: 323 },
  { date: "2024-06-08", revenue: 385 },
  { date: "2024-06-09", revenue: 438 },
  { date: "2024-06-10", revenue: 155 },
  { date: "2024-06-11", revenue: 92 },
  { date: "2024-06-12", revenue: 492 },
  { date: "2024-06-13", revenue: 81 },
  { date: "2024-06-14", revenue: 426 },
  { date: "2024-06-15", revenue: 307 },
  { date: "2024-06-16", revenue: 371 },
  { date: "2024-06-17", revenue: 475 },
  { date: "2024-06-18", revenue: 107 },
  { date: "2024-06-19", revenue: 341 },
  { date: "2024-06-20", revenue: 408 },
  { date: "2024-06-21", revenue: 169 },
  { date: "2024-06-22", revenue: 317 },
  { date: "2024-06-23", revenue: 480 },
  { date: "2024-06-24", revenue: 132 },
  { date: "2024-06-25", revenue: 141 },
  { date: "2024-06-26", revenue: 434 },
  { date: "2024-06-27", revenue: 448 },
  { date: "2024-06-28", revenue: 149 },
  { date: "2024-06-29", revenue: 103 },
  { date: "2024-06-30", revenue: 446 },
];

const chartConfig = {
  views: {
    label: "Revenue",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("revenue");
  const [timeRange, setTimeRange] = React.useState("monthly");

  const filterData = React.useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDay() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    return chartData.filter((item) => {
      const itemDate = new Date(item.date);
      if (timeRange === "weekly") {
        return itemDate >= oneWeekAgo && itemDate <= now;
      } else {
        return itemDate >= oneMonthAgo && itemDate <= now;
      }
    });
  }, [timeRange]);

  const total = React.useMemo(
    () => ({
      revenue: filterData.reduce((acc, curr) => acc + curr.revenue, 0),
    }),
    [filterData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>
            Showing total Revenue for the last months
          </CardDescription>
        </div>
        <div className="flex items-center bg-muted/50">
          <Select
            onValueChange={(value) => setTimeRange(value)}
            defaultValue="monthly"
          >
            <SelectTrigger className="w-48 bg-white">
              <SelectValue
                className="w-48 bg-white"
                placeholder="Select time range"
              />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          {["revenue"].map((key) => {
            const chart = key as keyof typeof chartConfig;
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
            );
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
            data={filterData}
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
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              dataKey="revenue"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
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
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
