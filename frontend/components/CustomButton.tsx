import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({handleClick, btnText, className, type="primary" }:{handleClick: () => void, btnText: string, className?: string, type?: string}) => {
  return (
    <TouchableOpacity className={`flex-row items-center justify-center rounded-2xl p-2 mt-4 h-12 ${type === "primary" ? "bg-primary-200" : "bg-secondary-200"} w-[90%] ${className}`}
        style={{
        boxShadow:
            `rgba(50, 50, 93, 0.3) 3px 3px 15px, ${type === "primary" ? "rgba(187, 225, 250, 0.7)" : "rgba(255, 203, 97, 0.7)"} 5px 5px 10px inset`,
        }}
        onPress={handleClick}
    >
        {/* <Entypo name="plus" size={16} color="#012030" className='mr-2'/> */}
        <Text className="text-primary-400 font-NunitoSemiBold text-xl"> 
            {btnText}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton