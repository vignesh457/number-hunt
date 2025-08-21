import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFocusEffect } from 'expo-router';

const CustomButton = ({handleClick, btnText, className, textClassName, type="primary" }:{handleClick: () => void, btnText: string, className?: string, textClassName?: string, type?: string}) => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // reset when coming to screen
      setIsDisabled(false);
    }, [])
  );
  return (
    <TouchableOpacity className={`${isDisabled ? "opacity-50" : ""}flex-row items-center justify-center rounded-2xl h-12 ${type === "primary" ? "bg-primary-200" : "bg-secondary-200"} w-[90%] ${className}`}
        style={{
        boxShadow:
            `rgba(50, 50, 93, 0.3) 3px 3px 15px, ${type === "primary" ? "rgba(187, 225, 250, 0.7)" : "rgba(255, 203, 97, 0.7)"} 5px 5px 10px inset`,
        }}
        onPress={() => {
          if (isDisabled) return;
          setIsDisabled(true);
          handleClick();
        }}
    >
        <Text className={`text-primary-400 font-NunitoSemiBold text-xl ${textClassName}`}> 
            {btnText}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton