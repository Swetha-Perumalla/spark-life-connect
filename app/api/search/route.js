import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const bloodGroup = searchParams.get("bloodGroup")
    const location = searchParams.get("location")

    let sql = "SELECT * FROM donors WHERE 1=1"
    const params = []

    if (bloodGroup && bloodGroup !== "All") {
      sql += " AND blood_group = ?"
      params.push(bloodGroup)
    }

    if (location) {
      sql += " AND location LIKE ?"
      params.push(`%${location}%`)
    }

    const donors = await query(sql, params)

    return NextResponse.json({ donors })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "An error occurred during search" }, { status: 500 })
  }
}
