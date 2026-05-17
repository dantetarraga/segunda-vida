import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

import { type Method } from './_constants/method-config'
import { RegisterForm } from './_components/register-form'

export default function RegisterScreen() {
  const { method } = useLocalSearchParams<{ method?: string }>()
  const initialMethod: Method = method === 'phone' ? 'phone' : 'email'

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <RegisterForm
        initialMethod={initialMethod}
        onSuccess={(currentMethod, contact) =>
          router.replace(`/(auth)/verify?method=${currentMethod}&contact=${encodeURIComponent(contact)}`)
        }
        onSwitchToLogin={(currentMethod) =>
          router.replace(`/(auth)/login?method=${currentMethod}`)
        }
        onGoogle={() => {}}
      />
    </ScrollView>
  )
}
