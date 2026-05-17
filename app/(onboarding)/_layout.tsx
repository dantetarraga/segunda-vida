import { Stack } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'
import OnboardingFooter from './_components/onboarding-footer'
import OnboardingHeader from './_components/onboarding-header'
import OnboardingProvider, { useOnboarding } from './_hooks/use-onboarding'

const RadialGlowOverlay = () => {
  const { isSlide } = useOnboarding()
  if (isSlide) return null
  return <RadialGlow />
}

const OnboardingLayout = () => (
  <OnboardingProvider>
    <View style={{ flex: 1, backgroundColor: Colors.canvas }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.canvas }}>
        <OnboardingHeader />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <OnboardingFooter />
      </SafeAreaView>

      <RadialGlowOverlay />
    </View>
  </OnboardingProvider>
)

export default OnboardingLayout
