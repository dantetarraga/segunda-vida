import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'

import { type Method } from './_constants/method-config'
import { LoginForm } from './_components/login-form'

export default function LoginScreen() {
  const { method: paramMethod } = useLocalSearchParams<{ method?: string }>()
  const [method, setMethod] = useState<Method>(paramMethod === 'phone' ? 'phone' : 'email')

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LoginForm
        key={method}
        method={method}
        onMethodChange={setMethod}
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
