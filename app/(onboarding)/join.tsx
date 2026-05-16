import { router } from 'expo-router'

import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1470&auto=format&fit=crop'

const JoinScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={-4}
    title={'Eres lo que le\nfalta a cada caso'}
    description="Únete a los voluntarios que ya están cambiando historias en Arequipa."
    tags={[
      {
        label: '🏠 Listo para adoptar',
        rotate: -3,
        getStyle: (w, h) => ({ top: h * 0.12, left: -(w * 0.32) }),
      },
      {
        label: '❤️ 12 interesados',
        variant: 'primary',
        rotate: 4,
        getStyle: (w, h) => ({ bottom: h * 0.1, right: -(w * 0.2) }),
      },
    ]}
    step={3}
    totalSteps={3}
    onNext={() => router.replace('/(auth)/register')}
    nextLabel="Crear cuenta"
    isLastStep
    onLogin={() => router.replace('/(auth)/login')}
  />
)

export default JoinScreen
