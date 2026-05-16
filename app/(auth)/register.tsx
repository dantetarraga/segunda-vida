import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      {/* Back */}
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        className="mx-[18px] mt-2 h-11 w-11 items-center justify-center rounded-full"
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={22} color={Colors.ink} />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 24, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-10 gap-2">
            <Text className="font-manrope-xb text-h1 text-ink">Crea tu cuenta</Text>
            <Text className="font-manrope-md text-body text-ink-2">
              Únete a la red de rescate de Lima.
            </Text>
          </View>

          {/* Formulario */}
          <View className="gap-4">
            <Field
              label="Nombre"
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              autoCapitalize="words"
              autoComplete="name"
            />
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
              autoComplete="new-password"
            />
          </View>

          {/* CTAs */}
          <View className="mt-8 gap-3">
            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              className="bg-primary h-[52px] items-center justify-center rounded-lg"
              onPress={() => router.replace('/(tabs)')}
            >
              <Text className="font-manrope-sb text-[15.5px] text-white">Crear cuenta</Text>
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

          {/* Link a login */}
          <View className="mt-8 flex-row items-center justify-center gap-1">
            <Text className="font-manrope-md text-body text-ink-2">¿Ya tienes cuenta?</Text>
            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              onPress={() => router.replace('/(auth)/login')}
            >
              <Text className="font-manrope-sb text-body text-primary">Inicia sesión</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
