import type { ReactNode } from 'react'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import type { Variant } from '@/components/ui/button'
import type { MaterialIconName } from '@/components/ui/icon'
import { AuthDivider } from './auth-divider'
import { AuthFooterLink } from './auth-footer-link'
import { AuthHeader } from './auth-header'

interface MethodButton {
  label: string
  icon: MaterialIconName
  variant?: Variant
  onPress: () => void
}

interface AuthMethodPickerProps {
  icon: MaterialIconName
  title: string
  subtitle: string
  googleLabel?: string
  onGoogle?: () => void
  buttons: [MethodButton, MethodButton]
  extras?: ReactNode
  footerQuestion: string
  footerLabel: string
  onFooterPress: () => void
}

const AuthMethodPicker = ({
  icon,
  title,
  subtitle,
  googleLabel = 'Continuar con Google',
  onGoogle,
  buttons,
  extras,
  footerQuestion,
  footerLabel,
  onFooterPress,
}: AuthMethodPickerProps) => (
  <>
    <View className="flex-1 items-center justify-center px-screen">
      <AuthHeader icon={icon} title={title} subtitle={subtitle} align="center" size="lg" />
    </View>

    <View className="gap-4 px-screen pb-8">
      <Button
        label={googleLabel}
        variant="secondary"
        fullWidth
        iconLibrary="antdesign"
        icon="google"
        onPress={onGoogle}
      />

      <AuthDivider />

      <View className="flex-row gap-3">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            label={btn.label}
            variant={btn.variant ?? 'secondary'}
            icon={btn.icon}
            style={{ flex: 1 }}
            onPress={btn.onPress}
          />
        ))}
      </View>

      {extras}

      <Text className="text-center text-sm text-ink-2">
        Al continuar aceptas nuestros{' '}
        <Text className="font-bold text-ink">Términos</Text> y la{' '}
        <Text className="font-bold text-ink">Política de privacidad</Text>
      </Text>

      <AuthFooterLink
        question={footerQuestion}
        label={footerLabel}
        onPress={onFooterPress}
      />
    </View>
  </>
)

export default AuthMethodPicker
