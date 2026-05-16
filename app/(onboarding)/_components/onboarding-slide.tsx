import type { ViewStyle } from 'react-native'
import { Text, useWindowDimensions, View } from 'react-native'

import { FloatingTag, type FloatingTagVariant } from '@/components/ui/floating-tag'
import { PhotoCard } from '@/components/ui/photo-card'

import OnboardingHeader from './onboarding-header'

export interface SlideTag {
  label: string
  variant?: FloatingTagVariant
  rotate?: number
  getStyle: (cardW: number, cardH: number) => ViewStyle
}

interface OnboardingSlideProps {
  image: string
  cardRotate?: number
  tags: SlideTag[]
  kicker?: string
  title: string
  description: string
}

const OnboardingSlide = ({
  image,
  cardRotate = -3,
  tags,
  kicker,
  title,
  description,
}: OnboardingSlideProps) => {
  const { width } = useWindowDimensions()

  const cardW = Math.round(width * 0.62)
  const cardH = Math.round(cardW * 1.33)

  return (
    <View className="flex-1">
      <OnboardingHeader />

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

      <View className="px-screen gap-1 pb-4">
        {kicker && (
          <Text className="mb-1 font-manrope-sb text-kicker uppercase tracking-widest text-primary">
            {kicker}
          </Text>
        )}
        <Text className="text-4xl font-extrabold text-ink">{title}</Text>
        <Text className="text-sm text-ink-2">{description}</Text>
      </View>
    </View>
  )
}

export default OnboardingSlide
