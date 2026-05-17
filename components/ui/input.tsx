import { useState } from 'react'
import type { TextInputProps } from 'react-native'
import { Pressable, Text, TextInput, View } from 'react-native'

import { Colors } from '@/constants/theme'
import { Icon, type MaterialIconName } from '@/components/ui/icon'

const SIZES = {
  sm: { height: 34, borderRadius: 10, haloRadius: 13, fontSize: 13, iconSize: 16 },
  md: { height: 44, borderRadius: 12, haloRadius: 15, fontSize: 15, iconSize: 16 },
  lg: { height: 52, borderRadius: 14, haloRadius: 17, fontSize: 15.5, iconSize: 18 },
} as const

type Size = keyof typeof SIZES

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string
  error?: string
  helper?: string
  size?: Size
  leftIcon?: MaterialIconName
  rightIcon?: MaterialIconName
  onRightIconPress?: () => void
}

export const Input = ({
  label,
  error,
  helper,
  size = 'md',
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(true)

  const s = SIZES[size]
  const hasError = !!error
  const isSecure = secureTextEntry

  const borderColor = hasError ? Colors.urgencyHigh : focused ? Colors.primary : Colors.borderStrong
  const haloColor = hasError ? 'rgba(194,74,46,0.15)' : focused ? Colors.primarySoft : 'transparent'

  const resolvedRightIcon: MaterialIconName | undefined = isSecure
    ? hidden ? 'visibility-off' : 'visibility'
    : rightIcon

  const handleRightPress = isSecure ? () => setHidden(v => !v) : onRightIconPress

  return (
    <View style={{ gap: 4 }}>
      {label && (
        <Text style={{ fontSize: 12.5, fontFamily: 'Manrope_600SemiBold', color: Colors.ink2 }}>
          {label}
        </Text>
      )}

      <View style={{ borderRadius: s.haloRadius, borderWidth: focused || hasError ? 3 : 0, borderColor: haloColor }}>
        <View
          style={{
            height: s.height,
            borderRadius: s.borderRadius,
            borderWidth: 1,
            borderColor,
            backgroundColor: Colors.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            gap: 8,
            overflow: 'hidden',
          }}
        >
          {leftIcon && <Icon name={leftIcon} size={s.iconSize} color={Colors.ink3} />}

          <TextInput
            style={{ flex: 1, fontSize: s.fontSize, color: Colors.ink, fontFamily: 'Manrope_400Regular' }}
            placeholderTextColor={Colors.ink3}
            secureTextEntry={isSecure && hidden}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />

          {resolvedRightIcon && (
            <Pressable onPress={handleRightPress} hitSlop={8}>
              <Icon name={resolvedRightIcon} size={s.iconSize} color={Colors.ink3} />
            </Pressable>
          )}
        </View>
      </View>

      {hasError && (
        <Text style={{ fontSize: 11.5, fontFamily: 'Manrope_600SemiBold', color: Colors.urgencyHigh }}>
          {error}
        </Text>
      )}
      {!hasError && helper && (
        <Text style={{ fontSize: 11.5, color: Colors.ink3 }}>{helper}</Text>
      )}
    </View>
  )
}
