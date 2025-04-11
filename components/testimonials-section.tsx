import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Spark Life Connect helped me find a donor for my father within hours. The platform is incredibly easy to use and efficient."
            name="Sarah Johnson"
            role="Recipient's Daughter"
            avatar="/placeholder.svg?height=40&width=40"
          />
          <TestimonialCard
            quote="Being able to directly help people in need gives me immense satisfaction. This platform makes the process seamless and rewarding."
            name="Michael Chen"
            role="Regular Donor"
            avatar="/placeholder.svg?height=40&width=40"
          />
          <TestimonialCard
            quote="As a medical professional, I recommend Spark Life Connect to all my patients who need blood donations. It's reliable and fast."
            name="Dr. Emily Rodriguez"
            role="Cardiologist"
            avatar="/placeholder.svg?height=40&width=40"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string
  name: string
  role: string
  avatar: string
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-red-600/30 mb-4" />
        <p className="mb-6 text-gray-700">{quote}</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
