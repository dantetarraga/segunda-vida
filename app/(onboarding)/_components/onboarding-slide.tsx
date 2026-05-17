import { Text, useWindowDimensions, View } from 'react-native'

import { FloatingTag, type FloatingTagProps } from '@/components/ui/floating-tag'
import { PhotoCard } from '@/components/ui/photo-card'

type TagPosition = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type SlideTag = Omit<FloatingTagProps, 'style' | 'className'> & {
  position: TagPosition
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
      <View className="flex-1 items-center justify-center">
        <PhotoCard source={{ uri: image }} width={cardW} height={cardH} rotate={cardRotate}>
          {tags.map(({ position, ...tagProps }, i) => (
            <FloatingTag
              key={i}
              {...tagProps}
              style={{
                top: position.top != null ? cardH * position.top : undefined,
                bottom: position.bottom != null ? cardH * position.bottom : undefined,
                left: position.left != null ? cardW * position.left : undefined,
                right: position.right != null ? cardW * position.right : undefined,
              }}
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
        <Text className="text-sm leading-6 text-ink-2">{description}</Text>
      </View>
    </View>
  )
}

export default OnboardingSlide
