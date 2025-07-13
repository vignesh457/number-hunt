import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MyCustomHeaderComponent({ title }: { title: string | undefined }) {

  return (
    <View className="h-28 flex-row items-center justify-between pt-5 bg-[#1A3E5E]">
      <TouchableOpacity className="flex items-center justify-center rounded-2xl bg-[#BFDBFE] p-2 h-12 w-12 ml-4" style={{
        boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
        }}
        onPress={() => {router.back()}}
       >
        <Ionicons name="arrow-back" size={24} color="#1A3E5E"/>
      </TouchableOpacity>

      <Text className="text-blue-200 text-3xl font-NunitoBold w-2/3">{title}</Text>
    </View>
  );
}
