import { useState } from 'react'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { PasswordStrengthBar } from '@/components/ui/password-strength-bar'
import { FormError } from '@/components/form-error'
import { FormInput } from '@/components/form-input'
import { Colors } from '@/constants/theme'
import { METHOD_CONFIG, type Method } from '../_constants/method-config'
import { useRegisterEmailForm, useRegisterPhoneForm } from '../_hooks/use-register-form'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

interface RegisterFormProps {
  method: Method
  onMethodChange: (method: Method) => void
  onSuccess: (method: Method, contact: string) => void
  onSwitchToLogin: (currentMethod: Method) => void
  onGoogle?: () => void
}

interface RegisterFormFooterProps {
  method: Method
  onMethodChange: (method: Method) => void
  onSwitchToLogin: (currentMethod: Method) => void
  onGoogle?: () => void
  rootError?: string
  isSubmitting: boolean
  onSubmit: () => void
}

const RegisterFormFooter = ({
  method,
  onMethodChange,
  onSwitchToLogin,
  onGoogle,
  rootError,
  isSubmitting,
  onSubmit,
}: RegisterFormFooterProps) => (
  <View className="gap-4 pt-8">
    <FormError message={rootError} />

    <Button
      label="Crear cuenta"
      variant="primary"
      size="lg"
      fullWidth
      loading={isSubmitting}
      onPress={onSubmit}
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
      {method === 'email' ? (
        <Button
          label="Teléfono"
          variant="secondary"
          icon="phone"
          style={{ flex: 1 }}
          onPress={() => onMethodChange('phone')}
          accessibilityLabel="Cambiar a registro con teléfono"
          accessibilityRole="button"
        />
      ) : (
        <Button
          label="Correo"
          variant="secondary"
          icon="email"
          style={{ flex: 1 }}
          onPress={() => onMethodChange('email')}
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
)

interface TermsCheckboxProps {
  accepted: boolean
  showError: boolean
  onAcceptedChange: (v: boolean) => void
}

const TermsCheckbox = ({ accepted, showError, onAcceptedChange }: TermsCheckboxProps) => (
  <View className="gap-1">
    <Checkbox
      checked={accepted}
      onChange={onAcceptedChange}
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
    {showError && (
      <Text
        style={{ fontSize: 12, fontFamily: 'Manrope_600SemiBold', color: Colors.urgencyHigh, marginLeft: 4 }}
        accessibilityRole="alert"
      >
        Debes aceptar los términos para continuar
      </Text>
    )}
  </View>
)

const RegisterEmailForm = ({
  onMethodChange,
  onSuccess,
  onSwitchToLogin,
  onGoogle,
}: Omit<RegisterFormProps, 'method'>) => {
  const [accepted, setAccepted] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)

  const config = METHOD_CONFIG.email
  const { control, errors, isSubmitting, password, onSubmit } = useRegisterEmailForm(
    (contact) => onSuccess('email', contact),
  )

  const handleSubmitGuarded = () => {
    if (!accepted) { setShowTermsError(true); return }
    setShowTermsError(false)
    onSubmit()
  }

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader
          icon={config.icon}
          title="Crea tu cuenta con correo"
          subtitle="Ingresa tu correo y elige una contraseña para empezar."
        />

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

          <View className="gap-2">
            <FormInput
              control={control}
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              secureTextEntry
              autoComplete="new-password"
              required
            />
            <PasswordStrengthBar password={password} />
          </View>

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirmar contraseña"
            placeholder="••••••••"
            secureTextEntry
            autoComplete="new-password"
            required
          />
        </View>

        <TermsCheckbox
          accepted={accepted}
          showError={showTermsError}
          onAcceptedChange={(v) => { setAccepted(v); if (v) setShowTermsError(false) }}
        />
      </View>

      <RegisterFormFooter
        method="email"
        onMethodChange={onMethodChange}
        onSwitchToLogin={onSwitchToLogin}
        onGoogle={onGoogle}
        rootError={errors.root?.message}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitGuarded}
      />
    </View>
  )
}

const RegisterPhoneForm = ({
  onMethodChange,
  onSuccess,
  onSwitchToLogin,
  onGoogle,
}: Omit<RegisterFormProps, 'method'>) => {
  const [accepted, setAccepted] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)

  const config = METHOD_CONFIG.phone
  const { control, errors, isSubmitting, password, onSubmit } = useRegisterPhoneForm(
    (contact) => onSuccess('phone', contact),
  )

  const handleSubmitGuarded = () => {
    if (!accepted) { setShowTermsError(true); return }
    setShowTermsError(false)
    onSubmit()
  }

  return (
    <View className="flex-1 justify-between px-screen pb-8 pt-6">
      <View className="gap-6">
        <AuthHeader
          icon={config.icon}
          title="Crea tu cuenta con número"
          subtitle="Ingresa tu número y elige una contraseña para empezar."
        />

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

          <View className="gap-2">
            <FormInput
              control={control}
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              secureTextEntry
              autoComplete="new-password"
              required
            />
            <PasswordStrengthBar password={password} />
          </View>

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirmar contraseña"
            placeholder="••••••••"
            secureTextEntry
            autoComplete="new-password"
            required
          />
        </View>

        <TermsCheckbox
          accepted={accepted}
          showError={showTermsError}
          onAcceptedChange={(v) => { setAccepted(v); if (v) setShowTermsError(false) }}
        />
      </View>

      <RegisterFormFooter
        method="phone"
        onMethodChange={onMethodChange}
        onSwitchToLogin={onSwitchToLogin}
        onGoogle={onGoogle}
        rootError={errors.root?.message}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitGuarded}
      />
    </View>
  )
}

export const RegisterForm = ({ method, ...props }: RegisterFormProps) => {
  if (method === 'email') return <RegisterEmailForm {...props} />
  return <RegisterPhoneForm {...props} />
}
