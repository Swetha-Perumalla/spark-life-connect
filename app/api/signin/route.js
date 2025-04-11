import { NextResponse } from "next/server"
import { queryOne } from "@/lib/db"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await queryOne("SELECT id, name, password FROM users WHERE email = ?", [email])

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Set session cookie
    const sessionId = uuidv4()
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // In a real app, you would store the session in a database
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
