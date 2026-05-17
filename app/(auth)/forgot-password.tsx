import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormInput } from '@/components/form-input'
import { AuthFooterLink } from './_components/auth-footer-link'
import { AuthHeader } from './_components/auth-header'
import { ForgotPasswordSuccess } from './_components/forgot-password-success'
import { useForgotPasswordForm } from './_hooks/use-forgot-password-form'

export default function ForgotPasswordScreen() {
  const [succeeded, setSucceeded] = useState(false)

  const { control, errors, isSubmitting, onSubmit } = useForgotPasswordForm({
    onSuccess: () => setSucceeded(true),
  })

  if (succeeded) {
    return <ForgotPasswordSuccess onBack={() => router.back()} />
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 justify-between px-screen pb-8 pt-6">
        <View className="gap-6">
          <AuthHeader
            icon="lock"
            title="Recuperar contraseña"
            subtitle="Te enviaremos un correo para restablecer tu contraseña."
          />

          <FormInput
            control={control}
            name="email"
            label="Correo electrónico"
            placeholder="tu@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon="email"
            required
          />
        </View>

        <View className="gap-4 pt-8">
          <FormError message={errors.root?.message} />

          <Button
            label="Enviar correo"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onPress={onSubmit}
            accessibilityLabel="Enviar correo de recuperación"
            accessibilityRole="button"
          />

          <AuthFooterLink
            question="¿Recordaste tu contraseña?"
            label="Volver al inicio de sesión"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </ScrollView>
  )
}
