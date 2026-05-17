import { Text, View } from 'react-native'

import { Colors } from '@/constants/theme'

type Strength = 0 | 1 | 2 | 3

const STRENGTH_CONFIG = {
  0: { label: '',        color: Colors.borderStrong, segments: 0 },
  1: { label: 'Débil',   color: Colors.urgencyHigh,  segments: 1 },
  2: { label: 'Regular', color: Colors.primary,      segments: 2 },
  3: { label: 'Fuerte',  color: Colors.secondary,    segments: 3 },
} as const

const getStrength = (pwd: string): Strength => {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8)           score++
  if (/[A-Z]/.test(pwd))         score++
  if (/[0-9]/.test(pwd))         score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return (score <= 1 ? 1 : score <= 2 ? 2 : 3) as Strength
}

interface PasswordStrengthBarProps {
  password: string
}

export const PasswordStrengthBar = ({ password }: PasswordStrengthBarProps) => {
  if (!password) return null
  const strength = getStrength(password)
  const config = STRENGTH_CONFIG[strength]

  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3].map(i => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i <= config.segments ? config.color : Colors.borderStrong,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, lineHeight: 14, color: Colors.ink3, fontFamily: 'Manrope_400Regular' }}>
          Mín. 8 caracteres, una mayúscula y un número
        </Text>
        <Text style={{ fontSize: 11, lineHeight: 14, fontFamily: 'Manrope_600SemiBold', color: config.color }}>
          {config.label}
        </Text>
      </View>
    </View>
  )
}
