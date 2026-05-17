import { router, Slot, usePathname } from 'expo-router'
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Icon } from '@/components/ui/icon'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'

const AuthLayout = () => {
  const pathname = usePathname()
  const showBack = pathname.includes('/login') || pathname.includes('/register') ||
    pathname.includes('/forgot-password') || pathname.includes('/verify')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-canvas">
        <RadialGlow />

        {showBack && (
          <View className="px-screen pt-4">
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              className="h-10 w-10 items-center justify-center rounded-xl bg-surface"
              accessibilityRole="button"
              accessibilityLabel="Volver"
              accessibilityHint="Regresa a la pantalla anterior"
            >
              <Icon name="arrow-back" size={20} color={Colors.ink} />
            </Pressable>
          </View>
        )}

        <Slot />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
