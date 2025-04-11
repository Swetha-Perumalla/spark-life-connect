import { NextResponse } from "next/server"
import { insert, queryOne } from "@/lib/db"

export async function POST(request) {
  try {
    const { name, email, phone, bloodGroup, location } = await request.json()

    // Validate input
    if (!name || !email || !phone || !bloodGroup || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if donor already exists with this phone
    const existingDonor = await queryOne("SELECT id FROM donors WHERE phone = ?", [phone])

    if (existingDonor) {
      return NextResponse.json({ error: "Phone number already registered" }, { status: 409 })
    }

    // Insert donor
    const donorId = await insert(
      "INSERT INTO donors (name, email, phone, blood_group, location) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, bloodGroup, location],
    )

    return NextResponse.json({ success: true, donorId }, { status: 201 })
  } catch (error) {
    console.error("Donor registration error:", error)
    return NextResponse.json({ error: "An error occurred during donor registration" }, { status: 500 })
  }
}
