import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Search, CheckCircle, Mail, Users } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroSection />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-red-600" />}
            title="User Registration"
            description="Create your account to join our community of donors and recipients."
            link="/register"
            linkText="Register Now"
          />
          <FeatureCard
            icon={<Search className="h-12 w-12 text-red-600" />}
            title="Find Donors"
            description="Search for compatible donors by blood group and location."
            link="/search"
            linkText="Search Donors"
          />
          <FeatureCard
            icon={<CheckCircle className="h-12 w-12 text-red-600" />}
            title="Check Eligibility"
            description="Find out if you're eligible to donate blood with our quick assessment."
            link="/eligibility"
            linkText="Check Now"
          />
          <FeatureCard
            icon={<HeartPulse className="h-12 w-12 text-red-600" />}
            title="Request Blood"
            description="Create a blood request for yourself or someone in need."
            link="/request"
            linkText="Request Blood"
          />
          <FeatureCard
            icon={<BloodDropIcon className="h-12 w-12 text-red-600" />}
            title="Track Donations"
            description="Keep track of your donation history and impact."
            link="/dashboard"
            linkText="View Dashboard"
          />
          <FeatureCard
            icon={<Mail className="h-12 w-12 text-red-600" />}
            title="Contact Us"
            description="Have questions? Reach out to our team for assistance."
            link="/contact"
            linkText="Get in Touch"
          />
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />

      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of donors today and help save lives with just a few clicks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/register">Become a Donor</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/search">Find a Donor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function BloodDropIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v5.5a3.5 3.5 0 0 0 7 0V2" />
      <path d="M11 2a3 3 0 0 0-3 3v12a5 5 0 0 0 10 0V5a3 3 0 0 0-3-3h-4Z" />
    </svg>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
