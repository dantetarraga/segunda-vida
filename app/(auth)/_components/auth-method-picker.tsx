import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import type { Method } from '../_constants/method-config'
import { AuthHeader } from './auth-header'

interface AuthMethodPickerProps {
  onSelectMethod: (method: Method) => void
  onGoogle?: () => void
}

export const AuthMethodPicker = ({ onSelectMethod, onGoogle }: AuthMethodPickerProps) => (
  <>
    <View className="flex-1 items-center justify-center px-screen">
      <AuthHeader
        icon="pets"
        title="Bienvenido a Segunda Vida"
        subtitle="Únete a la red que rescata, cuida y encuentra hogar para los animales."
        align="center"
        size="lg"
      />
    </View>

    <View className="gap-4 px-screen pb-8">
      <Button
        label="Continuar con Google"
        variant="secondary"
        fullWidth
        iconLibrary="custom"
        icon="google"
        onPress={onGoogle}
        accessibilityLabel="Continuar con Google"
        accessibilityRole="button"
      />

      <Divider />

      <View className="flex-row gap-3">
        <Button
          label="Correo"
          variant="primary"
          icon="email"
          style={{ flex: 1 }}
          onPress={() => onSelectMethod('email')}
          accessibilityLabel="Continuar con correo electrónico"
          accessibilityRole="button"
        />
        <Button
          label="Teléfono"
          variant="primary"
          icon="phone"
          style={{ flex: 1 }}
          onPress={() => onSelectMethod('phone')}
          accessibilityLabel="Continuar con número de teléfono"
          accessibilityRole="button"
        />
      </View>

      <Text className="text-center text-body text-ink-3">
        Al continuar aceptas nuestros{' '}
        <Text className="font-manrope-sb text-ink">Términos</Text> y la{' '}
        <Text className="font-manrope-sb text-ink">Política de privacidad</Text>
      </Text>
    </View>
  </>
)
