"use server"

import { cookies } from "next/headers"
import { query, queryOne } from "@/lib/db"
import { hashPassword, verifyPassword } from "@/lib/auth-utils"

type RegisterUserParams = {
  email: string
  password: string
  firstName: string
  lastName: string
  bloodGroup: string
  phone: string
  city: string
  state: string
  country: string
  isDonor: boolean
}

export async function registerUser(params: RegisterUserParams) {
  try {
    // Check if user already exists
    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [params.email])

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    // Hash the password
    const hashedPassword = await hashPassword(params.password)

    // Insert the new user
    const result = await query(
      `INSERT INTO users (
        email, password, first_name, last_name, blood_group, 
        phone, city, state, country, is_donor
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        params.email,
        hashedPassword,
        params.firstName,
        params.lastName,
        params.bloodGroup,
        params.phone,
        params.city,
        params.state,
        params.country,
        params.isDonor,
      ],
    )

    if (result && result.length > 0) {
      return { success: true, userId: result[0].id }
    } else {
      return { success: false, error: "Failed to create user" }
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An error occurred during registration" }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await queryOne("SELECT id, password FROM users WHERE email = ?", [email])

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" }
    }

    const sessionId = crypto.randomUUID()

    const cookieStore = await cookies()
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()

  cookieStore.delete("session_id")
  return { success: true }
}

