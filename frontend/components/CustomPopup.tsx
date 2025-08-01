import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RootState } from '@/redux/store';
import { hidePopup } from '@/redux/uiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { MotiView, AnimatePresence } from 'moti';
import { router } from 'expo-router';
import CustomButton from './CustomButton';

const CustomPopup = () => {
  const { visible, title, message, confirmType } = useAppSelector(
    (state: RootState) => state.popup
  );
  const dispatch = useAppDispatch();

  const handleHidePopup = () => {
    dispatch(hidePopup());
  };
  const handleConfirm = () => {
    switch (confirmType) {
        case 'exit':
            router.back(); 
            break;
        default:
            break;
    }
    dispatch(hidePopup());
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 10,
              mass: 1.2,
            }}
            className="absolute top-0 left-0 w-full h-full bg-primary-400/90 flex justify-center items-center p-2 z-10">
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 10,
              mass: 1.2,
            }}
            className="w-4/5 flex justify-center items-center gap-6 p-6 rounded-2xl bg-black border-2 border-primary-300/80"
          >
            <Text className="text-primary-200 text-3xl font-NunitoBold ml-3 overflow-wrap">
              {title}
            </Text>
            <Text className="text-primary-100 text-[16px] font-NunitoLight ml-3 overflow-wrap">
              {message}
            </Text>
            <View className="w-full flex-row justify-evenly items-center">
              {confirmType && (
                <CustomButton handleClick={handleConfirm} className={`${confirmType?"w-[44%]":""}`} btnText="Yes" />
              )}
                <CustomButton handleClick={handleHidePopup} btnText={confirmType ? 'No' : 'Continue'} className={`${confirmType?"w-[44%]":""}`} />
            </View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default CustomPopup;
