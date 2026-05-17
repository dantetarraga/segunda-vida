import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1470&auto=format&fit=crop'

const SlideHelpScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={-3}
    kicker="02 · AYUDA"
    title={'Toma un caso\ncuando puedas'}
    description='Recibe alertas de casos cerca de ti. Toca "Yo puedo ayudar" para coordinarte con el equipo y mover el caso adelante.'
    tags={[
      {
        text: '🔔 Caso cerca de ti',
        rotate: -3,
        getStyle: (w, h) => ({ top: h * 0.1, left: -(w * 0.3) }),
      },
      {
        text: '🤝 Yo puedo ayudar',
        variant: 'primary',
        rotate: 4,
        getStyle: (w, h) => ({ bottom: h * 0.1, right: -(w * 0.22) }),
      },
    ]}
  />
)

export default SlideHelpScreen
