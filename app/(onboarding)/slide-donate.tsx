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
        label: '💛 Yape',
        rotate: -2,
        getStyle: (w, h) => ({ top: h * 0.1, left: -(w * 0.22) }),
      },
      {
        label: '🏥 Cirugía cubierta',
        variant: 'primary',
        rotate: 4,
        getStyle: (w, h) => ({ bottom: h * 0.1, right: -(w * 0.25) }),
      },
    ]}
  />
)

export default SlideDonateScreen
