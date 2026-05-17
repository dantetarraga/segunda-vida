import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { InputField } from '@/components/input-field'
import { useForgotPasswordForm } from '../_hooks/use-forgot-password-form'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

interface ForgotPasswordFormProps {
  onSuccess: () => void
  onBack: () => void
}

export const ForgotPasswordForm = ({ onSuccess, onBack }: ForgotPasswordFormProps) => {
  const { control, errors, isSubmitting, onSubmit } = useForgotPasswordForm({ onSuccess })

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <Animated.View entering={FadeIn.duration(200)} className="gap-6">
        <AuthHeader
          icon="lock"
          title="Recuperar contraseña"
          subtitle="Te enviaremos un correo para restablecer tu contraseña."
        />

        <InputField
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
      </Animated.View>

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
          onPress={onBack}
        />
      </View>
    </View>
  )
}
