import { router, Slot, usePathname } from 'expo-router'
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Icon } from '@/components/ui/icon'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'

const AuthLayout = () => {
  const pathname = usePathname()

  const routesWithBackButton = ['/login', '/register', '/forgot-password']
  const showBack = routesWithBackButton.includes(pathname)

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
              className="h-10 w-10 items-center justify-center rounded-[12px] border border-border-strong bg-surface"
              accessibilityRole="button"
              accessibilityLabel="Volver"
              accessibilityHint="Regresa a la pantalla anterior"
            >
              <Icon name="arrow-back" size={20} color={Colors.ink} />
            </Pressable>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
