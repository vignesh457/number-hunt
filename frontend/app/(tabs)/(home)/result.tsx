import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ResultScreen() {
  const { me, opponent, mypoints, opponentPoints } = useLocalSearchParams();
  console.log(me, opponent, mypoints, opponentPoints);

  return (
    <View className="flex-1 items-center justify-center bg-[#1A3E5E] p-4">
      <Text className="text-3xl font-NunitoBold text-white mb-4">Game Over</Text>
      
      <View className="bg-white rounded-xl p-6 w-full max-w-md">
        <Text className="text-xl font-NunitoBold mb-2 text-blue-700">{me}: {mypoints} pts</Text>
        <Text className="text-xl font-NunitoBold mb-2 text-red-600">{opponent}: {opponentPoints} pts</Text>

        <Text className="text-2xl font-NunitoBold mt-4 text-center">
          {Number(mypoints) > Number(opponentPoints) ? 'You Win!' : Number(mypoints) < Number(opponentPoints) ? 'You Lose!' : 'It\'s a Tie!'}
        </Text>
      </View>

      <TouchableOpacity
        className="mt-8 bg-white/80 px-6 py-3 rounded-xl"
        onPress={() => router.replace('/')}
      >
        <Text className="text-blue-800 font-NunitoBold">Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
