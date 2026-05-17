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
        text: '🐾 Miraflores, Lima',
        rotate: -2,
        position: { top: 0.1, left: -0.28 },
      },
      {
        text: '📍 Hace 2 min',
        variant: 'primary',
        rotate: 5,
        position: { bottom: 0.1, right: -0.22 },
      },
    ]}
  />
)

export default SlideReportScreen
