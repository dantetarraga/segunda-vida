import { useSegments } from 'expo-router'
import { createContext, use, type ReactNode } from 'react'

const STEP_MAP: Record<string, number> = {
  index: 1,
  features: 2,
  join: 3,
}

interface OnboardingContextValue {
  step: number
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function useOnboarding() {
  const context = use(OnboardingContext)

  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }

  return context
}

interface OnboardingProviderProps {
  children: ReactNode
}

export default function OnboardingProvider({ children }: OnboardingProviderProps) {
  const segments = useSegments()
  const currentSegment = segments[segments.length - 1] ?? 'index'
  const step = STEP_MAP[currentSegment] ?? 1

  return <OnboardingContext value={{ step }}>{children}</OnboardingContext>
}
