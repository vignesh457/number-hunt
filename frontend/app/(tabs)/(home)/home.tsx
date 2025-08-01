import BackgroundWrapper from '@/components/backgroundWrapper';
import CustomButton from '@/components/CustomButton';
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
  const {username, id} = useAppSelector((state) => state.user);

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
    <BackgroundWrapper className='justify-evenly'>
      <GameSelectCard image={images.playfriends}>
       <View className="h-auto w-full flex items-center justify-center gap-1">
        <CustomButton handleClick={handleCreatePress} btnText="Create Room" />
        <CustomButton handleClick={handleJoinPress} btnText="Join Room" />
      </View> 
      </GameSelectCard>
      <GameSelectCard image={images.playsingle}>
       <View className="h-auto w-full flex items-center justify-center gap-4">
        <CustomButton handleClick={handleSoloPress} btnText="Test your Reflex" type="secondary" className='opacity-90' />
      </View> 
      </GameSelectCard>
    </BackgroundWrapper>
  );
} 