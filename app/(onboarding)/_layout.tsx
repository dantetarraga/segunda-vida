import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OnboardingLayout() {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </SafeAreaView>
  )
}
