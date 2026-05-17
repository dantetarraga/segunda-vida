import { Pressable, Text, View } from 'react-native'

interface AuthFooterLinkProps {
  question: string
  label: string
  onPress: () => void
}

export const AuthFooterLink = ({ question, label, onPress }: AuthFooterLinkProps) => (
  <View className="flex-row items-center justify-center gap-1">
    <Text className="text-sm text-ink-3">{question}</Text>
    <Pressable hitSlop={8} onPress={onPress}>
      <Text className="text-sm font-bold text-primary">{label}</Text>
    </Pressable>
  </View>
)

export default AuthFooterLink
