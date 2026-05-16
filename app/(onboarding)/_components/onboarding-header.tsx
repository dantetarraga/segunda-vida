import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { useOnboarding } from '../_hooks/use-onboarding'

const OnboardingHeader = () => {
  const { step } = useOnboarding()

  const handleSkip = () => router.replace('/(auth)/login')

  return (
    <View className="flex-row items-center justify-between px-screen pb-1 pt-2">
      <Text className="text-2xl font-extrabold text-ink">
        Segunda
        <Text className="text-2xl text-primary">Vida</Text>
      </Text>

      {step > 1 && (
        <Pressable
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          onPress={handleSkip}
        >
          <Text className="text-sm text-ink-2">Saltar</Text>
        </Pressable>
      )}
    </View>
  )
}

export default OnboardingHeader
