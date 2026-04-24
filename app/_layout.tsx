import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f8fafc',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0b1120' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'UGC Personal Assistant' }} />
        <Stack.Screen name="ideas" options={{ title: 'Content Ideas' }} />
        <Stack.Screen name="scripts" options={{ title: 'Script Generator' }} />
        <Stack.Screen name="calendar" options={{ title: 'Content Calendar' }} />
      </Stack>
    </SafeAreaProvider>
  )
}
