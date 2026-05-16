import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1470&auto=format&fit=crop'

const SlideAdoptScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={3}
    kicker="03 · ADOPTA"
    title={'Dale una segunda\nvida a una familia'}
    description="Conoce a los rescatados listos para adopción, lee su historia y postula desde la app."
    tags={[
      {
        label: '🏠 Listo para adoptar',
        rotate: -2,
        getStyle: (w, h) => ({ top: h * 0.1, left: -(w * 0.3) }),
      },
      {
        label: '❤️ 12 interesados',
        variant: 'primary',
        rotate: 5,
        getStyle: (w, h) => ({ bottom: h * 0.1, right: -(w * 0.2) }),
      },
    ]}
  />
)

export default SlideAdoptScreen
