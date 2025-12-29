"use client"

import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeedbackModal } from "@/components/ui/feedback"
import { FcAreaChart } from "react-icons/fc";
import { useState } from "react"


export function Footer() {
  const [showFeedback, setShowFeedback] = useState(false)
  const links = {
    Product: ["Features", "Pricing", "Demo", "Integrations"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "API", "Support", "Status"],
    Legal: ["Terms", "Privacy", "Security", "Compliance"],
  }

  return (
    <footer id="about" className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <FcAreaChart className="w-6 h-6 sm:w-8 sm:h-8 text-[#0066ff]" />
            <span className="text-base sm:text-xl font-bold">StockCompare</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/chuma-beep/stock-saas-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#0066ff] transition-colors"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://x.com/gingerbarracuda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#0066ff] transition-colors"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <Button
              variant="link"
              className="text-[#0066ff] p-0 h-auto text-sm sm:text-base"
              onClick={() => setShowFeedback(true)}
            >
              Give Feedback
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 mb-6 sm:mb-8 mt-6 sm:mt-8">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{category}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-[#0066ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Made by <span className="text-foreground font-medium">@chuma-beep</span>
          </p>
        </div>
      </div>

      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
    </footer>
  )
}
