import MyCustomHeaderComponent from '@/components/MyCustomHeaderComponent';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function HomeLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{
            title: 'Game',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} />
          }} />
        <Stack.Screen name="soloGame" options={{
            title: 'Solo Game',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} />
        }} />
        <Stack.Screen name="result" options={{
            title: 'Result',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} /> 
          }} />
        <Stack.Screen name="createRoom" options={{
            title: 'Create Room',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} /> 
          }} />
        <Stack.Screen name="joinRoom" options={{
            title: 'Join Room',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} /> 
          }} />
        <Stack.Screen name="lobby" options={{
            title: 'Lobby',
            header: ({ options }) => <MyCustomHeaderComponent title={options.title} />
        }} />
      </Stack>
    </>
  );
}
