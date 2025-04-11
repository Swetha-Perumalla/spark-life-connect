"use server"

import { query } from "@/lib/db"

type EligibilityCheckParams = {
  age: number
  weight: number
  gender: string
  lastDonation: Date | null
  hasMedicalCondition: boolean
  isTakingMedication: boolean
  hasRecentSurgery: boolean
  hasRecentTattoo: boolean
  isPregnant: boolean
}

export async function checkEligibility(params: EligibilityCheckParams) {
  // Check age
  if (params.age < 18 || params.age > 65) {
    return {
      eligible: false,
      reason: "You must be between 18 and 65 years old to donate blood.",
    }
  }

  // Check weight
  if (params.weight < 50) {
    return {
      eligible: false,
      reason: "You must weigh at least 50kg to donate blood.",
    }
  }

  // Check medical conditions
  if (params.hasMedicalCondition) {
    return {
      eligible: false,
      reason:
        "Having certain medical conditions may disqualify you from donating blood. Please consult with a healthcare professional.",
    }
  }

  // Check medications
  if (params.isTakingMedication) {
    return {
      eligible: false,
      reason: "Some medications may disqualify you from donating blood. Please consult with a healthcare professional.",
    }
  }

  // Check recent surgery
  if (params.hasRecentSurgery) {
    return {
      eligible: false,
      reason: "You must wait at least 6 months after surgery before donating blood.",
    }
  }

  // Check recent tattoo or piercing
  if (params.hasRecentTattoo) {
    return {
      eligible: false,
      reason: "You must wait at least 4 months after getting a tattoo or piercing before donating blood.",
    }
  }

  // Check pregnancy
  if (params.isPregnant) {
    return {
      eligible: false,
      reason: "You cannot donate blood while pregnant or within 6 months after giving birth.",
    }
  }

  // Check last donation date
  if (params.lastDonation) {
    const today = new Date()
    const daysSinceLastDonation = Math.floor((today.getTime() - params.lastDonation.getTime()) / (1000 * 60 * 60 * 24))

    const requiredDays = params.gender === "female" ? 112 : 84 // 16 weeks for females, 12 weeks for males

    if (daysSinceLastDonation < requiredDays) {
      return {
        eligible: false,
        reason: `You must wait at least ${params.gender === "female" ? "16 weeks" : "12 weeks"} between blood donations. You can donate again in ${requiredDays - daysSinceLastDonation} days.`,
      }
    }
  }

  // If all checks pass, the person is eligible
  return {
    eligible: true,
  }
}

export async function saveEligibilityCheck(userId: number, isEligible: boolean, reason?: string) {
  try {
    await query(
      `INSERT INTO eligibility_checks (user_id, is_eligible, reason)
       VALUES ($1, $2, $3)`,
      [userId, isEligible, reason || null],
    )

    return { success: true }
  } catch (error) {
    console.error("Error saving eligibility check:", error)
    return { success: false, error: "Failed to save eligibility check" }
  }
}
