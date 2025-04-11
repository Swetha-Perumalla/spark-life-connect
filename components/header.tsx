"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Find Donors" },
    { href: "/request", label: "Request Blood" },
    { href: "/eligibility", label: "Check Eligibility" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600 fill-red-600" />
            <span className="text-xl font-bold">Spark Life Connect</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600",
                pathname === route.href ? "text-red-600" : "text-foreground/60",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-red-600",
                    pathname === route.href ? "text-red-600" : "text-foreground/60",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button asChild variant="outline">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
