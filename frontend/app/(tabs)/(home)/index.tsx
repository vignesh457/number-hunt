import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import { useRouteDebugger } from '@/hooks/useRouteDebugger';
import { useSocketListeners } from '@/hooks/useSocketListener';
import { setGameConfig } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showAlert } from '@/redux/uiSlice';
import { socket } from '@/utils/socket';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  useSocketListeners();
  const {username, id, isAuthenticated} = useAppSelector((state) => state.user);
  if (!isAuthenticated) {
      return <Redirect href="/signIn" />;
  }

  const dispatch = useAppDispatch();

  const handleCreatePress = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    socket.emit("create_room", { roomCode: code, name: username, userId: id }, (response: any) => {
        if (!response.success) {
          dispatch(showAlert({ type: "error", message: response.message }));
          return; // 🚫 Stop if failed
        }

        // ✅ Only proceed if room creation succeeded
        dispatch(setGameConfig({ roomCode: code, mode: "friend" }));
        router.push("/createRoom");
      }
    );
  };

  const handleJoinPress = () => {
      router.push('/joinRoom');
  };

  const handleSoloPress = () => {
    router.push('/soloGame');
    dispatch(setGameConfig({ mode : 'ai'}));
  };

  
  return (
    <SafeAreaView className='flex-1 items-center justify-center gap-4 bg-[#1A3E5E]'>
      <GameSelectCard title="Play with Friends" description="Create a private room or join with a code. It won’t affect your rank." image={images.friend}>
       <View className="h-auto w-full flex items-center justify-center gap-4">
        <TouchableOpacity className="flex-row items-center justify-center rounded-md p-2 h-12 bg-[#BFDBFE] w-[90%]" style={{
        boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
        }}
        onPress={handleCreatePress}
        >
          <Entypo name="plus" size={16} color="#2563eb" className='mr-2'/>
          <Text className="text-blue-600 font-NunitoBold text-md">
            Create Room
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center rounded-md bg-white/80 p-2 h-12 w-[90%]" style={{
        boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px'
        }}
        onPress={handleJoinPress}
        >
          <Ionicons name="arrow-forward" size={16} color="#2563eb" className='mr-2'/>
          <Text className="text-blue-600 font-NunitoBold text-md">
            Join Room
          </Text>
        </TouchableOpacity>
      </View> 
      </GameSelectCard>
      <GameSelectCard title="Play Online" description="Play worldwide, score points, top leaderboard, and prove your speed!" image={images.world}>
       <View className="h-auto w-full flex items-center justify-center gap-4">
        <TouchableOpacity className="flex-row items-center justify-center rounded-md p-2 h-12 bg-blue-200 w-[90%]" style={{
        boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
        }}
        onPress={handleSoloPress}
        >
          <Ionicons name="search" size={16} color="#2563eb" className='mr-2'/>
          <Text className="text-blue-600 font-NunitoBold text-md">
            Solo Hunting
          </Text>
        </TouchableOpacity>
      </View> 
      </GameSelectCard>
    </SafeAreaView>
  );
} 