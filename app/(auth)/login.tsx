import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Colors } from '@/constants/theme'
import { Icon } from '@/components/ui/icon'

type Method = 'email' | 'phone'

const METHOD_CONFIG = {
  email: {
    label: 'Correo electrónico',
    placeholder: 'tu@correo.com',
    keyboardType: 'email-address' as const,
    autoComplete: 'email' as const,
  },
  phone: {
    label: 'Número de teléfono',
    placeholder: '+51 999 999 999',
    keyboardType: 'phone-pad' as const,
    autoComplete: 'tel' as const,
  },
}


export default function LoginScreen() {
  const { method: initialMethod } = useLocalSearchParams<{ method: Method }>()
  const [method, setMethod] = useState<Method>(initialMethod ?? 'email')

  const config = METHOD_CONFIG[method]

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-screen pt-4">
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              className="h-10 w-10 items-center justify-center rounded-xl bg-surface"
            >
              <Icon name="arrow-back" size={20} color={Colors.ink} />
            </Pressable>
          </View>

          <View className="flex-1 justify-between px-screen pb-8 pt-8">
            <View className="gap-6">
              <View className="gap-1">
                <Text className="text-3xl font-extrabold text-ink">Iniciar sesión</Text>
                <Text className="text-sm text-ink-3">Ingresa tus datos para continuar</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.surface2,
                  borderRadius: 12,
                  padding: 4,
                  gap: 4,
                }}
              >
                {(['email', 'phone'] as Method[]).map((m) => (
                  <Pressable
                    key={m}
                    onPress={() => setMethod(m)}
                    style={{
                      flex: 1,
                      height: 36,
                      borderRadius: 9,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: method === m ? Colors.surface : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontFamily: 'Manrope_600SemiBold',
                        color: method === m ? Colors.ink : Colors.ink3,
                      }}
                    >
                      {m === 'email' ? 'Correo' : 'Teléfono'}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="gap-4">
                <Input
                  label={config.label}
                  placeholder={config.placeholder}
                  keyboardType={config.keyboardType}
                  autoCapitalize="none"
                  autoComplete={config.autoComplete}
                />
                <Input
                  label="Contraseña"
                  placeholder="••••••••"
                  secureTextEntry
                  autoComplete="current-password"
                />
                <Pressable className="items-end" hitSlop={8}>
                  <Text className="text-sm text-primary">¿Olvidaste tu contraseña?</Text>
                </Pressable>
              </View>
            </View>

            <View className="gap-3 pt-8">
              <Button
                label="Iniciar sesión"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => router.replace('/(tabs)')}
              />
              <View className="flex-row items-center justify-center gap-1">
                <Text className="text-sm text-ink-3">¿No tienes cuenta?</Text>
                <Pressable hitSlop={8} onPress={() => router.replace('/(auth)/register')}>
                  <Text className="text-sm font-bold text-primary">Regístrate</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
