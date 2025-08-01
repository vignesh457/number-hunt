import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useAppDispatch } from '@/redux/hook';
import { images } from '@/constants/index';
import { login } from '@/redux/userSlice';
import { router } from 'expo-router';
import { showAlert, showPopup } from '@/redux/uiSlice';
import { MotiView } from 'moti';
import BackgroundWrapper from '@/components/backgroundWrapper';

export default function SignInScreen() {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    if (!name) return;
    const id = name + Math.floor(100000 + Math.random() * 900000).toString();
    dispatch(login({ id, username: name }));
    dispatch(showPopup({
      title: 'How to Play',
      message: '🔹Assign opponent number.\n\n🔹Find the number fast.\n\n🔹Faster = more points.\n\n🔹Most points wins.'
    }));
    router.replace('/');
  };

  return (
    <BackgroundWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex items-center justify-around p-8 w-[90%] h-[80%] rounded-2xl">
              <View className="text-center w-full mb-8 items-center">
                <View className=' flex items-center justify-center rounded-[30px]' style={{ boxShadow: 'rgba(56, 189, 248, 0.2) 0px 0px 45px' }}>
                  <Image source={images.logo} className="w-64 h-64 rounded-[30px]" />
                </View>
              </View>

              <View className="h-auto w-full flex-1 mt-8 items-center justify-center gap-4">
                <Text className="text-primary-200 text-3xl leading-relaxed font-NunitoBold">
                  Enter Your Name
                </Text>

                <TextInput
                  placeholder="Username"
                  className="text-lg font-NunitoSemiBold tracking-[2px] text-primary-100 rounded-2xl p-4 bg-black w-[90%] border-[1px] border-primary-300/70 placeholder:color-primary-300"
                  // style={{
                  //   boxShadow: 'rgba(56, 189, 248, 0.3) 0px 0px 25px',
                  // }}
                  onChange={(e) => setName(e.nativeEvent.text)}
                  value={name}
                />

                <TouchableOpacity
                  className="flex-row items-center justify-center rounded-2xl p-2 mt-4 h-12 bg-secondary-200 w-[90%]"
                  style={{
                    boxShadow:
                      'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 203, 97, 0.7) 5px 5px 10px inset',
                  }}
                  onPress={handleSubmit}
                >
                  <Text className="text-primary-400 font-medium font-NunitoSemiBold text-2xl">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BackgroundWrapper>
  );
}
