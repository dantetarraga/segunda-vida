import * as SecureStore from 'expo-secure-store'

const KEYS = {
  hasSeenOnboarding: 'sv_has_seen_onboarding',
  keepSession:       'sv_keep_session',
} as const

export const getHasSeenOnboarding = async (): Promise<boolean> => {
  const value = await SecureStore.getItemAsync(KEYS.hasSeenOnboarding)
  return value === 'true'
}

export const markOnboardingDone = async (): Promise<void> => {
  await SecureStore.setItemAsync(KEYS.hasSeenOnboarding, 'true')
}

export const getKeepSession = async (): Promise<boolean> => {
  const value = await SecureStore.getItemAsync(KEYS.keepSession)
  return value !== 'false'
}

export const setKeepSession = async (keep: boolean): Promise<void> => {
  await SecureStore.setItemAsync(KEYS.keepSession, keep ? 'true' : 'false')
}
