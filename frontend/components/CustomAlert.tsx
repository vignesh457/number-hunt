import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
// import { icons } from '@/constants';
import { RootState } from '@/redux/store';
import { hideAlert } from '@/redux/uiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const CustomAlert = () => {
  const { visible, type, message } = useAppSelector((state: RootState) => state.alert);
  const dispatch = useAppDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(hideAlert()));
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  const containerStyle = {
    error: 'bg-error-100/80 border-error-100',
    success: 'bg-success-100/80 border-success-100',
    warning: 'bg-warning-100/80 border-warning-100',
  }[type];

  return (
    <Animated.View
      className="absolute top-12 left-0 w-full h-[55px] flex justify-start items-center pt-2 z-10"
      style={{ opacity: fadeAnim }}
    >
      <View
        className={`w-[90%] h-[45px] flex flex-row justify-center items-center border-[1px] rounded-lg ${containerStyle}`}
      >
        {/* <Image
          source={icons[type]}
          className="w-6 h-6 border-[1px] border-secondary-300/10 rounded-full"
        /> */}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-secondary-300 text-md font-NunitoSemiBold ml-3"
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default CustomAlert;
