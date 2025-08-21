import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { RootState } from '@/redux/store';
import { hidePopup } from '@/redux/uiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { MotiView, AnimatePresence } from 'moti';
import { router } from 'expo-router';
import CustomButton from './CustomButton';
import { socket } from '@/utils/socket';
import { UserState } from '@/redux/userSlice';

const CustomPopup = () => {
  const { visible, title, message, confirmType } = useAppSelector(
    (state: RootState) => state.popup
  );
  const { roomCode } = useAppSelector((state: RootState) => state.game);
  const userId = useAppSelector((s) => s.user.id);
  const dispatch = useAppDispatch();

  const handleHidePopup = () => {
    dispatch(hidePopup());
  };
  const handleConfirm = () => {
    switch (confirmType) {
        case 'exit':
            socket.emit("leave_room", { roomCode, userId });
            router.replace('/'); 
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
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 10,
              mass: 1.2,
            }}
            className="w-4/5 relative flex justify-center items-center gap-6 p-6 rounded-2xl bg-success-100/90 border-2 border-primary-100/90"
          >
            <Pressable className='absolute top-[-10] right-[-10] w-10 h-10 flex items-center justify-center bg-error-100 rounded-full'
              onPress={handleHidePopup}
              style={{ elevation: 10, shadowColor: '#000' }}
            >
              <Text className="text-primary-400 text-[22px] font-NunitoSemiBold">X</Text>
            </Pressable>
            <Text className="text-primary-400/80 text-3xl font-NunitoBold ml-3 overflow-wrap">
              {title}
            </Text>
            <Text className="text-primary-300/80 text-[16px] font-Nunito ml-3 overflow-wrap">
              {message}
            </Text>
            <View className="w-full flex-row justify-evenly items-center">
              {confirmType && (
                <CustomButton handleClick={handleConfirm} btnText="Exit" type='secondary' />
              )}
            </View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default CustomPopup;
