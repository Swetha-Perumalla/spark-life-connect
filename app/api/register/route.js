import { NextResponse } from "next/server"
import { insert, queryOne } from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [email])

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    const userId = await insert("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ])

    return NextResponse.json({ success: true, userId }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
