import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch } from '@/redux/hook';
import {images} from '@/constants/index';
import { login } from '@/redux/userSlice';
import { router, useNavigation } from 'expo-router';
import { showAlert } from '@/redux/uiSlice';
import { Particles } from "@/components/magicui/particles";

export default function SignInScreen() {
  // useNavigationLogger("signIn");
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    const id = name+Math.floor(100000 + Math.random() * 900000).toString();
    dispatch(login({id: id, username: name}));
    dispatch(showAlert({type: 'success', message: 'Logged In Successfully'}));
    router.replace('/');
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-start bg-[#1A3E5E]'>
      <Particles />
      <View className="flex items-center justify-around p-8 w-[90%] h-[80%] rounded-2xl">
            <View className="text-center w-full mb-6 items-center">
              <View className=" flex items-center justify-center mb-4 rounded-md">
                <Image source={images.icon} className='w-48 h-48' />
              </View>
      
              <Text className="text-2xl text-white mb-2 font-NunitoBold">
                NumberHunt
              </Text>
            </View>
            <View className="h-auto w-full flex items-center justify-center gap-4">
                <Text className="text-sky-100 text-2xl leading-relaxed font-Nunito">
                    Enter Your Name
                </Text>
                <TextInput placeholder="Username" className="text-lg font-NunitoBold tracking-widest text-[#1A3E5E] rounded-2xl p-4 bg-[#43779D] w-[90%]" style={{
                    boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(55, 55, 55, 0.2) 2px 2px 7px inset'
                }} onChange={(e) => setName(e.nativeEvent.text)} value={name}/>
                <TouchableOpacity className="flex-row items-center justify-center rounded-2xl p-2 mt-5 h-12 bg-blue-200 w-[90%]" style={{
                boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
                }}
                    onPress={handleSubmit}
                >
                    <Text className="text-[#1A3E5E] font-medium font-NunitoBold text-lg">
                        Continue
                    </Text>
                </TouchableOpacity>
                </View> 
          </View>
    </SafeAreaView>
  )
}
