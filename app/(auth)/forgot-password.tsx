import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authService } from './_services/auth.service'
import { AuthFooterLink } from './_components/auth-footer-link'
import { AuthHeader } from './_components/auth-header'
import { ForgotPasswordSuccess } from './_components/forgot-password-success'
import { forgotPasswordSchema, type ForgotPasswordFields } from './_schemas/auth.schema'

export default function ForgotPasswordScreen() {
  const [succeeded, setSucceeded] = useState(false)

  const { control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ForgotPasswordFields>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = async (data: ForgotPasswordFields) => {
    await authService.forgotPassword(data.email)
    setSucceeded(true)
  }

  if (succeeded) {
    return (
      <ForgotPasswordSuccess onBack={() => router.back()} />
    )
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Correo electrónico"
                placeholder="tu@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon="email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
        </View>

        <View className="gap-4 pt-8">
          <Button
            label="Enviar correo"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
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
