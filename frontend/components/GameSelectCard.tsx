import { Image, Text, View } from 'react-native';

export default function GameSelectCard({children, title, description, image}: {children: React.ReactNode, title: string, description: string, image: any}) {
  return (
    <View className="flex items-center justify-center p-8 w-4/5 rounded-2xl bg-blue-300" style={{
    boxShadow: 'rgba(50, 50, 93, 0.2) 5px 5px 20px, rgba(10, 37, 64, 0.5) 0px -2px 15px inset'
    }}>
      <View className="text-center w-full mb-6 items-center">
        <View className=" flex items-center justify-center mb-4 rounded-md">
          <Image source={image} className='w-16 h-16' />
        </View>

        <Text className="text-2xl text-white mb-2 font-NunitoBold">
          {title}
        </Text>
        <Text className="text-sky-100 text-sm text-center leading-relaxed font-NunitoSemiBold">
          {description}
        </Text>
      </View>
      {children}
    </View>
  );
}
