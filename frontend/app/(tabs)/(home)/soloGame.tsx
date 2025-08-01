import CopyCode from '@/components/CopyCode';
import Grid from '@/components/Grid';
import { useAppSelector } from '@/redux/hook';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SoloGameScreen = () => {
  const playerName = useAppSelector((s) => s.user.username);
  const [points, setPoints] = useState(30);
  const [myPoints, setMyPoints] = useState(0);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const myPointsRef = useRef(myPoints);

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
            pathname: '/result',
            params: {
                me: playerName,
                opponent: 'AI',
                mypoints: myPointsRef.current,
                opponentPoints: 0,
            },
            });
        },100)
    }
  };

  const handleNumberFound = (num: number) => {
    if (num !== targetNumber) return;
    myPointsRef.current = myPointsRef.current + points;
    setMyPoints((prev) => prev + points);
    handleRounds();
  };

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-primary-400'>
      <View className="flex-[0.8] items-center justify-between gap-4 p-2 w-[90%] rounded-2xl">
        <View className='flex-row w-full h-11 items-center justify-between'>
          <View className='w-[45%] h-full flex items-center justify-center rounded-xl p-1 bg-black'>
            <Text className="w-full text-center text-xl font-NunitoSemiBold text-primary-100">Round : {round > 5 ? 5 : round}/5</Text>
          </View>
          <View className='w-[55%] h-full flex items-center justify-center'>
            <CopyCode viewClassName='bg-primary-300/70'/>
          </View>
        </View>
        
        <View className='flex-row w-full items-center justify-between'>
          <View className='flex w-24 h-24 items-center justify-center rounded-[50%] p-2 bg-black'>
            <Text className="text-md text-primary-100 font-NunitoBold">
              {playerName || "Me"}
            </Text>
            <View className="flex items-center justify-center rounded-2xl h-10 w-10">
              <Text className='text-md text-primary-200 font-NunitoBold'>{myPoints}</Text>
            </View>
          </View>
          <View className='flex w-24 h-24 items-center justify-center rounded-[50%] p-2 bg-black'>
            <Text className="text-md text-primary-100 font-NunitoBold">AI</Text>
            <View className="flex items-center justify-center rounded-2xl h-10 w-10">
              <Text className='text-md text-primary-200 font-NunitoBold'>0</Text>
            </View>
          </View>
        </View>
        <Text className={`text-xl bg-black rounded-lg text-secondary-100 border-[0.5px] border-orange-200/50 font-NunitoBold w-full text-center p-2`}>
          Points : {points}
        </Text>
      </View>

      <View className='flex items-center justify-center gap-4'>
        <Text className='text-2xl text-blue-200 font-NunitoSemiBold'>
          {targetNumber ? `Find ${targetNumber}` : "Get ready..."}
        </Text>
        <Grid
          targetNumber={targetNumber}
          onNumberClick={handleNumberFound}
          disabled={targetNumber === null}
        />
      </View>
    </SafeAreaView>
  );
};

export default SoloGameScreen;
