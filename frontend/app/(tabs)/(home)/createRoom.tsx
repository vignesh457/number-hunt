// RoomScreen.js
import BackgroundWrapper from '@/components/backgroundWrapper';
import CopyCode from '@/components/CopyCode';
import CustomButton from '@/components/CustomButton';
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import { useAppSelector } from '@/redux/hook';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function CreateRoom() {
  // useRouteDebugger();
  console.log("CreateRoom");

  const handleCreateRoom = () => {
    console.log("lobby room clicked from createRoom");
    router.push('/lobby');
  };

  return (
    <BackgroundWrapper className='justify-center'>
        <GameSelectCard image={images.roomcreated}>
        <View className="h-auto w-full flex items-center justify-center gap-4">
          <CopyCode viewClassName='w-[75%]' />
          <CustomButton handleClick={handleCreateRoom} btnText="Enter Room" />
        </View> 
      </GameSelectCard>
    </BackgroundWrapper>
  )
}