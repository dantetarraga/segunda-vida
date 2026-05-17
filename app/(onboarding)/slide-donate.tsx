import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1469&auto=format&fit=crop'

const SlideDonateScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={-4}
    kicker="04 · APORTA"
    title={'Una donación con\nYape salva una vida'}
    description="Comida, vacunas, cirugías. Cada sol va directo al albergue y verás el impacto en el feed."
    tags={[
      {
        text: '💛 Yape',
        rotate: -2,
        position: { top: 0.1, left: -0.22 },
      },
      {
        text: '🏥 Cirugía cubierta',
        variant: 'primary',
        rotate: 4,
        position: { bottom: 0.1, right: -0.25 },
      },
    ]}
  />
)

export default SlideDonateScreen
