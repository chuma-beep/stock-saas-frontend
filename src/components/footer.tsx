import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FcAreaChart } from "react-icons/fc";


export function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Demo", "Integrations"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "API", "Support", "Status"],
    Legal: ["Terms", "Privacy", "Security", "Compliance"],
  }

  return (
    <footer id="about" className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <FcAreaChart className="w-8 h-8 text-[#0066ff]" />
            <span className="text-xl font-bold">StockCompare</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#0066ff] transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#0066ff] transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <Button variant="link" className="text-[#0066ff] p-0 h-auto">
              Give Feedback
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-[#0066ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Made by <span className="text-foreground font-medium">@chuma-beep</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
