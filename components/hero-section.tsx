import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-red-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Fanning Hope with Every Connection
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Join our community of blood donors and help save lives. Every donation counts, every connection matters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Link href="/register">Become a Donor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-red-700">
                <Link href="/search">Find a Donor</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-8">
                  <BloodTypeCard type="A+" />
                  <BloodTypeCard type="B+" />
                  <BloodTypeCard type="AB+" />
                </div>
                <div className="flex justify-center gap-8">
                  <BloodTypeCard type="O+" />
                  <BloodTypeCard type="O-" highlight />
                  <BloodTypeCard type="A-" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

function BloodTypeCard({ type, highlight = false }: { type: string; highlight?: boolean }) {
  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${highlight ? "bg-white text-red-600" : "bg-red-700 text-white border border-white/30"}`}
    >
      {type}
    </div>
  )
}
