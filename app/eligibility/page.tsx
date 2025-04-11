"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

const eligibilitySchema = z.object({
  donorId: z.string().optional(),
  lastDonationDate: z.string().optional(),
  hasMedicalCondition: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  medicalConditions: z.string().optional(),
  age: z.string().refine(
    (val) => {
      const age = Number.parseInt(val, 10)
      return !isNaN(age) && age >= 0
    },
    { message: "Please enter a valid age" },
  ),
  weight: z.string().refine(
    (val) => {
      const weight = Number.parseInt(val, 10)
      return !isNaN(weight) && weight >= 0
    },
    { message: "Please enter a valid weight" },
  ),
})

type EligibilityFormValues = z.infer<typeof eligibilitySchema>

export default function EligibilityPage() {
  const [result, setResult] = useState<{ eligible: boolean; reason?: string } | null>(null)

  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      donorId: "",
      lastDonationDate: "",
      hasMedicalCondition: "no",
      medicalConditions: "",
      age: "",
      weight: "",
    },
  })

  const watchHasMedicalCondition = form.watch("hasMedicalCondition")

  async function onSubmit(data: EligibilityFormValues) {
    // Basic eligibility checks
    const age = Number.parseInt(data.age, 10)
    const weight = Number.parseInt(data.weight, 10)

    if (age < 18 || age > 65) {
      setResult({
        eligible: false,
        reason: "You must be between 18 and 65 years old to donate blood.",
      })
      return
    }

    if (weight < 50) {
      setResult({
        eligible: false,
        reason: "You must weigh at least 50kg to donate blood.",
      })
      return
    }

    if (data.hasMedicalCondition === "yes" && data.medicalConditions) {
      setResult({
        eligible: false,
        reason: "Your medical conditions may affect your eligibility. Please consult with a healthcare professional.",
      })
      return
    }

    // If all checks pass
    setResult({
      eligible: true,
      reason: "Based on your responses, you appear to be eligible to donate blood.",
    })

    // If this was a registered donor, we would save the eligibility check
    // to the database here
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Blood Donation Eligibility Check</h1>
      <p className="text-muted-foreground mb-8">
        Use this form to check if you're eligible to donate blood. This is a preliminary check and the final decision
        will be made by medical professionals at the donation center.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Eligibility Questionnaire</CardTitle>
          <CardDescription>Please answer all questions truthfully for an accurate assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (years)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>You must be between 18-65 years old to donate</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>You must weigh at least 50kg to donate</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lastDonationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Last Donation (if applicable)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Men should wait 12 weeks and women 16 weeks between donations</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasMedicalCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have any chronic medical conditions?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchHasMedicalCondition === "yes" && (
                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please describe your medical conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any chronic conditions, medications, or recent surgeries"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Check Eligibility
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <div id="eligibility-result" className="mt-8">
          <Alert className={result.eligible ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
            {result.eligible ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <AlertTitle className={result.eligible ? "text-green-600" : "text-red-600"}>
              {result.eligible
                ? "You are eligible to donate blood!"
                : "You are not eligible to donate blood at this time"}
            </AlertTitle>
            <AlertDescription className={result.eligible ? "text-green-600" : "text-red-600"}>
              {result.reason}
            </AlertDescription>
          </Alert>

          <div className="mt-6 text-center">
            {result.eligible ? (
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/donor-register">Register as a Donor</Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/">Return to Home</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
