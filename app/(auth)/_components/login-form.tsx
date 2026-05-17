import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { FormError } from '@/components/form-error'
import { FormInput } from '@/components/form-input'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { useLoginEmailForm, useLoginPhoneForm } from '../_hooks/use-login-form'
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

interface LoginFormFooterProps {
  method: Method
  onMethodChange: (method: Method) => void
  onSwitchToRegister: (currentMethod: Method) => void
  onGoogle?: () => void
  rootError?: string
  isSubmitting: boolean
  onSubmit: () => void
}

const LoginFormFooter = ({
  method,
  onMethodChange,
  onSwitchToRegister,
  onGoogle,
  rootError,
  isSubmitting,
  onSubmit,
}: LoginFormFooterProps) => (
  <View className="gap-4 pt-8">
    <FormError message={rootError} />

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
)

const LoginEmailForm = ({
  onMethodChange,
  onSuccess,
  onSwitchToRegister,
  onForgotPassword,
  onGoogle,
}: Omit<LoginFormProps, 'method'>) => {
  const [remember, setRemember] = useState(true)
  const config = METHOD_CONFIG.email
  const { control, errors, isSubmitting, onSubmit } = useLoginEmailForm(onSuccess)

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader icon={config.icon} title="Iniciar sesión" subtitle="Bienvenido de vuelta." />

        <View className="gap-4">
          <FormInput
            control={control}
            name="email"
            label={config.inputLabel}
            placeholder={config.inputPlaceholder}
            keyboardType={config.keyboardType}
            autoCapitalize="none"
            autoComplete={config.autoComplete}
            leftIcon={config.icon}
            required
          />

          <FormInput
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
        </View>
      </View>

      <LoginFormFooter
        method="email"
        onMethodChange={onMethodChange}
        onSwitchToRegister={onSwitchToRegister}
        onGoogle={onGoogle}
        rootError={errors.root?.message}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </View>
  )
}

const LoginPhoneForm = ({
  onMethodChange,
  onSuccess,
  onSwitchToRegister,
  onForgotPassword,
  onGoogle,
}: Omit<LoginFormProps, 'method'>) => {
  const [remember, setRemember] = useState(true)
  const config = METHOD_CONFIG.phone
  const { control, errors, isSubmitting, onSubmit } = useLoginPhoneForm(onSuccess)

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader icon={config.icon} title="Iniciar sesión" subtitle="Bienvenido de vuelta." />

        <View className="gap-4">
          <FormInput
            control={control}
            name="phone"
            label={config.inputLabel}
            placeholder={config.inputPlaceholder}
            keyboardType={config.keyboardType}
            autoCapitalize="none"
            autoComplete={config.autoComplete}
            leftIcon={config.icon}
            required
          />

          <FormInput
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
        </View>
      </View>

      <LoginFormFooter
        method="phone"
        onMethodChange={onMethodChange}
        onSwitchToRegister={onSwitchToRegister}
        onGoogle={onGoogle}
        rootError={errors.root?.message}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </View>
  )
}

export const LoginForm = ({ method, ...props }: LoginFormProps) => {
  if (method === 'email') return <LoginEmailForm {...props} />
  return <LoginPhoneForm {...props} />
}
