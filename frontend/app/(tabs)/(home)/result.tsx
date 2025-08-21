import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { use, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Easing } from 'react-native';
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { MotiText, MotiView } from 'moti';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { socket } from '@/utils/socket';
import { showAlert } from '@/redux/uiSlice';
import { incrementGamesPlayed, incrementLossCount, incrementWinCount } from '@/redux/userSlice';

export default function ResultScreen() {
  const { myPoints, opponentPoints, roomCode } = useAppSelector((s) => s.game);
  const { me, opponent } = useLocalSearchParams();
  const {username, id} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // console.log(me, opponent, mypoints, opponentPoints);
  const gameArr = ['WIN', 'LOSS', 'TIE'];
  const gameStatus = Number(myPoints) > Number(opponentPoints) ? 1 : Number(myPoints) < Number(opponentPoints) ? 2 : 3;

  useEffect(() => {
    dispatch(incrementGamesPlayed());
    if(gameStatus === 1) {
      dispatch(incrementWinCount());
    }
    if(gameStatus === 2) {
      dispatch(incrementLossCount());
    }
  }, []);

  const handleCreatePress = () => {
    socket.emit("create_room", { roomCode: roomCode, name: username, userId: id }, (response: any) => {
      if (!response.success) {
        socket.emit(
          "join_room",
          { roomCode, name: username, userId: id },
          (response: any) => {
            if (!response.success) {
              dispatch(showAlert({ type: "error", message: response.message }));
              return; // 🚫 Stop here if error
            }
            router.push("/lobby");
          }
        );
        return;
      }
      router.push("/lobby");
    });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#001428]">
      <View className="h-full w-full flex items-center justify-center">
          <View className='w-full h-[50%] flex items-center justify-evenly rounded-3xl pt-8'>
            <MotiText
              from={{ scale: 0.90 }}
              animate={{ scale: 1.10 }}
              transition={{
                type: 'timing',
                duration: 1000,
                repeat: Infinity,
                repeatReverse: true,
              }}
              className={`absolute top-2 z-10 text-8xl w-full font-NunitoSemiBold text-center text-${gameStatus===1 ? 'success' : gameStatus===3 ? 'primary' : 'error'}-100`}
            >
              {gameArr[gameStatus-1]}
            </MotiText>
            <MotiView
              from={{ translateY: -10 }}
              animate={{ translateY: 10 }}
              transition={{
                type: 'timing',
                duration: 1000,
                repeat: Infinity,
                repeatReverse: true,
              }}
              className="flex items-center justify-center w-full h-full"
            >
              <Image source={images[gameStatus===1 ? 'win' : gameStatus===3 ? 'tie' : 'loss']} resizeMode='contain' className='h-full' />
            </MotiView>
          </View>
          <View className="w-full h-[50%] flex items-center justify-center rounded-2xl p-4 gap-8">
            <View className='flex flex-row items-center justify-evenly w-full'>
              <View className='flex w-28 p-2 items-center justify-center bg-primary-300/40 rounded-xl'>
                <Text className="text-xl font-Nunito mb-2 text-center text-primary-200">{me}</Text>
                <View className='flex flex-row items-center justify-center gap-2'>
                  <Image source={images.coins} className='w-6 h-6' />
                  <Text className="text-3xl font-NunitoSemiBold text-center text-success-100">{myPoints}</Text>
                </View>
              </View>
              <View className='flex w-28 p-2 items-center justify-center bg-primary-300/40 rounded-xl'>
                <Text className="text-xl font-Nunito mb-2 text-center text-primary-200">{opponent}</Text>
                <View className='flex flex-row items-center justify-center gap-2'>
                  <Image source={images.coins} className='w-6 h-6' />
                  <Text className="text-3xl font-NunitoSemiBold text-center text-error-100">{opponentPoints}</Text>
                </View>
              </View>
            </View>
            <View className='flex items-center justify-center w-4/5 gap-6'>
              <MotiView
                from={{ scale: 0.95 }}
                animate={{ scale: 1  }}
                transition={{
                  type: 'timing',
                  duration: 500,
                  repeat: Infinity,
                  repeatReverse: true,
                }}
                className='flex items-center justify-center w-full'
              >
                  <CustomButton handleClick={handleCreatePress} btnText="Play Again" type='secondary'/>
              </MotiView>
              <CustomButton handleClick={() => router.replace('/')} btnText="Back to Home" />
            </View>
            
          </View>
      </View>
    </SafeAreaView>
  );
}

