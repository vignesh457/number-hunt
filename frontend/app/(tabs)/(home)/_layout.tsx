import MyCustomHeaderComponent from '@/components/MyCustomHeaderComponent';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function HomeLayout() {
  return (
    <>
      <Stack 
        screenOptions={{
          contentStyle: { backgroundColor: '#000' },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen name="soloGame" options={{ headerShown: false }} />
        <Stack.Screen name="result" options={{ headerShown: false }} />
        <Stack.Screen name="soloResult" options={{ headerShown: false }} />
        <Stack.Screen name="createRoom" options={{ headerShown: false }} />
        <Stack.Screen name="joinRoom" options={{ headerShown: false }} />
        <Stack.Screen name="lobby" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
