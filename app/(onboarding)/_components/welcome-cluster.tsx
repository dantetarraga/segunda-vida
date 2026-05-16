import { useWindowDimensions, View } from 'react-native'

import { FloatingTag } from '@/components/ui/floating-tag'
import { PhotoCard, PhotoCardPlaceholder } from '@/components/ui/photo-card'

const WelcomeCluster = () => {
  const { width } = useWindowDimensions()

  const main = width * 0.597
  const secondary = width * 0.373
  const small = width * 0.299
  const offsetX = main * 0.25

  return (
    <View style={{ width: main + offsetX * 2, height: main * 0.917 + secondary }}>
      <PhotoCard
        width={main}
        height={main}
        rotate={-5}
        placeholder={PhotoCardPlaceholder.sage}
        style={{ position: 'absolute', top: 0, left: offsetX }}
      >
        <FloatingTag
          label="🐾 Lima, Miraflores"
          rotate={-2}
          style={{ top: main * 0.1, left: -(main * 0.23) }}
        />
        <FloatingTag
          label="❤️ 47 ayudaron"
          variant="primary"
          rotate={5}
          style={{ bottom: main * 0.125, right: -(main * 0.167) }}
        />
      </PhotoCard>

      <PhotoCard
        width={small}
        height={small}
        rotate={-5}
        placeholder={PhotoCardPlaceholder.warm}
        style={{ position: 'absolute', top: main * 0.833, left: 0 }}
      />

      <PhotoCard
        width={secondary}
        height={secondary}
        rotate={7}
        placeholder={PhotoCardPlaceholder.cool}
        style={{ position: 'absolute', top: main * 0.917, right: 0 }}
      />
    </View>
  )
}

export default WelcomeCluster
