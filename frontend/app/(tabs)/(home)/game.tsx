import Grid from '@/components/Grid'
import Timer from '@/components/Timer'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const game = () => {
  console.log("Game");
  return (
    <SafeAreaView className='flex-1 items-center justify-evenly bg-[#1A3E5E]'>
      <View className="flex gap-4 items-center justify-center p-4 w-[90%] rounded-2xl " >
        <Text className="text-2xl text-white mb-2 font-NunitoBold">
          Round - 1/5
        </Text>
        {/* scores of players */}
        <View className='flex-row w-full items-center justify-between'>
        <View className='flex gap-4 items-center justify-start rounded-2xl p-2 bg-blue-200' style={{
          boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
        }}>
          <Text className="text-md text-blue-400 font-NunitoBold">
            Player 1
          </Text>
          <View className="flex items-center justify-center rounded-2xl bg-blue-200 p-2 h-12 w-12 mx-4 " style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
            }}
          >
            <Text className='text-md text-blue-400 font-NunitoBold'>90</Text>
          </View>
        </View>
        <View className='flex gap-4 items-center justify-start rounded-2xl p-2 bg-blue-200' style={{
          boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
        }}>
          <Text className="text-md text-blue-400 font-NunitoBold">
            Player 1
          </Text>
          <View className="flex items-center justify-center rounded-2xl bg-blue-200 p-2 h-12 w-12 mx-4 " style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
            }}
          >
            <Text className='text-md text-blue-400 font-NunitoBold'>90</Text>
          </View>
        </View>
        </View>
        {/* Timer */}
        {/* <Timer/> */}
        {/* comments on the game */}
        <Text className='text-xl text-blue-200 font-NunitoBold'>dkjfkdj</Text>
      </View>
      <Grid />
    </SafeAreaView>
  )
}

export default game