import { Pressable, Text, View } from 'react-native'

interface AuthFooterLinkProps {
  question: string
  label: string
  onPress: () => void
}

export const AuthFooterLink = ({ question, label, onPress }: AuthFooterLinkProps) => (
  <View className="flex-row items-center justify-center gap-1">
    <Text className="text-body text-ink-3">{question}</Text>
    <Pressable
      hitSlop={8}
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={label}
    >
      <Text className="text-body font-manrope-sb text-primary">{label}</Text>
    </Pressable>
  </View>
)
