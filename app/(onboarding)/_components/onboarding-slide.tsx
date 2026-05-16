import { useEffect } from 'react'
import type { ViewStyle } from 'react-native'
import { Text, useWindowDimensions, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { FloatingTag } from '@/components/ui/floating-tag'
import { PhotoCard } from '@/components/ui/photo-card'
import { Colors } from '@/constants/theme'

import { useOnboarding } from '../_hooks/use-onboarding'

const StepDots = ({ step, total }: { step: number; total: number }) => (
  <View className="flex-row items-center gap-1.5">
    {Array.from({ length: total }, (_, i) => (
      <View
        key={i}
        style={{
          width: i + 1 === step ? 20 : 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: i + 1 === step ? Colors.ink : Colors.borderStrong,
        }}
      />
    ))}
  </View>
)

type TagVariant = 'white' | 'primary' | 'secondary' | 'dark'

export interface SlideTag {
  label: string
  variant?: TagVariant
  rotate?: number
  getStyle: (cardW: number, cardH: number) => ViewStyle
}

interface OnboardingSlideProps {
  image: string
  cardRotate?: number
  tags: SlideTag[]
  title: string
  description: string
  step: number
  totalSteps: number
  onNext: () => void
  nextLabel?: string
}

const OnboardingSlide = ({
  image,
  cardRotate = -3,
  tags,
  title,
  description,
  step,
  totalSteps,
  onNext,
  nextLabel = 'Siguiente',
}: OnboardingSlideProps) => {
  const { setStep } = useOnboarding()
  const { width } = useWindowDimensions()

  const cardW = Math.round(width * 0.62)
  const cardH = Math.round(cardW * 1.33)

  useEffect(() => {
    setStep(step)
  }, [step])

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <PhotoCard source={{ uri: image }} width={cardW} height={cardH} rotate={cardRotate}>
          {tags.map((tag, i) => (
            <FloatingTag
              key={i}
              label={tag.label}
              variant={tag.variant}
              rotate={tag.rotate}
              style={tag.getStyle(cardW, cardH)}
            />
          ))}
        </PhotoCard>
      </View>

      <View className="gap-1 px-[18px] pb-4">
        <Text className="text-4xl font-extrabold text-ink">{title}</Text>
        <Text className="text-sm text-black">{description}</Text>
      </View>

      <View className="flex-row items-center justify-between px-[18px] pb-8 pt-2">
        <StepDots step={step} total={totalSteps} />

        <Button
          label={nextLabel}
          variant="primary"
          size="md"
          icon="arrow-forward"
          iconPosition="right"
          onPress={onNext}
        />
      </View>
    </View>
  )
}

export default OnboardingSlide
