import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GameSelectCard({children, image}: {children: React.ReactNode, image: any}) {
  return (
    <View className="h-auto w-[75%] flex items-center justify-center border-[1px] border-primary-300/60 gap-4 bg-black rounded-3xl p-6">
      <View className="text-center w-full items-center">
        <View className=" flex items-center justify-center rounded-md">
          <Image source={image} className='w-44 h-44' />
        </View>
      </View>
      {children}
    </View>
  );
}
