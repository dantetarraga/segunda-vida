import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@/components/ui/icon'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'
import { getKeepSession, setKeepSession } from '@/lib/storage'
import { type Method } from './_constants/method-config'
import AuthMethodPicker from './_components/auth-method-picker'
import { LoginForm } from './_components/login-form'
import { RegisterForm } from './_components/register-form'

type Step = 'login-picker' | 'login-form' | 'register-picker' | 'register-form'

export default function AuthIndexScreen() {
  const [step, setStep] = useState<Step>('login-picker')
  const [method, setMethod] = useState<Method>('email')
  const [keepSession, setKeepSessionState] = useState(true)

  useEffect(() => {
    getKeepSession().then(setKeepSessionState)
  }, [])

  const handleKeepSessionChange = async (value: boolean) => {
    setKeepSessionState(value)
    await setKeepSession(value)
  }

  const handleBack = () => {
    if (step === 'login-form') setStep('login-picker')
    else if (step === 'register-picker') setStep('login-picker')
    else if (step === 'register-form') setStep('register-picker')
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step !== 'login-picker' && (
            <View className="px-screen pt-4">
              <Pressable
                onPress={handleBack}
                hitSlop={12}
                className="h-10 w-10 items-center justify-center rounded-xl bg-surface"
              >
                <Icon name="arrow-back" size={20} color={Colors.ink} />
              </Pressable>
            </View>
          )}

          {step === 'login-picker' && (
            <AuthMethodPicker
              icon="pets"
              title="Bienvenido de vuelta"
              subtitle="Ingresa para seguir ayudando a los animales"
              googleLabel="Iniciar sesión con Google"
              buttons={[
                { label: 'Teléfono', icon: 'phone', variant: 'secondary', onPress: () => { setMethod('phone'); setStep('login-form') } },
                { label: 'Correo', icon: 'email', variant: 'secondary', onPress: () => { setMethod('email'); setStep('login-form') } },
              ]}
              extras={
                <Checkbox
                  checked={keepSession}
                  onChange={handleKeepSessionChange}
                  size={24}
                  label={
                    <View style={{ gap: 2 }}>
                      <Text className="text-sm font-bold text-ink">Sesión persistente</Text>
                      <Text className="text-sm text-ink-3">
                        Mantenemos tu sesión activa para que recibas alertas aunque cierres la app.
                      </Text>
                    </View>
                  }
                />
              }
              footerQuestion="¿No tienes cuenta?"
              footerLabel="Regístrate"
              onFooterPress={() => setStep('register-picker')}
            />
          )}

          {step === 'login-form' && (
            <LoginForm
              onSuccess={() => router.replace('/(tabs)')}
              onSwitchToRegister={() => setStep('register-picker')}
            />
          )}

          {step === 'register-picker' && (
            <AuthMethodPicker
              icon="pets"
              title="Crear cuenta"
              subtitle="Únete a la red que rescata, cuida y encuentra hogar para los animalitos de Lima."
              googleLabel="Continuar con Google"
              buttons={[
                { label: 'Correo', icon: 'email', variant: 'primary', onPress: () => { setMethod('email'); setStep('register-form') } },
                { label: 'Teléfono', icon: 'phone', variant: 'primary', onPress: () => { setMethod('phone'); setStep('register-form') } },
              ]}
              footerQuestion="¿Ya tienes cuenta?"
              footerLabel="Inicia sesión"
              onFooterPress={() => setStep('login-picker')}
            />
          )}

          {step === 'register-form' && (
            <RegisterForm
              method={method}
              onSuccess={() => router.replace('/(tabs)')}
              onSwitchToLogin={() => setStep('login-picker')}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <RadialGlow />
    </SafeAreaView>
  )
}
