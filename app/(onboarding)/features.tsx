import { router } from 'expo-router'

import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?q=80&w=1469&auto=format&fit=crop'

const FeaturesScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={4}
    title={'Sube tu caso en\nmenos de 30 segundos'}
    description="Foto, ubicación y tipo de animal. El mapa lo muestra al instante para que alguien pueda ir."
    tags={[
      {
        label: '🐾 Miraflores, Lima',
        rotate: -2,
        getStyle: (w, h) => ({ top: h * 0.1, left: -(w * 0.28) }),
      },
      {
        label: '📍 Hace 2 min',
        variant: 'primary',
        rotate: 5,
        getStyle: (w, h) => ({ bottom: h * 0.1, right: -(w * 0.22) }),
      },
    ]}
    step={2}
    totalSteps={3}
    onNext={() => router.push('/(onboarding)/join')}
  />
)

export default FeaturesScreen
