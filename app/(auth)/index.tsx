import { router } from 'expo-router'
import { ScrollView } from 'react-native'

import { type Method } from './_constants/method-config'
import { AuthMethodPicker } from './_components/auth-method-picker'

export default function AuthIndexScreen() {
  const handleSelectMethod = (method: Method) => {
    router.push(`/(auth)/login?method=${method}`)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthMethodPicker onSelectMethod={handleSelectMethod} />
    </ScrollView>
  )
}
