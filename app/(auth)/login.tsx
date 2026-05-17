import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

import { type Method } from './_constants/method-config'
import { LoginForm } from './_components/login-form'

export default function LoginScreen() {
  const { method } = useLocalSearchParams<{ method?: string }>()
  const initialMethod: Method = method === 'phone' ? 'phone' : 'email'

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LoginForm
        initialMethod={initialMethod}
        onSuccess={() => router.replace('/(tabs)')}
        onSwitchToRegister={(currentMethod) =>
          router.replace(`/(auth)/register?method=${currentMethod}`)
        }
        onForgotPassword={() => router.push('/(auth)/forgot-password')}
        onGoogle={() => {}}
      />
    </ScrollView>
  )
}
