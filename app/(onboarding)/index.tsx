import { Text, useWindowDimensions, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { FloatingTag } from '@/components/ui/floating-tag'
import { PhotoCard, PhotoCardPlaceholder } from '@/components/ui/photo-card'
import { router } from 'expo-router'

export default function WelcomeScreen() {
  const { width } = useWindowDimensions()

  const mainCardSize = width * 0.597
  const secondaryCardSize = width * 0.373
  const smallCardSize = width * 0.299

  const overflowX = mainCardSize * 0.25
  const smallTop = mainCardSize * 0.833
  const secondaryTop = mainCardSize * 0.917
  const clusterW = mainCardSize + overflowX * 2
  const clusterH = secondaryTop + secondaryCardSize

  return (
    <View className="flex-1 bg-canvas">
      <View className="px-[18px] pt-2">
        <Text className="text-2xl font-extrabold text-ink">
          Segunda
          <Text className="text-2xl text-primary">Vida</Text>
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <View style={{ width: clusterW, height: clusterH }}>
          <PhotoCard
            width={mainCardSize}
            height={mainCardSize}
            rotate={-5}
            placeholder={PhotoCardPlaceholder.sage}
            style={{ position: 'absolute', top: 0, left: overflowX }}
          >
            <FloatingTag
              label="🐾 Lima, Miraflores"
              rotate={-2}
              style={{ top: mainCardSize * 0.1, left: -(mainCardSize * 0.23) }}
            />
            <FloatingTag
              label="❤️ 47 ayudaron"
              variant="primary"
              rotate={5}
              style={{ bottom: mainCardSize * 0.125, right: -(mainCardSize * 0.167) }}
            />
          </PhotoCard>

          <PhotoCard
            width={smallCardSize}
            height={smallCardSize}
            rotate={-5}
            placeholder={PhotoCardPlaceholder.warm}
            style={{ position: 'absolute', top: smallTop, left: 0 }}
          />

          <PhotoCard
            width={secondaryCardSize}
            height={secondaryCardSize}
            rotate={7}
            placeholder={PhotoCardPlaceholder.cool}
            style={{ position: 'absolute', top: secondaryTop, right: 0 }}
          />
        </View>
      </View>

      <View className="px-[18px] pb-8 pt-4">
        <View className="gap-1">
          <Text className="text-4xl font-extrabold text-ink">
            Cada calle <Text className="text-primary">tiene</Text> una historia. Vamos a cambiarla.
          </Text>
          <Text className="text-sm text-black">
            Reporta, ayuda y conecta con la red de rescate animal más activa de Arequipa.
          </Text>
        </View>

        <Button label="Empezar" variant="primary" size="lg" fullWidth className="mt-4" />

        <Text className="mt-3 text-center text-sm text-black">
          ¿Ya tienes cuenta?{' '}
          <Text className="text-primary" onPress={() => router.replace('/(auth)/login')}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </View>
  )
}
