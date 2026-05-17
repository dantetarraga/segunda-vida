import { router } from 'expo-router'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'

import WelcomeHero from './_components/welcome-hero'

const WelcomeScreen = () => {
  const handleGoToLogin = () => router.replace('/(auth)')
  const handleGoToSlide = () => router.push('/(onboarding)/slide-report')

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <WelcomeHero />
      </View>

      <View className="gap-1 px-screen pb-8 pt-4">
        <Text className="text-4xl font-extrabold text-ink">
          Cada calle <Text className="text-primary">tiene</Text> una historia. Vamos a cambiarla.
        </Text>

        <Text className="text-sm text-ink-2">
          Reporta, ayuda y conecta con la red de rescate animal más activa de Arequipa.
        </Text>

        <Button
          label="Empezar"
          variant="primary"
          size="lg"
          fullWidth
          className="mt-4"
          onPress={handleGoToSlide}
        />

        <Text className="mt-3 text-center text-sm text-ink-2">
          ¿Ya tienes cuenta?{' '}
          <Text className="text-primary" onPress={handleGoToLogin}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen
