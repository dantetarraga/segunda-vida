import { Text } from 'react-native'

import { Colors } from '@/constants/theme'

interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <Text
      style={{ fontSize: 13, fontFamily: 'Manrope_600SemiBold', color: Colors.urgencyHigh }}
      accessibilityRole="alert"
    >
      {message}
    </Text>
  )
}
