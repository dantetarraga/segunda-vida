import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'
import { Icon } from '@/components/ui/icon'

export default function AuthIndexScreen() {
  const [keepSession, setKeepSession] = useState(true)

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 items-center justify-between">
        <View className="mt-12 items-center">
          <View className="h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-primary">
            <Icon name="pets" size={32} color={Colors.surface} />
          </View>

          <Text className="mt-6 text-4xl font-extrabold text-ink">Bienvenido de vuelta</Text>

          <Text className="mt-2 text-center text-sm text-ink-3">
            Ingresa para seguir ayudando a los animales
          </Text>
        </View>
      </View>

      <View className="gap-4 px-screen pb-8">
        <Button
          label="Iniciar sesión con Google"
          variant="secondary"
          fullWidth
          iconPosition="left"
          iconLibrary="antdesign"
          icon="google"
        />
        <View className="flex-row items-center gap-3">
          <View className="flex-1 border-t border-border" />
          <Text className="text-sm text-ink-3">o</Text>
          <View className="flex-1 border-t border-border" />
        </View>
        <View className="w-full flex-row gap-3">
          <Button
            label="Teléfono"
            variant="secondary"
            iconPosition="left"
            icon="phone"
            style={{ flex: 1 }}
            onPress={() => router.push('/(auth)/login?method=phone')}
          />
          <Button
            label="Correo"
            variant="secondary"
            iconPosition="left"
            icon="email"
            style={{ flex: 1 }}
            onPress={() => router.push('/(auth)/login?method=email')}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.surface2,
            padding: 14,
            borderRadius: 14,
            flexDirection: 'row',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <Pressable
            onPress={() => setKeepSession(v => !v)}
            hitSlop={8}
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              backgroundColor: Colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 1,
            }}
          >
            {keepSession && <Icon name="check" size={16} color={Colors.primary} />}
          </Pressable>
          <View style={{ flex: 1, gap: 4 }}>
            <Text className="text-sm font-bold text-ink">Sesión persistente</Text>
            <Text className="text-sm text-ink-3">
              Mantenemos tu sesión activa para que recibas alertas aunque cierres la app.
            </Text>
          </View>
        </View>

        <Text className="mt-3 text-center text-sm text-ink-2">
          Al continuar aceptas nuestros <Text className="font-bold text-ink">Términos</Text> y la{' '}
          <Text className="font-bold text-ink">Política de privacidad</Text>
        </Text>
      </View>

      <RadialGlow />
    </SafeAreaView>
  )
}
