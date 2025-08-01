import { Stack } from 'expo-router';

export default function RootLayout() {
  
  return (
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
      </Stack>
  );
}
