import { View, Text } from 'react-native'
import React from 'react'

const BlurryLeaderboardCard = () => {
  return (
    <View className='flex flex-row items-center justify-evenly w-full h-10 bg-primary-300/50 rounded-xl'>
        <Text
            className="text-md text-primary-200/20 font-NunitoSemiBold"
            style={{
                textShadowColor: "rgba(239, 249, 255, 0.9)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
            }}
        >
            🎖️ Rank 2
        </Text>
        <Text
            className="text-md text-primary-200/20 font-NunitoSemiBold"
            style={{
                textShadowColor: "rgba(239, 249, 255, 0.9)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
            }}
        >
            Vigneshwar
        </Text>
        <Text
            className="text-md text-primary-200/20 font-NunitoSemiBold"
            style={{
                textShadowColor: "rgba(239, 249, 255, 0.9)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
            }}
        >
            💰 523
        </Text>
    </View>
  )
}

export default BlurryLeaderboardCard