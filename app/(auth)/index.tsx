import { router } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Icon } from '@/components/ui/icon'
import RadialGlow from '@/components/ui/radial-glow'
import { Colors } from '@/constants/theme'
import { type Method } from './_constants/method-config'
import AuthMethodPicker, { type Intent } from './_components/auth-method-picker'
import { LoginForm } from './_components/login-form'
import { RegisterForm } from './_components/register-form'

type Step = 'picker' | 'login-form' | 'register-form'

export default function AuthIndexScreen() {
  const [step, setStep] = useState<Step>('picker')
  const [intent, setIntent] = useState<Intent>('login')
  const [method, setMethod] = useState<Method>('email')

  const handleSelectMethod = (m: Method) => {
    setMethod(m)
    setStep(intent === 'login' ? 'login-form' : 'register-form')
  }

  const handleBack = () => setStep('picker')

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
          {step !== 'picker' && (
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

          {step === 'picker' && (
            <AuthMethodPicker
              intent={intent}
              onIntentChange={setIntent}
              onSelectMethod={handleSelectMethod}
            />
          )}

          {step === 'login-form' && (
            <LoginForm
              initialMethod={method}
              onSuccess={() => router.replace('/(tabs)')}
              onSwitchToRegister={() => { setIntent('register'); setStep('picker') }}
            />
          )}

          {step === 'register-form' && (
            <RegisterForm
              method={method}
              onSuccess={() => router.replace('/(tabs)')}
              onSwitchToLogin={() => { setIntent('login'); setStep('picker') }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <RadialGlow />
    </SafeAreaView>
  )
}
