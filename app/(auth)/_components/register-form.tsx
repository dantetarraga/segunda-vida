import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Colors } from '@/constants/theme'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { registerEmailSchema, registerPhoneSchema, type RegisterEmailFields, type RegisterPhoneFields } from '../_schemas/auth.schema'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

const REGISTER_COPY = {
  email: {
    title: 'Crea tu cuenta con correo',
    subtitle: 'Te enviaremos un enlace para confirmar que es tuyo.',
  },
  phone: {
    title: 'Crea tu cuenta con número',
    subtitle: 'Te enviaremos un código SMS para confirmar que es tuyo.',
  },
}

type Strength = 0 | 1 | 2 | 3

const STRENGTH_CONFIG = {
  0: { label: '',        color: Colors.borderStrong, segments: 0 },
  1: { label: 'Débil',   color: Colors.urgencyHigh,  segments: 1 },
  2: { label: 'Regular', color: Colors.primary,      segments: 2 },
  3: { label: 'Fuerte',  color: Colors.secondary,    segments: 3 },
} as const

const getStrength = (pwd: string): Strength => {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8)           score++
  if (/[A-Z]/.test(pwd))         score++
  if (/[0-9]/.test(pwd))         score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return (score <= 1 ? 1 : score <= 2 ? 2 : 3) as Strength
}

const PasswordStrengthBar = ({ password }: { password: string }) => {
  if (!password) return null
  const strength = getStrength(password)
  const config = STRENGTH_CONFIG[strength]
  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3].map(i => (
          <View
            key={i}
            style={{
              flex: 1, height: 4, borderRadius: 2,
              backgroundColor: i <= config.segments ? config.color : Colors.borderStrong,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11.5, color: Colors.ink3 }}>
          Mín. 8 caracteres, una mayúscula y un número
        </Text>
        <Text style={{ fontSize: 11.5, fontFamily: 'Manrope_600SemiBold', color: config.color }}>
          {config.label}
        </Text>
      </View>
    </View>
  )
}

interface RegisterFormProps {
  method: Method
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export const RegisterForm = ({ method, onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [accepted, setAccepted] = useState(false)

  const isEmail = method === 'email'
  const config = METHOD_CONFIG[method]
  const copy = REGISTER_COPY[method]
  const schema = isEmail ? registerEmailSchema : registerPhoneSchema

  const { control, handleSubmit, watch, formState: { errors, isSubmitting } } =
    useForm<RegisterEmailFields | RegisterPhoneFields>({ resolver: zodResolver(schema) })

  const password = watch('password') ?? ''

  const onSubmit = async (_data: RegisterEmailFields | RegisterPhoneFields) => {
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

        <Checkbox
          checked={accepted}
          onChange={setAccepted}
          label={
            <Text className="flex-1 text-sm text-ink-2">
              Acepto los{' '}
              <Text className="font-bold text-ink">Términos y condiciones</Text>
              {' '}y la{' '}
              <Text className="font-bold text-ink">Política de privacidad</Text>
            </Text>
          }
        />
      </View>

      <View className="gap-3 pt-8">
        <Button
          label="Crear cuenta"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!accepted}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
        <AuthFooterLink
          question="¿Ya tienes cuenta?"
          label="Inicia sesión"
          onPress={onSwitchToLogin}
        />
      </View>
    </View>
  )
}

export default RegisterForm
