import { router } from 'expo-router'
import { useEffect } from 'react'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'

import WelcomeCluster from './_components/welcome-cluster'
import { useOnboarding } from './_hooks/use-onboarding'

const WelcomeScreen = () => {
  const { setStep } = useOnboarding()

  useEffect(() => {
    setStep(1)
  }, [])

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <WelcomeCluster />
      </View>

      <View className="gap-1 px-[18px] pb-8 pt-4">
        <Text className="text-4xl font-extrabold text-ink">
          Cada calle <Text className="text-primary">tiene</Text> una historia. Vamos a cambiarla.
        </Text>
        <Text className="text-sm text-black">
          Reporta, ayuda y conecta con la red de rescate animal más activa de Arequipa.
        </Text>

        <Button
          label="Empezar"
          variant="primary"
          size="lg"
          fullWidth
          className="mt-4"
          onPress={() => router.push('/(onboarding)/features')}
        />

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

export default WelcomeScreen
