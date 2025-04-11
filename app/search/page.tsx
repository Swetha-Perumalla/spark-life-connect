"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, SearchIcon, Loader2 } from "lucide-react"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

type Donor = {
  id: number
  name: string
  email: string
  phone: string
  blood_group: string
  location: string
}

export default function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState<string>("All")
  const [location, setLocation] = useState<string>("")
  const [isSearching, setIsSearching] = useState(false)
  const [donors, setDonors] = useState<Donor[]>([])
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    setIsSearching(true)

    try {
      const params = new URLSearchParams()
      if (bloodGroup !== "All") {
        params.append("bloodGroup", bloodGroup)
      }
      if (location) {
        params.append("location", location)
      }

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()

      setDonors(data.donors || [])
      setSearched(true)
    } catch (error) {
      console.error("Error searching donors:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Blood Donors</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="blood-group">Blood Group</Label>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger id="blood-group" className="mt-2">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., New York"
                className="mt-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full bg-red-600 hover:bg-red-700" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search Donors
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {donors.length} {donors.length === 1 ? "Donor" : "Donors"} Found
            </h2>
          </div>

          {donors.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No donors found matching your criteria.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <Card key={donor.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={donor.name} />
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{donor.name}</h3>
                          <Badge className="bg-red-600">{donor.blood_group}</Badge>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{donor.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{donor.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full bg-red-600 hover:bg-red-700">Contact Donor</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
