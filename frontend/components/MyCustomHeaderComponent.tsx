import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MyCustomHeaderComponent({ title }: { title: string | undefined }) {

  return (
    <View className="h-28 flex-row items-center justify-between pt-5 bg-primary-100">
      <TouchableOpacity className="flex items-center justify-center rounded-2xl bg-sky-600 p-2 h-12 w-12 ml-4" style={{
        boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(186, 230, 253, 0.5) 5px 5px 10px inset'
        }}
        onPress={() => {router.back()}}
       >
        <Ionicons name="arrow-back" size={24} color="#001428"/>
      </TouchableOpacity>

      <Text className="text-sky-500 text-3xl font-NunitoBold w-2/3">{title}</Text>
    </View>
  );
}