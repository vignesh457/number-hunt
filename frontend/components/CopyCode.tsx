import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { useAppSelector } from '@/redux/hook';

const CopyCode = ({viewClassName, textClassName}:{viewClassName?:string, textClassName?:string}) => {
    const [copied, setCopied] = useState(false);
    const {roomCode} = useAppSelector((state)=> state.game);

    const handleCopy = async () => {
        await Clipboard.setStringAsync(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

  return (
    <Pressable className={`flex-row items-center justify-evenly bg-primary-400 border-[1px] border-primary-300 rounded-xl p-2 w-[90%] ${viewClassName}`}
        onPress={handleCopy} 
    >
        <Text className={`flex-1 text-center tracking-[4px] pl-5 text-xl font-NunitoLight text-primary-100 ${textClassName}`}>
            {copied ? 'Copied!' : roomCode}
        </Text>
        <MaterialIcons name={copied ? 'check' : 'content-copy'} size={18} color="#3282B1" className='mr-2' />
    </Pressable>
  )
}

export default CopyCode