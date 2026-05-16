import { Image } from 'expo-image'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'

import { cn } from '@/lib/cn'
import { Colors, Shadow } from '@/constants/theme'

const SIZES = {
  sm: { width: 130, height: 172 },
  md: { width: 164, height: 216 },
  lg: { width: 200, height: 264 },
  xl: { width: 240, height: 316 },
  '2xl': { width: 280, height: 368 },
} as const

export const PhotoCardPlaceholder = {
  warm: Colors.primarySoft, // #FBE9C5
  sage: Colors.secondarySoft, // #E2F1EE
  cool: Colors.surface2, // #EBF2F2
} as const

type PhotoCardSize = keyof typeof SIZES

interface PhotoCardProps {
  source?: React.ComponentProps<typeof Image>['source']
  size?: PhotoCardSize
  width?: number
  height?: number
  rotate?: number
  placeholder?: string
  className?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export function PhotoCard({
  source,
  size = 'md',
  width,
  height,
  rotate = 0,
  placeholder = PhotoCardPlaceholder.sage,
  className,
  style,
  children,
}: PhotoCardProps) {
  const base = SIZES[size]
  const w = width ?? base.width
  const h = height ?? base.height

  return (
    <View
      className={cn('overflow-visible rounded-xl bg-surface', className)}
      style={[
        { width: w, height: h },
        Shadow.md,
        { transform: [{ rotate: `${rotate}deg` }] },
        style,
      ]}
    >
      <View className="absolute inset-0 overflow-hidden rounded-xl">
        {source ? (
          <Image source={source} style={StyleSheet.absoluteFillObject} contentFit="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: placeholder }]} />
        )}
      </View>

      {children}
    </View>
  )
}
