import { useState } from 'react'
import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

import { Colors } from '@/constants/theme'
import { Icon, type AntDesignIconName, type MaterialIconName } from '@/components/ui/icon'

const SIZES = {
  sm: { height: 34, paddingHorizontal: 14, fontClass: 'text-btn-sm', borderRadius: 10, gap: 6,  iconSize: 16 },
  md: { height: 44, paddingHorizontal: 18, fontClass: 'text-btn-md', borderRadius: 12, gap: 8,  iconSize: 18 },
  lg: { height: 52, paddingHorizontal: 22, fontClass: 'text-btn-lg', borderRadius: 14, gap: 10, iconSize: 20 },
} as const

const VARIANTS = {
  primary:   { bg: Colors.primary,     fg: Colors.surface,   border: 'transparent',       borderWidth: 0 },
  secondary: { bg: Colors.surface,     fg: Colors.ink,       border: Colors.borderStrong, borderWidth: 1 },
  soft:      { bg: Colors.primarySoft, fg: Colors.primaryInk, border: 'transparent',      borderWidth: 0 },
  ghost:     { bg: 'transparent',      fg: Colors.ink,       border: 'transparent',       borderWidth: 0 },
  dark:      { bg: Colors.ink,         fg: Colors.surface,   border: 'transparent',       borderWidth: 0 },
  danger:    { bg: Colors.urgencyHigh, fg: Colors.surface,   border: 'transparent',       borderWidth: 0 },
} as const

export type Variant = keyof typeof VARIANTS
type Size = keyof typeof SIZES

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string
  variant?: Variant
  size?: Size
  icon?: MaterialIconName | AntDesignIconName | 'google'
  iconLibrary?: 'material' | 'antdesign' | 'custom'
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  style?: StyleProp<ViewStyle>
}

const renderIcon = (
  library: 'material' | 'antdesign' | 'custom' | undefined,
  name: MaterialIconName | AntDesignIconName | 'google',
  size: number,
  color: string,
) => {
  if (library === 'custom' && name === 'google') {
    return <Icon library="custom" name="google" size={size} />
  }
  if (library === 'antdesign') {
    return <Icon library="antdesign" name={name as AntDesignIconName} size={size} color={color} />
  }
  return <Icon name={name as MaterialIconName} size={size} color={color} />
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  iconLibrary = 'material',
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const s = SIZES[size]
  const v = VARIANTS[variant]
  const isDisabled = disabled || loading

  return (
    <Pressable
      onPressIn={(e) => { setPressed(true); onPressIn?.(e) }}
      onPressOut={(e) => { setPressed(false); onPressOut?.(e) }}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: s.borderRadius,
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: v.borderWidth,
          gap: icon && !loading ? s.gap : 0,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: isDisabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.fg} />
      ) : (
        <>
          {icon && iconPosition === 'left' && renderIcon(iconLibrary, icon, s.iconSize, v.fg)}
          <Text className={`font-manrope-sb ${s.fontClass}`} style={{ color: v.fg }} numberOfLines={1}>
            {label}
          </Text>
          {icon && iconPosition === 'right' && renderIcon(iconLibrary, icon, s.iconSize, v.fg)}
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
})
