"use server"

import { getOnboardingState } from "@lib/data/cookies"
import ProductOnboardingCta from "."

export default async function ProductOnboardingWrapper() {
  const isOnboarding = await getOnboardingState()
  return <ProductOnboardingCta isOnboarding={isOnboarding} />
} 