// src/components/Grid.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Grid() {
  console.log("Grid");
    // grid to store 1 to 100 numbers
    const gridData = Array.from({ length: 100 }, (_, index) => index + 1);
  return (
    <View className='flex-row flex-wrap items-center justify-center h-[340px] w-[340px]'>
      {gridData.map((num, index) => (
        <TouchableOpacity
          key={index}
          className='flex items-center justify-center rounded-md w-[30px] h-[30px] m-[2px]'
          style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(96, 165, 250, 0.8) 3px 3px 10px inset'
        }}
          onPress={() => console.log(`Clicked on cell ${num}`)}
        >
          <Text className='text-blue-400 font-NunitoBold text-[14px]'>{num}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

