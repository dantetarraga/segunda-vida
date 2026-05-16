import OnboardingSlide from './_components/onboarding-slide'

const IMAGE =
  'https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?q=80&w=1469&auto=format&fit=crop'

const SlideReportScreen = () => (
  <OnboardingSlide
    image={IMAGE}
    cardRotate={4}
    kicker="01 · REPORTA"
    title={'Sube el caso en\nmenos de 30 segundos'}
    description="Foto, ubicación GPS y una referencia escrita. La comunidad lo verá al instante para coordinar el rescate."
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
  />
)

export default SlideReportScreen
