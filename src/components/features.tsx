import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, BarChart3, Layers, Download, DollarSign } from "lucide-react"

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Real Market Data",
    description: "Access accurate, up-to-date stock market data from reliable sources",
  },
  {
    icon: Calendar,
    title: "100+ Trading Days",
    description: "Analyze comprehensive historical data across extended time periods",
  },
  {
    icon: BarChart3,
    title: "Seasonal Patterns",
    description: "Discover recurring trends during holidays and specific trading periods",
  },
  {
    icon: Layers,
    title: "Multiple Comparisons",
    description: "Compare multiple stocks side-by-side for deeper market insights",
  },
  {
    icon: Download,
    title: "Export Results",
    description: "Download your analysis and share insights with your team",
  },
  {
    icon: DollarSign,
    title: "Zero Cost, Always Free",
    description: "No subscriptions, no hidden fees. Professional tools, completely free",
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Powerful Features</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze stock performance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm hover:border-[#0066ff]/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#0066ff]/10 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#0066ff]" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
