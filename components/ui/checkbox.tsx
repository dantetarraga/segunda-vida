import type { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'

import { Colors } from '@/constants/theme'
import { Icon } from '@/components/ui/icon'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  size?: number
}

export const Checkbox = ({ checked, onChange, label, size = 20 }: CheckboxProps) => (
  <Pressable className="flex-row items-center gap-3" onPress={() => onChange(!checked)}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: checked ? Colors.primary : Colors.borderStrong,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked && <Icon name="check" size={size * 0.65} color={Colors.primary} />}
    </View>
    {label && (
      typeof label === 'string'
        ? <Text className="flex-1 text-sm text-ink-2">{label}</Text>
        : <View className="flex-1">{label}</View>
    )}
  </Pressable>
)
