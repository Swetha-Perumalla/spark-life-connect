import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-600 fill-red-600" />
              <span className="text-xl font-bold">Spark Life Connect</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Fanning Hope with Every Connection. Connecting blood donors with recipients in need.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link href="/request" className="text-sm text-muted-foreground hover:text-foreground">
                    Request Blood
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="text-sm text-muted-foreground hover:text-foreground">
                    Check Eligibility
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Spark Life Connect. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Facebook
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
