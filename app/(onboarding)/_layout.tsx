import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import OnboardingProvider from './_hooks/use-onboarding'

const OnboardingLayout = () => (
  <OnboardingProvider>
    <SafeAreaView className="flex-1 bg-canvas">
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </SafeAreaView>
  </OnboardingProvider>
)

export default OnboardingLayout
