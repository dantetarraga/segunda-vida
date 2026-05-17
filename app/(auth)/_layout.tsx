import { Stack } from 'expo-router'

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
  </Stack>
)

export default AuthLayout
