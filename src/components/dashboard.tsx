"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StockChart } from "./StockChart"
import { Search, TrendingUp, TrendingDown, Calendar, AlertCircle, Sparkles, Loader2 } from "lucide-react"
import { api, type ComparisonResponse } from "../lib/api"
import { toast } from "sonner"



const POPULAR_STOCKS = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META"]


const iso = (d: Date) => d.toISOString().slice(0, 10)
const today = new Date()



const DATE_PRESETS = [
  {
    label: "Last 30 Days",
    start: iso(new Date(today.getTime() - 30 * 86400000)),
    end: iso(today),
  },
  {
    label: "Last Quarter",
    start: iso(new Date(today.getTime() - 90 * 86400000)),
    end: iso(today),
  },
  {
    label: "YTD",
    start: iso(new Date(today.getFullYear(), 0, 1)),
    end: iso(today),
  },
]

export function Dashboard() {
  const [stock1, setStock1] = useState("AAPL")
  const [stock2, setStock2] = useState("MSFT")
  const [startDate, setStartDate] = useState("2025-11-01")
  const [endDate, setEndDate] = useState("2025-12-11")
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState<string | null>(null)
  const [comparison, setComparison] = useState<ComparisonResponse | null>(null)
  const [error, setError] = useState<string>("")
  const [aiAnalysis, setAiAnalysis] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [stockPrices, setStockPrices] = useState<Record<string, { price: number; change: number }>>({})

  const handlePresetClick = (preset: typeof DATE_PRESETS[0]) => {
    setSelectedPreset(preset.label)
    setStartDate(preset.start)
    setEndDate(preset.end)
  }

  const handleFetchStock = async (ticker: string) => {
    setIsFetching(ticker)
    setError("")
    try {
      const result = await api.fetchStock(ticker)
      toast.success(`Fetched ${result.records} records for ${ticker}`)
      
      // Fetch current price after successful fetch
      try {
        const priceRes = await fetch(`${process.env.NEXT_API_URL}/current-prices`)
        if (priceRes.ok) {
          const priceData = await priceRes.json()
          const stockPrice = priceData.stocks?.find((p: any) => p.symbol === ticker)
          if (stockPrice) {
            setStockPrices(prev => ({
              ...prev,
              [ticker]: { price: stockPrice.price, change: stockPrice.change }
            }))
          }
        }
      } catch {
        // Silently fail - price display is optional
      }
    } catch (err: any) {
      toast.error(`Failed to fetch ${ticker}: ${err.message}`)
    } finally {
      setIsFetching(null)
    }
  }

  const handleCompare = async () => {
    setIsLoading(true)
    setError("")
    setAiAnalysis("")
    try {
      // Get comparison data
      const result = await api.compareStocks(stock1, stock2, startDate, endDate)
      setComparison(result)
     
      // Get AI analysis
      setIsAnalyzing(true)
      const response = await fetch(`${process.env.NEXT_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comparison: result,
          preset: selectedPreset || 'Custom Range',
        }),
      })
      
      if (!response.ok) {
        throw new Error('AI analysis failed')
      }
      
      const data = await response.json()
      setAiAnalysis(data.analysis)
    } catch (err: any) {
      setError(err.message || "Failed to compare stocks. Make sure you've fetched them first!")
    } finally {
      setIsLoading(false)
      setIsAnalyzing(false)
    }
  }

  const getStockStats = (stockData: ComparisonResponse['comparison'][0]) => {
    if (!stockData.data || stockData.data.length === 0) return null

    const prices = stockData.data.map(d => d.close)
    const volumes = stockData.data.map(d => d.volume)
    
    return {
      startPrice: stockData.data[0].close,
      endPrice: stockData.data[stockData.data.length - 1].close,
      high: Math.max(...prices),
      low: Math.min(...prices),
      avgVolume: (volumes.reduce((a, b) => a + b, 0) / volumes.length / 1000000).toFixed(1) + "M",
    }
  }

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Dashboard</h2>
          <p className="text-xl text-muted-foreground">Compare any two stocks across your chosen time period</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 p-6">
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

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm">Quick Actions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleFetchStock(stock1)}
                  disabled={isFetching === stock1}
                >
                  {isFetching === stock1 ? "Fetching..." : `Fetch ${stock1}`}
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleFetchStock(stock2)}
                  disabled={isFetching === stock2}
                >
                  {isFetching === stock2 ? "Fetching..." : `Fetch ${stock2}`}
                </Button>
              </div>
            </div>
          </div>

          {/* Main comparison area */}
          <div className="lg:col-span-9 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={stock1}
                      onChange={(e) => setStock1(e.target.value.toUpperCase())}
                      placeholder="Search stock symbol..."
                      className="pl-10 h-12 font-mono"
                    />
                  </div>
                  {stockPrices[stock1] && (
                    <p className="mt-1 text-xs text-muted-foreground pl-1">
                      ${stockPrices[stock1].price.toFixed(2)}{" "}
                      <span className={stockPrices[stock1].change >= 0 ? "text-green-500" : "text-red-500"}>
                        ({stockPrices[stock1].change >= 0 ? "+" : ""}{stockPrices[stock1].change.toFixed(2)}%)
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={stock2}
                      onChange={(e) => setStock2(e.target.value.toUpperCase())}
                      placeholder="Search stock symbol..."
                      className="pl-10 h-12 font-mono"
                    />
                  </div>
                  {stockPrices[stock2] && (
                    <p className="mt-1 text-xs text-muted-foreground pl-1">
                      ${stockPrices[stock2].price.toFixed(2)}{" "}
                      <span className={stockPrices[stock2].change >= 0 ? "text-green-500" : "text-red-500"}>
                        ({stockPrices[stock2].change >= 0 ? "+" : ""}{stockPrices[stock2].change.toFixed(2)}%)
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date Range
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
                  {DATE_PRESETS.map((preset) => (
                    <Button
                      key={preset.label}
                      variant={selectedPreset === preset.label ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePresetClick(preset)}
                      className={selectedPreset === preset.label ? "bg-[#0066ff] hover:bg-[#0052cc] text-white" : ""}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Start Date</label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value)
                        setSelectedPreset(null)
                      }}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">End Date</label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value)
                        setSelectedPreset(null)
                      }}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-destructive">{error}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tip: Click &quot;Fetch&quot; for both stocks before comparing
                    </p>
                  </div>
                </div>
              )}

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
            {comparison && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparison.comparison.map((stockData) => {
                    const stats = getStockStats(stockData)
                    if (!stats) return null

                    return (
                      <Card
                        key={stockData.ticker}
                        className="p-6 bg-card/50 backdrop-blur-sm border-2 hover:border-[#0066ff]/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold font-mono">{stockData.ticker}</h3>
                            <p className="text-sm text-muted-foreground">
                              {comparison.start_date} to {comparison.end_date}
                            </p>
                          </div>
                          {stockData.percent_change >= 0 ? (
                            <TrendingUp className="h-8 w-8 text-green-500" />
                          ) : (
                            <TrendingDown className="h-8 w-8 text-red-500" />
                          )}
                        </div>

                        <div
                          className={`text-4xl font-bold mb-6 ${
                            stockData.percent_change >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stockData.percent_change >= 0 ? "+" : ""}
                          {stockData.percent_change.toFixed(2)}%
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Price</span>
                            <span className="font-semibold">${stats.startPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Price</span>
                            <span className="font-semibold">${stats.endPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">High</span>
                            <span className="font-semibold text-green-500">${stats.high.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Low</span>
                            <span className="font-semibold text-red-500">${stats.low.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg Volume</span>
                            <span className="font-semibold">{stats.avgVolume}</span>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                {/* AI Analysis Card */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-[#0066ff]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-[#0066ff]" />
                    <h3 className="text-xl font-bold">AI Analysis</h3>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#0066ff]" />
                      <span className="ml-3 text-muted-foreground">Generating insights...</span>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                        {aiAnalysis}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      AI analysis will appear here after comparison
                    </p>
                  )}
                </Card>

                <StockChart 
                  data1={comparison.comparison[0].data}
                  data2={comparison.comparison[1].data}
                  ticker1={comparison.comparison[0].ticker}
                  ticker2={comparison.comparison[1].ticker}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}