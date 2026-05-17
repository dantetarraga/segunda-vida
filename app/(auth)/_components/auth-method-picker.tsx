import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { Colors, Duration } from '@/constants/theme'
import type { Method } from '../_constants/method-config'
import { AuthDivider } from './auth-divider'
import { AuthHeader } from './auth-header'

export type Intent = 'login' | 'register'

const INTENT_CONFIG = {
  login: {
    title: 'Bienvenido de vuelta',
    subtitle: 'Ingresa para seguir ayudando a los animales',
    googleLabel: 'Iniciar sesión con Google',
    buttons: [
      { label: 'Correo',   icon: 'email', method: 'email' },
      { label: 'Teléfono', icon: 'phone', method: 'phone' },
    ] as const,
  },
  register: {
    title: 'Crear cuenta',
    subtitle: 'Únete a la red que rescata, cuida y encuentra hogar para los animalitos de Lima.',
    googleLabel: 'Continuar con Google',
    buttons: [
      { label: 'Correo',   icon: 'email', method: 'email' },
      { label: 'Teléfono', icon: 'phone', method: 'phone' },
    ] as const,
  },
}

interface AuthMethodPickerProps {
  intent: Intent
  onIntentChange: (intent: Intent) => void
  onSelectMethod: (method: Method) => void
  onGoogle?: () => void
}

const AuthMethodPicker = ({
  intent,
  onIntentChange,
  onSelectMethod,
  onGoogle,
}: AuthMethodPickerProps) => {
  const c = INTENT_CONFIG[intent]
  const [tabWidth, setTabWidth] = useState(0)

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withTiming(
        intent === 'login' ? 0 : tabWidth,
        { duration: Duration.toggle },
      ),
    }],
  }))

  return (
    <>
      <View className="flex-1 items-center justify-center px-screen">
        <Animated.View
          key={intent}
          entering={FadeIn.duration(Duration.toggle)}
          exiting={FadeOut.duration(Duration.focusRing)}
        >
          <AuthHeader icon="pets" title={c.title} subtitle={c.subtitle} align="center" size="lg" />
        </Animated.View>
      </View>

      <View className="gap-4 px-screen pb-8">
        <View
          onLayout={e => setTabWidth(e.nativeEvent.layout.width / 2)}
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.surface2,
            borderRadius: 12,
            padding: 4,
          }}
        >
          <Animated.View
            style={[
              indicatorStyle,
              {
                position: 'absolute',
                top: 4,
                bottom: 4,
                left: 4,
                width: tabWidth - 4,
                borderRadius: 9,
                backgroundColor: Colors.surface,
              },
            ]}
          />
          {(['login', 'register'] as Intent[]).map(i => (
            <Pressable
              key={i}
              onPress={() => onIntentChange(i)}
              style={{ flex: 1, height: 36, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text
                style={{
                  fontSize: 13.5,
                  fontFamily: 'Manrope_600SemiBold',
                  color: intent === i ? Colors.ink : Colors.ink3,
                }}
              >
                {i === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Animated.View
          key={`google-${intent}`}
          entering={FadeIn.duration(Duration.toggle)}
          exiting={FadeOut.duration(Duration.focusRing)}
        >
          <Button
            label={c.googleLabel}
            variant="secondary"
            fullWidth
            iconLibrary="antdesign"
            icon="google"
            onPress={onGoogle}
          />
        </Animated.View>

        <AuthDivider />

        <View className="flex-row gap-3">
          {c.buttons.map(btn => (
            <Button
              key={btn.method}
              label={btn.label}
              variant="primary"
              icon={btn.icon}
              style={{ flex: 1 }}
              onPress={() => onSelectMethod(btn.method)}
            />
          ))}
        </View>

        <Text className="text-center text-sm text-ink-2">
          Al continuar aceptas nuestros{' '}
          <Text className="font-bold text-ink">Términos</Text> y la{' '}
          <Text className="font-bold text-ink">Política de privacidad</Text>
        </Text>
      </View>
    </>
  )
}

export default AuthMethodPicker
