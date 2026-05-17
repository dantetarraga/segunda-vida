import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { loginEmailSchema, loginPhoneSchema, type LoginEmailFields, type LoginPhoneFields } from '../_schemas/auth.schema'
import { AuthDivider } from './auth-divider'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

const LOGIN_COPY = {
  email: {
    title: 'Iniciar sesión',
    subtitle: 'Bienvenido de vuelta. Hay 3 casos cerca de tu zona.',
    submitLabel: 'Iniciar sesión',
  },
  phone: {
    title: 'Entra con tu número',
    subtitle: 'Te enviaremos un código por SMS para confirmar que eres tú.',
    submitLabel: 'Enviar código',
  },
}

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToRegister: () => void
}

export const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [method, setMethod] = useState<Method>('email')
  const [remember, setRemember] = useState(true)

  const isEmail = method === 'email'
  const schema = isEmail ? loginEmailSchema : loginPhoneSchema
  const config = METHOD_CONFIG[method]
  const copy = LOGIN_COPY[method]

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<LoginEmailFields | LoginPhoneFields>({ resolver: zodResolver(schema) })

  useEffect(() => { reset() }, [method, reset])

  const onSubmit = async (_data: LoginEmailFields | LoginPhoneFields) => {
    onSuccess()
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
                error={isEmail
                  ? (errors as { email?: { message?: string } }).email?.message
                  : (errors as { phone?: { message?: string } }).phone?.message}
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
            <Checkbox checked={remember} onChange={setRemember} label="Recuérdame" />
            <Pressable hitSlop={8}>
              <Text className="text-sm text-primary">¿Olvidaste tu contraseña?</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="gap-4 pt-8">
        <Button
          label={copy.submitLabel}
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        <AuthDivider />

        <View className="flex-row gap-3">
          <Button
            label="Google"
            variant="secondary"
            icon="google"
            iconLibrary="antdesign"
            style={{ flex: 1 }}
          />
          {isEmail ? (
            <Button
              label="Teléfono"
              variant="secondary"
              icon="phone"
              style={{ flex: 1 }}
              onPress={() => setMethod('phone')}
            />
          ) : (
            <Button
              label="Correo"
              variant="secondary"
              icon="email"
              style={{ flex: 1 }}
              onPress={() => setMethod('email')}
            />
          )}
        </View>

        <AuthFooterLink
          question="¿No tienes cuenta?"
          label="Regístrate"
          onPress={onSwitchToRegister}
        />
      </View>
    </View>
  )
}

export default LoginForm
