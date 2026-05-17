import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { Colors } from '@/constants/theme'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { useLoginForm } from '../_hooks/use-login-form'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

interface LoginFormProps {
  initialMethod?: Method
  onSuccess: () => void
  onSwitchToRegister: (currentMethod: Method) => void
  onForgotPassword?: () => void
  onGoogle?: () => void
}

export const LoginForm = ({
  initialMethod = 'email',
  onSuccess,
  onSwitchToRegister,
  onForgotPassword,
  onGoogle,
}: LoginFormProps) => {
  const [method, setMethod] = useState<Method>(initialMethod)
  const [remember, setRemember] = useState(true)

  const isEmail = method === 'email'
  const config = METHOD_CONFIG[method]

  const { control, errors, isSubmitting, onSubmit } = useLoginForm({ method, onSuccess })

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader
          icon={config.icon}
          title="Iniciar sesión"
          subtitle="Bienvenido de vuelta."
        />

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

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Contraseña"
                placeholder="••••••••"
                secureTextEntry
                autoComplete="current-password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <View className="flex-row items-center justify-between">
            <Checkbox
              checked={remember}
              onChange={setRemember}
              label="Recuérdame"
              accessibilityLabel="Recuérdame en este dispositivo"
            />
            <Pressable
              hitSlop={8}
              onPress={onForgotPassword}
              accessibilityRole="button"
              accessibilityLabel="¿Olvidaste tu contraseña?"
            >
              <Text className="text-body text-primary">¿Olvidaste tu contraseña?</Text>
            </Pressable>
          </View>
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
          label="Iniciar sesión"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          onPress={onSubmit}
          accessibilityLabel="Iniciar sesión"
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
            accessibilityLabel="Iniciar sesión con Google"
            accessibilityRole="button"
          />
          {isEmail ? (
            <Button
              label="Teléfono"
              variant="secondary"
              icon="phone"
              style={{ flex: 1 }}
              onPress={() => setMethod('phone')}
              accessibilityLabel="Cambiar a inicio de sesión con teléfono"
              accessibilityRole="button"
            />
          ) : (
            <Button
              label="Correo"
              variant="secondary"
              icon="email"
              style={{ flex: 1 }}
              onPress={() => setMethod('email')}
              accessibilityLabel="Cambiar a inicio de sesión con correo"
              accessibilityRole="button"
            />
          )}
        </View>

        <AuthFooterLink
          question="¿No tienes cuenta?"
          label="Regístrate"
          onPress={() => onSwitchToRegister(method)}
        />
      </View>
    </View>
  )
}
