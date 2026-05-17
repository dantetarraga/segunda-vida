import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { PasswordStrengthBar } from '@/components/ui/password-strength-bar'
import { Colors } from '@/constants/theme'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { useRegisterForm } from '../_hooks/use-register-form'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

const REGISTER_COPY: Record<Method, { title: string; subtitle: string }> = {
  email: {
    title: 'Crea tu cuenta con correo',
    subtitle: 'Ingresa tu correo y elige una contraseña para empezar.',
  },
  phone: {
    title: 'Crea tu cuenta con número',
    subtitle: 'Ingresa tu número y elige una contraseña para empezar.',
  },
}

interface RegisterFormProps {
  initialMethod?: Method
  onSuccess: (method: Method, contact: string) => void
  onSwitchToLogin: (currentMethod: Method) => void
  onGoogle?: () => void
}

export const RegisterForm = ({
  initialMethod = 'email',
  onSuccess,
  onSwitchToLogin,
  onGoogle,
}: RegisterFormProps) => {
  const [method, setMethod] = useState<Method>(initialMethod)
  const [accepted, setAccepted] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)

  const isEmail = method === 'email'
  const config = METHOD_CONFIG[method]
  const copy = REGISTER_COPY[method]

  const { control, errors, isSubmitting, password, onSubmit } = useRegisterForm({
    method,
    onSuccess: (contact) => onSuccess(method, contact),
  })

  const handleSubmitGuarded = () => {
    if (!accepted) {
      setShowTermsError(true)
      return
    }
    setShowTermsError(false)
    onSubmit()
  }

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader icon={config.icon} title={copy.title} subtitle={copy.subtitle} />

        <View className="gap-4">
          <Controller
            control={control}
            name={isEmail ? 'email' : 'phone'}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={config.inputLabel}
                placeholder={config.inputPlaceholder}
                keyboardType={config.keyboardType}
                autoCapitalize="none"
                autoComplete={config.autoComplete}
                leftIcon={config.icon}
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.identifier?.message}
              />
            )}
          />

          <View className="gap-2">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Contraseña"
                  placeholder="••••••••"
                  secureTextEntry
                  autoComplete="new-password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />
            <PasswordStrengthBar password={password} />
          </View>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirmar contraseña"
                placeholder="••••••••"
                secureTextEntry
                autoComplete="new-password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <View className="gap-1">
          <Checkbox
            checked={accepted}
            onChange={(v) => {
              setAccepted(v)
              if (v) setShowTermsError(false)
            }}
            label={
              <Text className="flex-1 text-body text-ink-3">
                Acepto los{' '}
                <Text className="font-manrope-sb text-ink">Términos y condiciones</Text>
                {' '}y la{' '}
                <Text className="font-manrope-sb text-ink">Política de privacidad</Text>
              </Text>
            }
            accessibilityLabel="Acepto los términos y condiciones y la política de privacidad"
          />
          {showTermsError && (
            <Text
              style={{ fontSize: 12, fontFamily: 'Manrope_600SemiBold', color: Colors.urgencyHigh, marginLeft: 4 }}
              accessibilityRole="alert"
            >
              Debes aceptar los términos para continuar
            </Text>
          )}
        </View>
      </View>

      <View className="gap-4 pt-8">
        {errors.root?.message && (
          <Text
            style={{ fontSize: 13, fontFamily: 'Manrope_600SemiBold', color: Colors.urgencyHigh }}
            accessibilityRole="alert"
          >
            {errors.root.message}
          </Text>
        )}

        <Button
          label="Crear cuenta"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          onPress={handleSubmitGuarded}
          accessibilityLabel="Crear cuenta"
          accessibilityRole="button"
        />

        <Divider />

        <View className="flex-row gap-3">
          <Button
            label="Google"
            variant="secondary"
            icon="google"
            iconLibrary="antdesign"
            style={{ flex: 1 }}
            onPress={onGoogle}
            accessibilityLabel="Registrarse con Google"
            accessibilityRole="button"
          />
          {isEmail ? (
            <Button
              label="Teléfono"
              variant="secondary"
              icon="phone"
              style={{ flex: 1 }}
              onPress={() => setMethod('phone')}
              accessibilityLabel="Cambiar a registro con teléfono"
              accessibilityRole="button"
            />
          ) : (
            <Button
              label="Correo"
              variant="secondary"
              icon="email"
              style={{ flex: 1 }}
              onPress={() => setMethod('email')}
              accessibilityLabel="Cambiar a registro con correo"
              accessibilityRole="button"
            />
          )}
        </View>

        <AuthFooterLink
          question="¿Ya tienes cuenta?"
          label="Inicia sesión"
          onPress={() => onSwitchToLogin(method)}
        />
      </View>
    </View>
  )
}
