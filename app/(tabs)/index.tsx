import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-canvas items-center justify-center">
      <Text className="font-manrope-bd text-h3 text-ink-3">Home · próximamente</Text>
    </SafeAreaView>
  )
}
