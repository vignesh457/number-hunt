import CopyCode from '@/components/CopyCode';
import Grid from '@/components/Grid';
import { images } from '@/constants';
import { setGameConfig } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showPopup } from '@/redux/uiSlice';
import { updateHighScore } from '@/redux/userSlice';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from "react-native-progress";
import { MotiImage, MotiView } from 'moti';
import FlippingCoin from '@/components/FlippingCoin';

const SoloGameScreen = () => {
  const { username: playerName, highScore, rank } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const [points, setPoints] = useState(30);
  const [myPoints, setMyPoints] = useState(0);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const myPointsRef = useRef(myPoints);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(showPopup({ title: 'Exit Game', message: 'Are you sure you want to exit the game?', confirmType: 'exit' }));
        return true;

      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [dispatch])
  );

  useEffect(() => {
    setNewTarget();
    setPoints(30);
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRounds();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round]);

  const setNewTarget = () => {
    const newTarget = Math.floor(Math.random() * 100);
    setTargetNumber(newTarget);
  };

  const handleRounds = () => {
    if (round < 5) {
      setRound((prev) => prev + 1);
    } else {
        setTimeout(() => {
            router.replace({
            pathname: '/soloResult',
            params: {
                me: playerName,
                mypoints: myPointsRef.current,
            },
            });
        },100)
    }
  };

  const handleNumberFound = (num: number) => {
    if (num !== targetNumber) return;

    const grid = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    dispatch(setGameConfig({ grid }));
    myPointsRef.current = myPointsRef.current + points;
    setMyPoints((prev) => {
      dispatch(updateHighScore(prev + points))
      return prev + points;
    });
    handleRounds();
  };

  return (
    <SafeAreaView className='flex-1 items-center justify-around bg-primary-400 gap-4'>
      <View className="flex items-center justify-between gap-4 p-2 w-[90%] rounded-2xl">
        <View className='flex-row w-full h-11 items-center justify-between'>
          <View className='w-[45%] h-full flex items-center justify-center rounded-xl p-2 border-[1px] border-primary-300/70 bg-black'>
            <Text className="w-full text-center text-xl font-NunitoSemiBold text-primary-100">⚔️ Round  {round > 5 ? 5 : round}/5</Text>
          </View>
          <View className='w-[45%] h-full flex flex-row items-center justify-center gap-2 rounded-xl p-2 border-[1px] border-primary-300/70 bg-black'>
            <Image source={images.rank} className='w-6 h-6' />
            <Text className="text-center text-xl font-NunitoSemiBold text-primary-100">Rank  {rank}</Text>
          </View>
        </View>
        
        <View className='flex-row w-full items-center justify-between'>
          <View className='flex w-32 items-start justify-center p-4 bg-success-100 rounded-xl mr-4'>
            <Text className="text-md text-base w-[80%] text-primary-400 font-NunitoSemiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {playerName || "Me"}
            </Text>
            <View className="absolute top-[-3px] right-[-8px] bg-black border-success-100 border-2 flex items-center justify-center rounded-3xl h-16 w-16">
              <Image source={images.coin} className='w-5 h-5' />
              <Text className='text-lg text-success-100 font-Nunito'>{myPoints}</Text>
            </View>
          </View>
          <View className='flex items-center justify-center p-3 rounded-xl bg-error-100/40 gap-1'>
            <Text className='text-md text-secondary-200 font-NunitoSemiBold'>Highest Reflex</Text>
            <View className='flex flex-row items-center justify-center gap-2'>
              <Image source={images.coin} className='w-6 h-6' />
              <Text className='text-2xl text-secondary-100 font-Nunito'>{highScore}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center justify-center bg-primary-300/20 rounded-lg border-[0.5px] border-primary-300 w-full p-2">
          <FlippingCoin />
          <Progress.Bar 
            progress={(points / 30) || 0} 
            width={240} 
            height={14} 
            color="#FFCB61" 
            unfilledColor="#000"
            borderRadius={10}
            borderWidth={1}
            borderColor="#FFCB61"
            style={{margin: "auto"}}
            animationType="timing"
          />
        </View>
      </View>

      <View className='flex w-full items-center justify-center gap-4'>
        <View className="flex flex-row items-center justify-center bg-primary-300/20 rounded-lg border-[0.5px] border-primary-300 w-[90%] p-2"> 
          <Text className='text-2xl text-primary-100/90 font-Nunito'>
            {targetNumber ? `Find ${targetNumber}` : "Get ready..."}
          </Text>
        </View>
        <Grid
          targetNumber={targetNumber}
          onNumberClick={handleNumberFound}
          disabled={targetNumber === null}
        />
      </View>
      <View className='w-full h-28 bg-black mt-4'>
          {/* Ads section */}
      </View>
    </SafeAreaView>
  );
};

export default SoloGameScreen;
