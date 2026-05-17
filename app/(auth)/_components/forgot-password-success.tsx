import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Colors } from '@/constants/theme'
import { Icon } from '@/components/ui/icon'

interface ForgotPasswordSuccessProps {
  onBack: () => void
}

export const ForgotPasswordSuccess = ({ onBack }: ForgotPasswordSuccessProps) => (
  <View className="flex-1 items-center justify-center px-screen pb-8 pt-6">
    <View className="w-full items-center gap-6">
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 24,
          backgroundColor: Colors.secondarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="mark-email-read" size={32} color={Colors.secondary} />
      </View>

      <View className="items-center gap-2">
        <Text className="text-h1 font-manrope-xb text-ink text-center">
          Revisa tu bandeja de entrada
        </Text>
        <Text className="text-body text-ink-3 text-center">
          Te enviamos un correo con las instrucciones para restablecer tu contraseña.
        </Text>
      </View>

      <Button
        label="Volver al inicio de sesión"
        variant="primary"
        size="lg"
        fullWidth
        onPress={onBack}
        accessibilityLabel="Volver al inicio de sesión"
        accessibilityRole="button"
      />
    </View>
  </View>
)
