"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, AreaChart, Download } from "lucide-react"
import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartData = [
  { date: "Jan 1", aapl: 174, msft: 387 },
  { date: "Jan 5", aapl: 178, msft: 392 },
  { date: "Jan 10", aapl: 182, msft: 398 },
  { date: "Jan 15", aapl: 179, msft: 395 },
  { date: "Jan 20", aapl: 185, msft: 405 },
  { date: "Jan 25", aapl: 191, msft: 415 },
  { date: "Jan 30", aapl: 196, msft: 421 },
]

const chartConfig = {
  aapl: {
    label: "AAPL",
    color: "#0066ff",
  },
  msft: {
    label: "MSFT",
    color: "#00cc88",
  },
}

export function StockChart() {
  const [chartType, setChartType] = useState<"line" | "area">("area")

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Price Comparison</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
            className={chartType === "line" ? "bg-[#0066ff]" : ""}
          >
            <LineChart className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "area" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("area")}
            className={chartType === "area" ? "bg-[#0066ff]" : ""}
          >
            <AreaChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <RechartsAreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="aapl" stroke="#0066ff" fill="#0066ff" fillOpacity={0.2} strokeWidth={2} />
          <Area type="monotone" dataKey="msft" stroke="#00cc88" fill="#00cc88" fillOpacity={0.2} strokeWidth={2} />
        </RechartsAreaChart>
      </ChartContainer>
    </Card>
  )
}
