import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthFooterLink } from './_components/auth-footer-link'
import { AuthHeader } from './_components/auth-header'
import { authService } from './_services/auth.service'
import type { Method } from './_constants/method-config'

export default function VerifyScreen() {
  const { method, contact } = useLocalSearchParams<{ method?: string; contact?: string }>()
  const resolvedMethod: Method = method === 'phone' ? 'phone' : 'email'
  const isPhone = resolvedMethod === 'phone'

  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resending, setResending] = useState(false)

  const handleVerify = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      router.replace('/(tabs)')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await authService.resendOtp(contact ?? '')
    } finally {
      setResending(false)
    }
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
            icon={isPhone ? 'sms' : 'mark-email-read'}
            title="Verifica tu cuenta"
            subtitle={
              isPhone
                ? `Ingresa el código de 6 dígitos enviado a ${contact ?? 'tu número'}.`
                : `Te enviamos un enlace de verificación a ${contact ?? 'tu correo'}.`
            }
          />

          {isPhone && (
            <Input
              label="Código de verificación"
              placeholder="000000"
              keyboardType="number-pad"
              autoComplete="one-time-code"
              value={otp}
              onChangeText={v => setOtp(v.replace(/\D/g, '').slice(0, 6))}
              leftIcon="pin"
            />
          )}

          {!isPhone && (
            <Text className="text-body text-ink-3">
              Revisa tu bandeja de entrada y sigue el enlace del correo para activar tu cuenta.
            </Text>
          )}
        </View>

        <View className="gap-4 pt-8">
          {isPhone && (
            <Button
              label="Verificar"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={otp.length < 6}
              onPress={handleVerify}
              accessibilityLabel="Verificar código OTP"
              accessibilityRole="button"
            />
          )}

          <AuthFooterLink
            question="¿No recibiste el código?"
            label={resending ? 'Reenviando…' : 'Reenviar código'}
            onPress={handleResend}
          />
        </View>
      </View>
    </ScrollView>
  )
}
