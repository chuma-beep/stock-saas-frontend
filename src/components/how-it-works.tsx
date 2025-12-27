import { Card } from "@/components/ui/card"
import { Search, Calendar, BarChart3 } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    title: "Select Stocks",
    description: "Search and choose the stocks you want to compare",
  },
  {
    icon: Calendar,
    title: "Choose Time Period",
    description: "Pick from preset periods or set a custom date range",
  },
  {
    icon: BarChart3,
    title: "Analyze Results",
    description: "View detailed comparisons with charts and metrics",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">How It Works</h2>
          <p className="text-base sm:text-xl text-muted-foreground">Three simple steps to compare stocks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm hover:border-[#0066ff]/50 transition-all duration-300 text-center h-full">
                  <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center font-bold text-base sm:text-xl">
                    {index + 1}
                  </div>

                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-[#0066ff]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 mt-4">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#0066ff]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                </Card>

                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#0066ff] to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
