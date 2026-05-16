import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { Colors } from '@/constants/theme'

const FEATURES = [
  {
    icon: 'campaign' as const,
    iconColor: Colors.primary,
    iconBg: Colors.primarySoft,
    title: 'Reportar un caso',
    description: 'Foto y ubicación en segundos. El caso queda en el mapa para que todos lo vean.',
  },
  {
    icon: 'volunteer-activism' as const,
    iconColor: Colors.secondary,
    iconBg: Colors.secondarySoft,
    title: 'Ir al rescate',
    description: 'Si puedes ir, toma el caso. El sistema te guía hasta el animal.',
  },
  {
    icon: 'pets' as const,
    iconColor: Colors.stateResolved,
    iconBg: Colors.stateResolvedSoft,
    title: 'Adoptar',
    description: 'Animales recuperados listos para un hogar. Conectamos sin burocracia.',
  },
  {
    icon: 'favorite' as const,
    iconColor: Colors.primary,
    iconBg: Colors.primarySoft,
    title: 'Aportar',
    description: 'Financia alimento y medicina. Cada sol va directo al albergue.',
  },
]

export default function FeaturesScreen() {
  return (
    <View className="flex-1 bg-canvas">
      {/* Back */}
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        className="mx-[18px] mt-2 h-11 w-11 items-center justify-center rounded-full"
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={22} color={Colors.ink} />
      </Pressable>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8 gap-2">
          <Text className="font-manrope-xb text-h1 text-ink">¿Cómo funciona?</Text>
          <Text className="font-manrope-md text-body text-ink-2">Segunda Vida en 4 acciones.</Text>
        </View>

        {/* Features */}
        <View className="gap-6">
          {FEATURES.map((f) => (
            <View key={f.title} className="flex-row items-start gap-4">
              <View
                className="items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: f.iconBg }}
              >
                <MaterialIcons name={f.icon} size={22} color={f.iconColor} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="font-manrope-bd text-h3 text-ink">{f.title}</Text>
                <Text className="font-manrope text-body text-ink-2">{f.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTAs */}
      <View className="gap-3 border-t border-border px-[18px] pb-8 pt-4">
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          className="h-[52px] items-center justify-center rounded-lg bg-primary"
          onPress={() => router.replace('/(auth)/register')}
        >
          <Text className="font-manrope-sb text-[15.5px] text-white">Crear cuenta</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          className="h-11 items-center justify-center"
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text className="font-manrope-md text-body text-ink-2">Ya tengo cuenta</Text>
        </Pressable>
      </View>
    </View>
  )
}
