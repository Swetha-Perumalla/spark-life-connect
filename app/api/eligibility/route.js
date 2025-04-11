import { NextResponse } from "next/server"
import { insert } from "@/lib/db"

export async function POST(request) {
  try {
    const { donorId, lastDonationDate, medicalConditions } = await request.json()

    // Validate input
    if (!donorId) {
      return NextResponse.json({ error: "Donor ID is required" }, { status: 400 })
    }

    // Insert eligibility record
    await insert("INSERT INTO eligibility (donor_id, last_donation_date, medical_conditions) VALUES (?, ?, ?)", [
      donorId,
      lastDonationDate || null,
      medicalConditions || null,
    ])

    // Determine eligibility based on medical conditions
    const isEligible = !medicalConditions || medicalConditions.trim() === ""

    return NextResponse.json({
      success: true,
      eligible: isEligible,
      reason: isEligible ? null : "Medical conditions may affect eligibility",
    })
  } catch (error) {
    console.error("Eligibility check error:", error)
    return NextResponse.json({ error: "An error occurred during eligibility check" }, { status: 500 })
  }
}
