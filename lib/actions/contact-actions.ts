"use server"

import { query } from "@/lib/db"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Save the message to the database
    await query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [data.name, data.email, data.subject, data.message],
    )

    // In a real application, you would also send an email here
    // For example, using a service like SendGrid, Mailgun, etc.

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit contact form" }
  }
}
