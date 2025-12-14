"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StockChart } from "./StockChart"
import { Search, TrendingUp, TrendingDown, Calendar } from "lucide-react"



const POPULAR_STOCKS = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META"]
const DATE_PRESETS = [
  "Last 30 Days",
  "Last Quarter",
  "Christmas Season",
  "Black Friday Week",
  "Earnings Season",
  "Custom Range",
]

interface StockData {
  symbol: string
  name: string
  priceChange: number
  startPrice: number
  endPrice: number
  high: number
  low: number
  volume: string
}

export function Dashboard() {
  const [stock1, setStock1] = useState("AAPL")
  const [stock2, setStock2] = useState("MSFT")
  const [selectedPreset, setSelectedPreset] = useState("Last 30 Days")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleCompare = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 1500)
  }

  const mockData: StockData[] = [
    {
      symbol: stock1,
      name: "Apple Inc.",
      priceChange: 12.4,
      startPrice: 174.23,
      endPrice: 195.71,
      high: 198.45,
      low: 172.1,
      volume: "58.2M",
    },
    {
      symbol: stock2,
      name: "Microsoft Corporation",
      priceChange: 8.7,
      startPrice: 387.15,
      endPrice: 420.55,
      high: 425.3,
      low: 385.0,
      volume: "42.8M",
    },
  ]

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Dashboard</h2>
          <p className="text-xl text-muted-foreground">Compare any two stocks across your chosen time period</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-3 p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Popular Stocks</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {POPULAR_STOCKS.map((symbol) => (
                <Button
                  key={symbol}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                  onClick={() => setStock1(symbol)}
                >
                  {symbol}
                </Button>
              ))}
            </div>

            <h3 className="font-semibold mb-4">Recently Compared</h3>
            <div className="space-y-2">
              {["AAPL vs MSFT", "GOOGL vs META", "TSLA vs RIVN"].map((pair) => (
                <button
                  key={pair}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors"
                >
                  {pair}
                </button>
              ))}
            </div>
          </Card>

          {/* Main comparison area */}
          <div className="lg:col-span-9 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={stock1}
                    onChange={(e) => setStock1(e.target.value.toUpperCase())}
                    placeholder="Search stock symbol..."
                    className="pl-10 h-12 font-mono"
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={stock2}
                    onChange={(e) => setStock2(e.target.value.toUpperCase())}
                    placeholder="Search stock symbol..."
                    className="pl-10 h-12 font-mono"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date Range
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {DATE_PRESETS.map((preset) => (
                    <Button
                      key={preset}
                      variant={selectedPreset === preset ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPreset(preset)}
                      className={selectedPreset === preset ? "bg-[#0066ff] hover:bg-[#0052cc] text-white" : ""}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCompare}
                size="lg"
                className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white h-14 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Analyzing...
                  </span>
                ) : (
                  "Compare Stocks"
                )}
              </Button>
            </Card>

            {/* Results */}
            {showResults && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockData.map((data, index) => (
                    <Card
                      key={data.symbol}
                      className="p-6 bg-card/50 backdrop-blur-sm border-2 hover:border-[#0066ff]/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold font-mono">{data.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{data.name}</p>
                        </div>
                        {data.priceChange >= 0 ? (
                          <TrendingUp className="h-8 w-8 text-green-500" />
                        ) : (
                          <TrendingDown className="h-8 w-8 text-red-500" />
                        )}
                      </div>

                      <div
                        className={`text-4xl font-bold mb-6 ${
                          data.priceChange >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {data.priceChange >= 0 ? "+" : ""}
                        {data.priceChange}%
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Price</span>
                          <span className="font-semibold">${data.startPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Price</span>
                          <span className="font-semibold">${data.endPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">High</span>
                          <span className="font-semibold text-green-500">${data.high}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Low</span>
                          <span className="font-semibold text-red-500">${data.low}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg Volume</span>
                          <span className="font-semibold">{data.volume}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <StockChart />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
