import { router, useSegments } from 'expo-router'
import { createContext, use, type ReactNode } from 'react'

const SLIDE_CONFIG = [
  {
    segment: 'slide-report',
    step: 1,
    next: '/(onboarding)/slide-help',
    label: 'Siguiente',
    replace: false,
  },
  {
    segment: 'slide-help',
    step: 2,
    next: '/(onboarding)/slide-adopt',
    label: 'Siguiente',
    replace: false,
  },
  {
    segment: 'slide-adopt',
    step: 3,
    next: '/(onboarding)/slide-donate',
    label: 'Siguiente',
    replace: false,
  },
  { segment: 'slide-donate', step: 4, next: '/(auth)/', label: 'Crear cuenta', replace: true },
] as const

export const SLIDE_COUNT = 4

interface OnboardingContextValue {
  step: number
  isSlide: boolean
  nextLabel: string
  goNext: () => void
  goToStep: (target: number) => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export const useOnboarding = () => {
  const ctx = use(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}

const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const segments = useSegments()
  const currentSegment = segments[segments.length - 1] ?? 'index'
  const config = SLIDE_CONFIG.find((s) => s.segment === currentSegment) ?? null

  const step = config?.step ?? 0
  const isSlide = config !== null

  const goNext = () => {
    if (!config) return
    if (config.replace) router.replace(config.next as any)
    else router.push(config.next as any)
  }

  const goToStep = (target: number) => {
    const targetConfig = SLIDE_CONFIG.find((s) => s.step === target)
    if (!targetConfig || target >= step) return
    const stepsBack = step - target
    for (let i = 0; i < stepsBack; i++) router.back()
  }

  const nextLabel = config?.label ?? 'Siguiente'

  return (
    <OnboardingContext value={{ step, isSlide, nextLabel, goNext, goToStep }}>
      {children}
    </OnboardingContext>
  )
}

export default OnboardingProvider
