import { Pressable, View } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Colors } from '@/constants/theme'
import OnboardingProvider, { SLIDE_COUNT, useOnboarding } from './_hooks/use-onboarding'

const StepDots = () => {
  const { step, goToStep } = useOnboarding()
  return (
    <View className="flex-row items-center gap-1.5">
      {Array.from({ length: SLIDE_COUNT }, (_, i) => {
        const dotStep = i + 1
        const isActive = dotStep === step
        const isNavigable = dotStep < step
        const dotStyle = {
          width: isActive ? 20 : 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: isActive ? Colors.primary : Colors.borderStrong,
        }
        if (isNavigable) {
          return (
            <Pressable key={i} onPress={() => goToStep(dotStep)} hitSlop={8}>
              <View style={dotStyle} />
            </Pressable>
          )
        }
        return <View key={i} style={dotStyle} />
      })}
    </View>
  )
}

const SlideFooter = () => {
  const { isSlide, nextLabel, goNext } = useOnboarding()
  if (!isSlide) return null
  return (
    <View className="flex-row items-center justify-between px-screen pb-8 pt-2">
      <StepDots />
      <Button label={nextLabel} variant="primary" size="md" icon="arrow-forward" iconPosition="right" onPress={goNext} />
    </View>
  )
}

const OnboardingLayout = () => (
  <OnboardingProvider>
    <SafeAreaView className="flex-1 bg-canvas">
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      <SlideFooter />
    </SafeAreaView>
  </OnboardingProvider>
)

export default OnboardingLayout
