import { Tabs } from 'expo-router'

import { Colors } from '@/constants/theme'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary, headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
    </Tabs>
  )
}
