import { Text, View } from 'react-native'

import { Icon, type MaterialIconName } from '@/components/ui/icon'
import { Colors } from '@/constants/theme'

const SIZE_CONFIG = {
  sm: { box: 64, radius: 20, icon: 28 },
  lg: { box: 76, radius: 24, icon: 32 },
}

interface AuthHeaderProps {
  icon: MaterialIconName
  title: string
  subtitle: string
  align?: 'left' | 'center'
  size?: 'sm' | 'lg'
}

export const AuthHeader = ({
  icon,
  title,
  subtitle,
  align = 'left',
  size = 'sm',
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
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={s.icon} color={Colors.surface} />
      </View>

      <View className={`gap-1 ${centered ? 'items-center' : ''}`}>
        <Text
          className={`text-h1 font-manrope-xb text-ink ${centered ? 'text-center' : ''}`}
        >
          {title}
        </Text>
        <Text className={`text-body text-ink-3 ${centered ? 'text-center' : ''}`}>
          {subtitle}
        </Text>
      </View>
    </View>
  )
}
