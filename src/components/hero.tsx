"use client"

import { useEffect, useState } from "react"

const SAMPLE_STOCKS = [
  { symbol: "AAPL", price: 195.71, change: 2.3 },
  { symbol: "MSFT", price: 420.55, change: -0.8 },
  { symbol: "GOOGL", price: 178.23, change: 1.5 },
  { symbol: "TSLA", price: 248.48, change: -3.2 },
  { symbol: "AMZN", price: 178.25, change: 0.9 },
]

export function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % SAMPLE_STOCKS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
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
              {SAMPLE_STOCKS.map((s) => `${s.symbol} `).join("")}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Compare Stock Performance <span className="text-[#0066ff]">Across Any Time Period</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
            Discover seasonal patterns and make data-driven decisions
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {SAMPLE_STOCKS.map((stock, index) => (
            <div
              key={stock.symbol}
              className={`flex items-center gap-2 transition-all duration-500 ${
                index === tickerIndex ? "opacity-100 scale-110" : "opacity-40 scale-100"
              }`}
            >
              <span className="font-mono font-bold">{stock.symbol}</span>
              <span className="text-muted-foreground">${stock.price}</span>
              <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                {stock.change >= 0 ? "+" : ""}
                {stock.change}%
              </span>
            </div>
          ))}
        </div>
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
