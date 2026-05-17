import { useWindowDimensions, View } from 'react-native'

import { FloatingTag } from '@/components/ui/floating-tag'
import { PhotoCard, PhotoCardPlaceholder } from '@/components/ui/photo-card'

const HERO_IMAGES = {
  main: {
    uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
  },
  small: {
    uri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
  },
  secondary: {
    uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  },
}

const LAYOUT = {
  mainRatio: 0.597,
  secondaryRatio: 0.373,
  smallRatio: 0.299,
  offsetXRatio: 0.25,
  containerHeightRatio: 0.917,
  smallTopRatio: 0.833,
  largeTopRatio: 0.917,
  tagTopRatio: 0.1,
  tagLeftRatio: 0.23,
  tagBottomRatio: 0.125,
  tagRightRatio: 0.167,
}

const WelcomeHero = () => {
  const { width } = useWindowDimensions()

  const main = width * LAYOUT.mainRatio
  const secondary = width * LAYOUT.secondaryRatio
  const small = width * LAYOUT.smallRatio
  const offsetX = main * LAYOUT.offsetXRatio

  return (
    <View
      style={{ width: main + offsetX * 2, height: main * LAYOUT.containerHeightRatio + secondary }}
    >
      <PhotoCard
        width={main}
        height={main}
        rotate={-5}
        source={HERO_IMAGES.main}
        placeholder={PhotoCardPlaceholder.sage}
        style={{ position: 'absolute', top: 0, left: offsetX }}
      >
        <FloatingTag
          label="🐾 Lima, Miraflores"
          rotate={-2}
          className="absolute"
          style={{ top: main * LAYOUT.tagTopRatio, left: -(main * LAYOUT.tagLeftRatio) }}
        />

        <FloatingTag
          label="❤️ 47 ayudaron"
          variant="primary"
          rotate={5}
          className="absolute"
          style={{ bottom: main * LAYOUT.tagBottomRatio, right: -(main * LAYOUT.tagRightRatio) }}
        />
      </PhotoCard>

      <PhotoCard
        width={small}
        height={small}
        rotate={-5}
        source={HERO_IMAGES.small}
        placeholder={PhotoCardPlaceholder.warm}
        style={{ position: 'absolute', top: main * LAYOUT.smallTopRatio, left: 0 }}
      />

      <PhotoCard
        width={secondary}
        height={secondary}
        rotate={7}
        source={HERO_IMAGES.secondary}
        placeholder={PhotoCardPlaceholder.cool}
        style={{ position: 'absolute', top: main * LAYOUT.largeTopRatio, right: 0 }}
      />
    </View>
  )
}

export default WelcomeHero
