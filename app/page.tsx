import { Hero } from "../src/components/hero"
import { Dashboard } from "../src/components/dashboard"
import { Features } from "../src/components/features"
import { HowItWorks } from "../src/components/how-it-works"
import { Footer } from "../src/components/footer"
import { Navigation } from "../src/components/navigation"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Dashboard />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}
