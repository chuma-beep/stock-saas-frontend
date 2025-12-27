"use client"

import { Github, Twitter, Mail, Heart } from "lucide-react"
import { FcAreaChart } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const TECH_STACK = [
  {
    name: "Next.js 16",
    description: "Modern React framework for the frontend",
    color: "bg-white"
  },
  {
    name: "Go (Golang)",
    description: "High-performance backend API",
    color: "bg-cyan-500"
  },
  {
    name: "Groq AI",
    description: "Fast Llama 3.3-70B model for insights",
    color: "bg-orange-500"
  },
]

const ABOUT_HIGHLIGHTS = [
  {
    title: "Mission-Driven",
    description: "Democratize stock analysis tools that were once only available to institutional investors",
  },
  {
    title: "Open Source",
    description: "Transparent codebase built with modern technologies and best practices",
  },
  {
    title: "Data Accuracy",
    description: "Real-time stock data from Alpha Vantage API with historical accuracy",
  },
]

export function About() {
  return (
    <section id="about-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <FcAreaChart className="w-12 h-12 sm:w-16 sm:h-16 text-[#0066ff]" />
            <span className="text-2xl sm:text-3xl font-bold">StockCompare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            About StockCompare
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by developers, for investors. Making professional stock analysis accessible to everyone.
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our Mission</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              StockCompare was born from a simple observation: professional stock analysis tools are expensive,
              complex, and out of reach for retail investors.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We believe everyone deserves access to the same quality of market analysis, regardless of
              portfolio size. That's why we built a free, intuitive platform that combines real market data
              with AI-powered insights.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How It Works</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Our platform fetches historical stock data from reliable sources, stores it in our database,
              and presents it in an interactive dashboard.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              When you compare stocks, our AI analyzes the data, identifies patterns, explains trends,
              and highlights risks - all in simple, actionable language.
            </p>
          </Card>
        </div>

        {/* Highlights */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Why Choose Us
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {ABOUT_HIGHLIGHTS.map((highlight, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm hover:border-[#0066ff]/50 transition-all"
              >
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{highlight.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Built With Modern Technology
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TECH_STACK.map((tech, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm text-center hover:border-[#0066ff]/50 transition-all"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full ${tech.color} flex items-center justify-center`}>
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{tech.name}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Creator & Contact */}
        <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 fill-red-500" />
            <h3 className="text-xl sm:text-2xl font-bold">Built with care</h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            StockCompare is developed and maintained by{" "}
            <span className="font-semibold text-foreground">@chuma-beep</span>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.open("https://github.com/chuma-beep/stock-saas", "_blank")}
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              View on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.open("https://twitter.com/wisdomsglow", "_blank")}
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              Follow on Twitter
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
