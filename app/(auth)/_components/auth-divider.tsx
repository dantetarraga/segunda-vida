import { Text, View } from 'react-native'

interface AuthDividerProps {
  text?: string
}

export const AuthDivider = ({ text = 'o continúa con' }: AuthDividerProps) => (
  <View className="flex-row items-center gap-3">
    <View className="flex-1 border-t border-border" />
    <Text className="text-sm text-ink-3">{text}</Text>
    <View className="flex-1 border-t border-border" />
  </View>
)

export default AuthDivider
