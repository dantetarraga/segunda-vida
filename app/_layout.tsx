import { Stack, router } from 'expo-router'

import { useEffect } from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'

import 'react-native-reanimated'
import './global.css'

export const unstable_settings = {
  initialRouteName: '(onboarding)',
}

export default function RootLayout() {
  const hasSeenOnboarding = false
  const isAuthenticated = false

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)')
    } else if (hasSeenOnboarding) {
      router.replace('/(auth)/login')
    }
  }, [isAuthenticated, hasSeenOnboarding])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}
