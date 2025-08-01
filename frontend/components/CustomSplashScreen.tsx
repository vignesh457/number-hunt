import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'

const CustomSplashScreen = () => {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-primary-100'>
      {/* <Image source={images.icon} className='w-64 h-64 rounded-[30px]' /> */}
    </SafeAreaView>
  )
}

export default CustomSplashScreen