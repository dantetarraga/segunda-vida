import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Text, View } from 'react-native'

import { cn } from '@/lib/cn'
import { Colors, Shadow } from '@/constants/theme'

// ─── Variantes ────────────────────────────────────────────────────────────────
const VARIANTS = {
  white: {
    bg: Colors.surface,
    textColor: Colors.ink,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  primary: {
    bg: Colors.primarySoft,
    textColor: Colors.primaryInk,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  secondary: {
    bg: Colors.secondarySoft,
    textColor: Colors.secondaryInk,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  dark: {
    bg: Colors.ink,
    textColor: Colors.inkInv,
    borderColor: 'transparent',
    borderWidth: 0,
  },
} as const

type FloatingTagVariant = keyof typeof VARIANTS

interface FloatingTagProps {
  label: string
  icon?: ComponentProps<typeof MaterialIcons>['name']
  variant?: FloatingTagVariant
  rotate?: number
  className?: string
  style?: StyleProp<ViewStyle>
}

export function FloatingTag({
  label,
  icon,
  variant = 'white',
  rotate = 0,
  className,
  style,
}: FloatingTagProps) {
  const v = VARIANTS[variant]

  return (
    <View
      className={cn('absolute flex-row items-center gap-1 rounded-pill px-2.5 py-1.5', className)}
      style={[
        Shadow.sm,
        {
          backgroundColor: v.bg,
          borderColor: v.borderColor,
          borderWidth: v.borderWidth,
          transform: [{ rotate: `${rotate}deg` }],
        },
        style,
      ]}
    >
      {icon && <MaterialIcons name={icon} size={13} color={v.textColor} />}
      <Text
        className="font-manrope-sb"
        style={{ fontSize: 12, lineHeight: 14, color: v.textColor }}
      >
        {label}
      </Text>
    </View>
  )
}
