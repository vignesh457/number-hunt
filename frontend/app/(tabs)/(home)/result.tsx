import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';

export default function ResultScreen() {
  const { me, opponent, mypoints, opponentPoints } = useLocalSearchParams();
  console.log(me, opponent, mypoints, opponentPoints);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#012030]">
      <GameSelectCard image={images.success}>
        <View className="h-auto w-full flex items-center justify-center gap-4">
          <Text className="text-3xl font-NunitoBold text-white mb-4">Game Over</Text>
          <View
            className="text-lg font-NunitoSemiBold tracking-[2px] text-sky-300 rounded-2xl p-4 w-[90%] placeholder:color-sky-800"
            style={{
              boxShadow: "rgba(56, 189, 248, 0.3) 0px 0px 45px",
            }}
          >
            <Text className="text-xl font-NunitoBold mb-2 text-center text-sky-500">{me} : {mypoints} pts</Text>
            <Text className="text-xl font-NunitoBold mb-2 text-center text-sky-600">{opponent} : {opponentPoints} pts</Text>

            <Text className="text-2xl text-blue-300 font-NunitoBold mt-4 text-center">
              {Number(mypoints) > Number(opponentPoints) ? 'You Win!' : Number(mypoints) < Number(opponentPoints) ? 'You Lose!' : 'It\'s a Tie!'}
            </Text>
          </View>
          <CustomButton handleClick={() => router.push('/home')} btnText="Back to Home" />
        </View>
      </GameSelectCard>
    </SafeAreaView>
  );
}

