// RoomScreen.js
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import { useRouteDebugger } from '@/hooks/useRouteDebugger';
import { useAppSelector } from '@/redux/hook';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CreateRoom() {
  // useRouteDebugger();
  console.log("CreateRoom");
  const [copied, setCopied] = useState(false);
  const {roomCode} = useAppSelector((state)=> state.game);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const handleCreateRoom = () => {
    console.log("lobby room clicked from createRoom");
    router.push('/lobby');
  };

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-[#1A3E5E]'>
        <GameSelectCard title="Room Created!" description="Share this code with your friend to join the game:" image={images.success}> 
        <View className="h-auto w-full flex items-center justify-center gap-4">
          <View className='flex gap-4 items-center justify-center rounded-2xl p-2 h-40 bg-blue-100 w-[90%]' style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(55, 55, 55, 0.2) 2px 2px 10px inset'
          }}>
            <Text className='text-2xl font-NunitoBold text-blue-600'>{roomCode}</Text>
            <TouchableOpacity className="flex-row items-center justify-center rounded-2xl bg-white/80 p-2 h-12 w-[90%]" style={{
              boxShadow: 'rgba(50, 50, 93, 0.2) 3px 3px 15px'
            }}
              onPress={handleCopy} 
            >
              <MaterialIcons name={copied ? 'check' : 'content-copy'} size={18} color="#2563eb" className='mr-2' />
              <Text className='text-lg font-Nunito text-[#2563eb]'>
                {copied ? 'Copied!' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row items-center justify-center rounded-2xl p-2 h-12 bg-blue-200 w-[90%]" style={{
          boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
          }}
            onPress={handleCreateRoom}
          >
            <Text className="text-blue-600 font-NunitoBold text-md">
              Enter Lobby
            </Text>
          </TouchableOpacity>
        </View> 
      </GameSelectCard>
    </SafeAreaView>
  )
}