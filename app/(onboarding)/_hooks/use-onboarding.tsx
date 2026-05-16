import {
  createContext,
  use,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

interface OnboardingContextValue {
  step: number
  setStep: Dispatch<SetStateAction<number>>
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
  const [step, setStep] = useState(1)

  const value = useMemo(
    () => ({
      step,
      setStep,
    }),
    [step]
  )

  return <OnboardingContext value={value}>{children}</OnboardingContext>
}
