import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function DonorSuccessPage() {
  return (
    <div className="container max-w-md mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-center">Registration Successful!</CardTitle>
          <CardDescription className="text-center">Thank you for registering as a blood donor</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Your information has been added to our donor database. You may be contacted when someone in your area needs
            your blood type.
          </p>
          <p className="text-sm text-muted-foreground">
            Remember to keep your eligibility status updated for accurate matching.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/eligibility">Check Eligibility</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
