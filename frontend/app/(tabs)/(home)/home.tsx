import BackgroundWrapper from '@/components/backgroundWrapper';
import CustomButton from '@/components/CustomButton';
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import { useSocketListeners } from '@/hooks/useSocketListener';
import { resetGame, setGameConfig } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showAlert } from '@/redux/uiSlice';
import { socket } from '@/utils/socket';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, View, Image, Text } from 'react-native';
import 'react-native-get-random-values';
import { customAlphabet } from 'nanoid';


export default function HomeScreen() {
  useSocketListeners();
  const { username, id, highScore, rank } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleCreatePress = () => {
    // console.log("create room #####");
    const nanoid = customAlphabet('abcdefghjkmnpqrstuvwxyz23456789', 6);
    const code = nanoid(); // e.g. "BK72NX"
    socket.emit("create_room", { roomCode: code, name: username, userId: id }, (response: any) => {
      if (!response.success) {
        dispatch(showAlert({ type: "error", message: response.message }));
        return;
      }
      dispatch(setGameConfig({ roomCode: code, mode: "friend" }));
      router.push("/createRoom");
    });
  };

  const handleJoinPress = () => {
    // console.log("join room #####");
    router.push('/joinRoom');
  };

  const handleSoloPress = () => {
    // console.log("solo room #####");
    dispatch(setGameConfig({ mode: 'ai' }));
    router.replace('/soloGame');
  };

  return (
    <BackgroundWrapper className='justify-between py-2 gap-2'>
      <View className='w-full h-10 flex flex-row items-center justify-around'>
        <View className='px-4 h-[90%] flex flex-row items-center justify-center bg-primary-200 border-[1px] border-primary-100/60 rounded-2xl gap-1'>
          <Image source={images.coin} className='w-5 h-5' />
          <Text className='text-lg font-NunitoSemiBold text-white'>{highScore}</Text>
        </View>
        <View className='px-4 h-[90%] flex flex-row items-center justify-center bg-success-100 border-[1px] border-primary-100/70 rounded-2xl gap-1'>
          <Image source={images.rank} className='w-6 h-6' />
          <Text className='text-lg font-NunitoSemiBold text-white'>Rank {rank}</Text>
        </View>
      </View>
      
      <ImageBackground source={images.playfriends} resizeMode='cover' className="flex items-center justify-end p-1 w-3/5 h-[300px] rounded-2xl overflow-hidden">
        <Image source={images.online} className='w-7 h-6 absolute top-2 left-1' />
        <View className="h-auto w-full flex items-center justify-center gap-1">
          <CustomButton handleClick={handleCreatePress} btnText="Create Room" className='scale-90'/>
          <CustomButton handleClick={handleJoinPress} btnText="Join Room" className='scale-90'/>
        </View>
      </ImageBackground>

      <ImageBackground source={images.playsingle} resizeMode='cover' className="flex items-center justify-end gap-4 p-2 w-3/5 h-[300px] rounded-2xl bg-black overflow-hidden">
        <Image source={images.offline} className='w-8 h-8 absolute top-2 left-1' />
        <View className="h-auto w-full flex items-center justify-center gap-4">
          <CustomButton handleClick={handleSoloPress} btnText="Beat Reflex" type="secondary" className='scale-90'/>
        </View>
      </ImageBackground>
    </BackgroundWrapper>
  );
}
