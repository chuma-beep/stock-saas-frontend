"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart as LineChartIcon, AreaChart as AreaChartIcon, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart as RechartsAreaChart, Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import type { StockData } from "../lib/api"

interface StockChartProps {
  data1: StockData[]
  data2: StockData[]
  ticker1: string
  ticker2: string
}

export function StockChart({ data1, data2, ticker1, ticker2 }: StockChartProps) {
  const [mounted, setMounted] = useState(false)
  const [chartType, setChartType] = useState<"line" | "area">("area")


  // Create dynamic chart config based on actual tickers
  const chartConfig = {
    [ticker1.toLowerCase()]: {
      label: ticker1,
      color: "#0066ff",
    },
    [ticker2.toLowerCase()]: {
      label: ticker2,
      color: "#00cc88",
    },
  }

  // Merge data by date
  const chartData = data1.map((item1) => {
    const item2 = data2.find((d) => d.date === item1.date)
    return {
      date: new Date(item1.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      [ticker1.toLowerCase()]: item1.close,
      [ticker2.toLowerCase()]: item2?.close || null,
    }
  })

  const handleExport = () => {
    // Convert data to CSV
    const csv = [
      ['Date', ticker1, ticker2].join(','),
      ...chartData.map(row => 
        [row.date, row[ticker1.toLowerCase()], row[ticker2.toLowerCase()]].join(',')
      )
    ].join('\n')

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${ticker1}-vs-${ticker2}-comparison.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!mounted) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading chart...</p>
        </div>
      </Card>
    )
  }

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
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "area" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("area")}
            className={chartType === "area" ? "bg-[#0066ff]" : ""}
          >
            <AreaChartIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        {chartType === "area" ? (
          <RechartsAreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              className="text-xs" 
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              className="text-xs" 
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={ticker1.toLowerCase()} 
              stroke="#0066ff" 
              fill="#0066ff" 
              fillOpacity={0.2} 
              strokeWidth={2}
              name={ticker1}
            />
            <Area 
              type="monotone" 
              dataKey={ticker2.toLowerCase()} 
              stroke="#00cc88" 
              fill="#00cc88" 
              fillOpacity={0.2} 
              strokeWidth={2}
              name={ticker2}
            />
          </RechartsAreaChart>
        ) : (
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              className="text-xs" 
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              className="text-xs" 
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={ticker1.toLowerCase()} 
              stroke="#0066ff" 
              strokeWidth={2}
              dot={false}
              name={ticker1}
            />
            <Line 
              type="monotone" 
              dataKey={ticker2.toLowerCase()} 
              stroke="#00cc88" 
              strokeWidth={2}
              dot={false}
              name={ticker2}
            />
          </RechartsLineChart>
        )}
      </ChartContainer>
    </Card>
  )
}