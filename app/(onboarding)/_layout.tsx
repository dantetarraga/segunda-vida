import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import OnboardingHeader from './_components/onboarding-header'
import OnboardingProvider from './_hooks/use-onboarding'

const OnboardingLayout = () => (
  <OnboardingProvider>
    <SafeAreaView className="flex-1 bg-canvas">
      <OnboardingHeader />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </SafeAreaView>
  </OnboardingProvider>
)

export default OnboardingLayout
