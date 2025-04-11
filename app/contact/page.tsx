"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setError(result.error || "Failed to send message. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {submitted ? (
            <Alert className="bg-green-50 border-green-200 mb-6">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-600">Message Sent!</AlertTitle>
              <AlertDescription className="text-green-600">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </AlertDescription>
            </Alert>
          ) : null}

          {error && (
            <Alert className="bg-red-50 border-red-200 mb-6">
              <AlertTitle className="text-red-600">Error</AlertTitle>
              <AlertDescription className="text-red-600">{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your inquiry..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">ssperumalla7@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 Blood Donor Lane
                    <br />
                    Suite 456
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Hours of Operation</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Monday - Friday</div>
                  <div>9:00 AM - 5:00 PM</div>
                  <div>Saturday</div>
                  <div>10:00 AM - 2:00 PM</div>
                  <div>Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
