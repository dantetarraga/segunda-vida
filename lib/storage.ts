import * as SecureStore from 'expo-secure-store'

const KEYS = {
  hasSeenOnboarding: 'sv_has_seen_onboarding',
} as const

// ─── Onboarding ───────────────────────────────────────────────────────────────

export async function getHasSeenOnboarding(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(KEYS.hasSeenOnboarding)
  return value === 'true'
}

export async function markOnboardingDone(): Promise<void> {
  await SecureStore.setItemAsync(KEYS.hasSeenOnboarding, 'true')
}
