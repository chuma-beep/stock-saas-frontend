"use client"

import { useEffect, useState } from "react"

interface StockPrice {
  symbol: string
  price: number
  change: number
}

const FALLBACK_STOCKS: StockPrice[] = [
  { symbol: "AAPL", price: 195.71, change: 2.3 },
  { symbol: "MSFT", price: 420.55, change: -0.8 },
  { symbol: "GOOGL", price: 178.23, change: 1.5 },
  { symbol: "TSLA", price: 248.48, change: -3.2 },
  { symbol: "AMZN", price: 178.25, change: 0.9 },
]

export function Hero() {
  const [stocks, setStocks] = useState<StockPrice[]>(FALLBACK_STOCKS)
  const [tickerIndex, setTickerIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    // Fetch real stock prices
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://localhost:8080/current-prices')
        if (!response.ok) throw new Error('Failed to fetch')
        
        const data = await response.json()
        if (data.stocks && data.stocks.length > 0) {
          setStocks(data.stocks)
          setIsLive(true)
        }
      } catch (error) {
        console.log('Using fallback prices:', error)
        setIsLive(false)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
    
    // Refresh every 60 seconds
    const refreshInterval = setInterval(fetchPrices, 60000)
    
    return () => clearInterval(refreshInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % stocks.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stocks.length])

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background ticker */}
      <div className="absolute inset-0 opacity-5 pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-[#0066ff] opacity-20 font-mono text-sm"
              style={{
                top: `${20 + i * 15}%`,
                left: `${-10 + i * 20}%`,
                animation: `ticker ${10 + i * 2}s linear infinite`,
              }}
            >
              {stocks.map((s) => `${s.symbol} `).join("")}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            Compare Stock Performance{" "}
            <span className="text-[#0066ff]">Across Any Time Period</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground text-pretty">
            Discover seasonal patterns and make data-driven decisions
          </p>
        </div>

        {/* Stock ticker display */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
          {loading && (
            <div className="text-muted-foreground animate-pulse">
              Loading live prices...
            </div>
          )}
          {!loading && stocks.map((stock, index) => (
            <div
              key={stock.symbol}
              className={`flex items-center gap-1 sm:gap-2 transition-all duration-500 ${
                index === tickerIndex ? "opacity-100 scale-110" : "opacity-40 scale-100"
              }`}
            >
              <span className="font-mono font-bold text-xs sm:text-sm">{stock.symbol}</span>
              <span className="text-muted-foreground text-xs sm:text-sm">${stock.price.toFixed(2)}</span>
              <span className={`${stock.change >= 0 ? "text-green-500" : "text-red-500"} text-xs sm:text-sm`}>
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

        {/* Status indicator */}
        {!loading && (
          <div className="text-center mt-3 sm:mt-4">
            {isLive ? (
              <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live data from our database
              </p>
            ) : (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Sample data • Fetch stocks to see live prices
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}