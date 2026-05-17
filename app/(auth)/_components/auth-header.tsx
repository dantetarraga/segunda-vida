import { Text, View } from 'react-native'

import { Icon, type MaterialIconName } from '@/components/ui/icon'
import { Colors } from '@/constants/theme'

const SIZE_CONFIG = {
  sm: { box: 64, radius: 18, icon: 26 },
  lg: { box: 76, radius: 22, icon: 30 },
}

interface AuthHeaderProps {
  icon: MaterialIconName
  title: string
  subtitle: string
  align?: 'left' | 'center'
  size?: 'sm' | 'lg'
  backgroundColor?: string
  iconColor?: string
}

export const AuthHeader = ({
  icon,
  title,
  subtitle,
  align = 'left',
  size = 'sm',
  backgroundColor = Colors.primary,
  iconColor = Colors.surface,
}: AuthHeaderProps) => {
  const s = SIZE_CONFIG[size]
  const centered = align === 'center'

  return (
    <View className={`gap-4 ${centered ? 'items-center' : ''}`}>
      <View
        style={{
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
          backgroundColor: backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={s.icon} color={iconColor} />
      </View>

      <View className={`gap-1 ${centered ? 'items-center' : ''}`}>
        <Text className={`text-h1 font-bold text-ink ${centered ? 'text-center' : ''}`}>
          {title}
        </Text>
        <Text className={`text-sm text-ink-3 ${centered ? 'text-center' : ''}`}>{subtitle}</Text>
      </View>
    </View>
  )
}
