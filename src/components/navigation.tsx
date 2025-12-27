"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FeedbackModal } from "@/components/ui/feedback"
import { Moon, Sun, Menu, X } from "lucide-react"
import { FcAreaChart } from "react-icons/fc";


export function Navigation() {
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newDarkState = !isDark
    setIsDark(newDarkState)

    if (newDarkState) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <FcAreaChart className="w-8 h-8 text-[#0066ff]" />

            <span className="text-lg sm:text-xl font-bold">StockCompare</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm hover:text-[#0066ff] transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-sm hover:text-[#0066ff] transition-colors">
              About
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:bg-secondary"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white"
              onClick={() => setShowFeedback(true)}
            >
              Give Feedback
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:bg-secondary"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            <a href="#how-it-works" className="block text-sm hover:text-[#0066ff] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </a>
            <a href="#about" className="block text-sm hover:text-[#0066ff] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <Button
              className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white"
              onClick={() => {
                setShowFeedback(true)
                setMobileMenuOpen(false)
              }}
            >
              Give Feedback
            </Button>
          </div>
        )}
      </div>

      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
    </nav>
  )
}
