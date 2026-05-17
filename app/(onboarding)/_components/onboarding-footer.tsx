import { Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { Colors, Duration } from '@/constants/theme'
import { SLIDE_COUNT, useOnboarding } from '../_hooks/use-onboarding'

const Dot = ({
  isActive,
  isNavigable,
  onPress,
}: {
  isActive: boolean
  isNavigable: boolean
  onPress?: () => void
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(isActive ? 20 : 6, { duration: Duration.toggle }),
    backgroundColor: withTiming(
      isActive ? Colors.primary : Colors.borderStrong,
      { duration: Duration.toggle },
    ),
  }))

  const dot = (
    <Animated.View style={[{ height: 6, borderRadius: 3 }, animatedStyle]} />
  )

  if (isNavigable) {
    return (
      <Pressable onPress={onPress} hitSlop={8}>
        {dot}
      </Pressable>
    )
  }

  return dot
}

const StepDots = () => {
  const { step, goToStep } = useOnboarding()

  return (
    <View className="flex-row items-center gap-1.5">
      {Array.from({ length: SLIDE_COUNT }, (_, i) => {
        const dotStep = i + 1
        return (
          <Dot
            key={i}
            isActive={dotStep === step}
            isNavigable={dotStep < step}
            onPress={() => goToStep(dotStep)}
          />
        )
      })}
    </View>
  )
}

const OnboardingFooter = () => {
  const { isSlide, nextLabel, goNext } = useOnboarding()
  if (!isSlide) return null

  return (
    <View className="px-screen flex-row items-center justify-between pb-8 pt-2">
      <StepDots />
      <Button
        label={nextLabel}
        variant="primary"
        size="md"
        icon="arrow-forward"
        iconPosition="right"
        onPress={goNext}
      />
    </View>
  )
}

export default OnboardingFooter
