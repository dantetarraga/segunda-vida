import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'

import { ForgotPasswordForm } from './_components/forgot-password-form'
import { ForgotPasswordSuccess } from './_components/forgot-password-success'

export default function ForgotPasswordScreen() {
  const [succeeded, setSucceeded] = useState(false)

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {succeeded ? (
        <ForgotPasswordSuccess onBack={() => router.back()} />
      ) : (
        <ForgotPasswordForm
          onSuccess={() => setSucceeded(true)}
          onBack={() => router.back()}
        />
      )}
    </ScrollView>
  )
}
