import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { FormError } from '@/components/form-error'
import { InputField } from '@/components/input-field'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { useLoginForm } from '../_hooks/use-login-form'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

interface LoginFormProps {
  method: Method
  onMethodChange: (method: Method) => void
  onSuccess: () => void
  onSwitchToRegister: (currentMethod: Method) => void
  onForgotPassword?: () => void
  onGoogle?: () => void
}

export const LoginForm = ({
  method,
  onMethodChange,
  onSuccess,
  onSwitchToRegister,
  onForgotPassword,
  onGoogle,
}: LoginFormProps) => {
  const [remember, setRemember] = useState(true)
  const config = METHOD_CONFIG[method]
  const { control, errors, isSubmitting, onSubmit } = useLoginForm(method, onSuccess)

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader icon={config.icon} title="Iniciar sesión" subtitle="Bienvenido de vuelta." />

        <Animated.View entering={FadeIn.duration(200)} className="gap-4">
          <InputField
            control={control}
            name="identifier"
            label={config.inputLabel}
            placeholder={config.inputPlaceholder}
            keyboardType={config.keyboardType}
            autoCapitalize="none"
            autoComplete={config.autoComplete}
            leftIcon={config.icon}
            required
          />

          <InputField
            control={control}
            name="password"
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry
            autoComplete="current-password"
            required
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
        </Animated.View>
      </View>

      <View className="gap-4 pt-8">
        <FormError message={errors.root?.message} />

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
          {method === 'email' ? (
            <Button
              label="Teléfono"
              variant="secondary"
              icon="phone"
              style={{ flex: 1 }}
              onPress={() => onMethodChange('phone')}
              accessibilityLabel="Cambiar a inicio de sesión con teléfono"
              accessibilityRole="button"
            />
          ) : (
            <Button
              label="Correo"
              variant="secondary"
              icon="email"
              style={{ flex: 1 }}
              onPress={() => onMethodChange('email')}
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
