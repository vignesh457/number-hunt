// src/components/Grid.js
import { useAppSelector } from '@/redux/hook';
import { socket } from '@/utils/socket';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Grid({ targetNumber, onNumberClick, disabled }: {
  targetNumber: number | null;
  onNumberClick: (points: number) => void;
  disabled: boolean
}) {
  const {grid: numbers} = useAppSelector((s) => s.game);

  const handlePress = (num: number) => {
    onNumberClick(num);
  };
  
  return (
    <View className='flex-row flex-wrap items-center justify-center h-[340px] w-[340px]'>
      {numbers.map((num) => (
        <TouchableOpacity
          key={num}
          className='flex bg-primary-200/60 items-center justify-center rounded-md w-[30px] h-[30px] m-[2px] border-[1px] border-primary-200/60'
        //   style={{
        //     boxShadow: 'rgba(96, 165, 250, 0.2) 1px 1px 2px, rgba(96, 165, 250, 0.5) 1px 1px 1px inset'
        // }}
          onPress={() => handlePress(num)}
          disabled={disabled}
        >
          <Text className={`${num === targetNumber ? 'text-primary-400' : 'text-primary-400'} text-blue-400 font-Nunito text-[16px]`}>{num}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

