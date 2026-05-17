import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false)
  return (
    <View className="gap-1">
      <Text className="font-manrope-sb text-[12.5px] text-ink-2">{label}</Text>
      <TextInput
        placeholderTextColor={Colors.ink3}
        className="bg-surface px-4 font-manrope text-body text-ink"
        style={{
          height: 44,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: focused ? Colors.primary : Colors.borderStrong,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </View>
  )
}

export default function LoginScreen() {
  const [keepSession, setKeepSession] = useState(true)

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 items-center justify-between">
        <View className="mt-12 items-center">
          <View className="h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-primary">
            <MaterialIcons name="pets" size={32} color={Colors.surface} />
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
            label="Telefono"
            variant="secondary"
            iconPosition="left"
            icon="phone"
            fullWidth
            style={{ flex: 1 }}
          />
          <Button
            label="Correo"
            variant="secondary"
            iconPosition="left"
            icon="email"
            fullWidth
            style={{ flex: 1 }}
          />
        </View>
        <Pressable className="flex-row gap-3" onPress={() => setKeepSession(v => !v)}>
          <MaterialIcons
            name={keepSession ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color={keepSession ? Colors.primary : Colors.borderStrong}
          />
          <View className="flex-1 gap-1">
            <Text className="text-sm font-bold text-ink">Sesión persistente</Text>
            <Text className="text-sm text-ink-3">
              Mantenemos tu sesión activa para que recibas alertas aunque cierres la app.
            </Text>
          </View>
        </Pressable>
      </View>

      <RadialGlow />
    </SafeAreaView>
  )
}
