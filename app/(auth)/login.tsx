import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/theme'

function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false)
  return (
    <View className="gap-1">
      <Text className="font-manrope-sb text-[12.5px] text-ink-2">{label}</Text>
      <TextInput
        placeholderTextColor={Colors.ink3}
        className="font-manrope text-body text-ink bg-surface px-4"
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 48, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-10 gap-2">
            <Text className="font-manrope-xb text-h1 text-ink">Bienvenido de vuelta</Text>
            <Text className="font-manrope-md text-body text-ink-2">Ingresa con tu cuenta.</Text>
          </View>

          {/* Formulario */}
          <View className="gap-4">
            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Field
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="current-password"
            />
            <Pressable className="items-end" onPress={() => {}}>
              <Text className="font-manrope-md text-caption text-primary">
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>
          </View>

          {/* CTAs */}
          <View className="mt-8 gap-3">
            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              className="bg-primary h-[52px] items-center justify-center rounded-lg"
              onPress={() => router.replace('/(tabs)')}
            >
              <Text className="font-manrope-sb text-[15.5px] text-white">Iniciar sesión</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              className="border-border-strong bg-surface h-[52px] flex-row items-center justify-center gap-3 rounded-lg border"
              onPress={() => {}}
            >
              <AntDesign name="google" size={18} color={Colors.ink} />
              <Text className="font-manrope-sb text-[15.5px] text-ink">
                Continuar con Google
              </Text>
            </Pressable>
          </View>

          {/* Link a registro */}
          <View className="mt-8 flex-row items-center justify-center gap-1">
            <Text className="font-manrope-md text-body text-ink-2">¿No tienes cuenta?</Text>
            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              onPress={() => router.replace('/(auth)/register')}
            >
              <Text className="font-manrope-sb text-body text-primary">Regístrate</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
