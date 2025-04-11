"use server"

import { query } from "@/lib/db"

type Donor = {
  id: number
  firstName: string
  lastName: string
  bloodGroup: string
  city: string
  state: string
  country: string
  lastDonationDate: string | null
  phone: string | null
}

export async function searchDonors(bloodGroup: string, location: string): Promise<Donor[]> {
  try {
    let queryString = `
      SELECT 
        id, 
        first_name as "firstName", 
        last_name as "lastName", 
        blood_group as "bloodGroup", 
        city, 
        state, 
        country, 
        last_donation_date as "lastDonationDate",
        phone
      FROM users
      WHERE is_donor = true
    `

    const params: any[] = []

    if (bloodGroup) {
      params.push(bloodGroup)
      queryString += ` AND blood_group = $${params.length}`
    }

    if (location) {
      const locationParam = `%${location.toLowerCase()}%`
      params.push(locationParam)
      queryString += ` AND (
        LOWER(city) LIKE $${params.length} OR 
        LOWER(state) LIKE $${params.length} OR 
        LOWER(country) LIKE $${params.length}
      )`
    }

    queryString += ` ORDER BY last_donation_date DESC NULLS FIRST`

    // const donors = await query<Donor>(queryString, params)
    const donors = await query(queryString, params) as Donor[]

    return donors
  } catch (error) {
    console.error("Error searching donors:", error)
    throw error
  }
}
