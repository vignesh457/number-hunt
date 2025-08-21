import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { MotiText, MotiView } from 'moti';
import BlurryLeaderboardItem from '@/components/BlurryLeaderboardItem';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showAlert } from '@/redux/uiSlice';
import { updateRank } from '@/redux/userSlice';

export default function SoloResultScreen() {
  const { me, mypoints } = useLocalSearchParams();
  const {highScore, rank, id} = useAppSelector((state) => state.user);
  const gameArr = ['Reached Highest Reflex!', 'Reflex Not Beaten!'];
  const gameStatus = Number(mypoints) >= Number(highScore) ? 1 : 2;
  const dispatch = useAppDispatch();

  const addToLeaderboard = async () => {
  if (gameStatus === 2) return;

  try {
    const res = await fetch('http://192.168.1.3:3000/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, highscore: 200 }),
    });

    if (!res.ok) {
      throw new Error('Failed to update leaderboard');
    }

    const data = await res.json(); // now we have { rank, ... }
    dispatch(showAlert({ type: 'success', message: 'Score added to leaderboard!' }));

    // ✅ rank is now a number, not a Promise
    dispatch(updateRank({ rank: data.rank }));

  } catch (error) {
    if (error instanceof Error) {
      dispatch(showAlert({ type: 'error', message: error.message }));
    }
  }
};

useEffect(() => {
  addToLeaderboard();
}, []);



  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#001428]">
      <View className="h-full w-full flex items-center justify-center">
          <View className='w-full h-[40%] flex items-center justify-evenly rounded-3xl pt-8'>
            <MotiText
            from={{ scale: 0.90 }}
            animate={{ scale: 1.10 }}
            transition={{
                type: 'timing',
                duration: 1500,
                repeat: Infinity,
                repeatReverse: true,
            }}
            className={`absolute top-2 z-10 text-5xl w-[80%] py-2 font-NunitoSemiBold text-center text-${gameStatus===1 ? 'success' : 'error'}-100`}
            >
            {gameArr[gameStatus-1]}
            </MotiText>
            <MotiView
            from={{ translateY: -10 }}
            animate={{ translateY: 10 }}
            transition={{
                type: 'timing',
                duration: 1500,
                repeat: Infinity,
                repeatReverse: true,
            }}
            className="flex items-center justify-center w-full h-full"
            >
            <Image source={images[gameStatus===1 ? 'win' : 'loss']} resizeMode='contain' className='h-full' />
            </MotiView>
          </View>
          <View className="w-full h-[60%] flex items-center justify-center rounded-2xl p-4 gap-4">
            <View className='flex flex-row items-center justify-evenly w-full'>
              <View className='flex p-2 items-center justify-center bg-primary-300/40 rounded-xl'>
                <Text className="text-xl font-Nunito mb-2 text-center text-primary-200">Current Reflex</Text>
                <View className='flex flex-row items-center justify-center gap-2'>
                  <Image source={images.coins} className='w-6 h-6' />
                  <Text className="text-3xl font-NunitoSemiBold text-center text-success-100">{mypoints}</Text>
                </View>
              </View>
              <View className='flex p-2 items-center justify-center bg-primary-300/40 rounded-xl'>
                <Text className="text-xl font-Nunito mb-2 text-center text-primary-200">Highest Reflex</Text>
                <View className='flex flex-row items-center justify-center gap-2'>
                  <Image source={images.coins} className='w-6 h-6' />
                  <Text className="text-3xl font-NunitoSemiBold text-center text-secondary-200">{highScore}</Text>
                </View>
              </View>
            </View>
            <View className='flex items-center justify-center gap-2 p-2 w-full h-40 bg-primary-300/30 rounded-xl'>
                <BlurryLeaderboardItem />
                <View className='scale-110 flex flex-row items-center justify-evenly w-full h-10 bg-primary-300/80 border-[1px] border-primary-200/50 rounded-xl'>
                    <Text className="text-md w-[30%] text-center text-primary-100 font-NunitoSemiBold">🎖️ Rank {rank}</Text>
                    <Text className="text-md w-[45%] text-center text-primary-100 font-NunitoSemiBold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >Vigneshwar Reddy Donapati</Text>
                    <Text className="text-md w-[25%] text-center text-primary-100 font-NunitoSemiBold">💰 {highScore}</Text>
                </View>
                <BlurryLeaderboardItem />
            </View>
            <MotiView
                from={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  repeat: Infinity,
                  repeatReverse: true,
                }}
                className='flex items-center justify-center w-full'
            >
                <CustomButton handleClick={() => router.replace('/soloGame')} btnText="Play Again" type='secondary'/>
            </MotiView>
            <CustomButton handleClick={() => router.replace('/')} btnText="Back to Home" />
          </View>
      </View>
    </SafeAreaView>
  );
}

