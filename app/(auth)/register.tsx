import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'

import { type Method } from './_constants/method-config'
import { RegisterForm } from './_components/register-form'

export default function RegisterScreen() {
  const { method: paramMethod } = useLocalSearchParams<{ method?: string }>()
  const [method, setMethod] = useState<Method>(paramMethod === 'phone' ? 'phone' : 'email')

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <RegisterForm
        key={method}
        method={method}
        onMethodChange={setMethod}
        onSuccess={() => router.replace('/(tabs)')}
        onSwitchToLogin={(currentMethod) =>
          router.replace(`/(auth)/login?method=${currentMethod}`)
        }
        onGoogle={() => {}}
      />
    </ScrollView>
  )
}
