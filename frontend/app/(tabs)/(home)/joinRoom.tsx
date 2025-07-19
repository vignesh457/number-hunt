// RoomScreen.js
import GameSelectCard from '@/components/GameSelectCard';
import { images } from '@/constants';
import { useRouteDebugger } from '@/hooks/useRouteDebugger';
import { setGameConfig } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showAlert } from '@/redux/uiSlice';
import { socket } from '@/utils/socket';
import { router,useRouter, useNavigation } from 'expo-router';
import React, { use } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function JoinRoom() {
  const [roomCode, setRoomCode] = React.useState('');
  const {username, id} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    socket.emit("join_room", { roomCode, name: username, userId: id }, (response : any) => {
        if (!response.success) {
          dispatch(showAlert({ type: "error", message: response.message }));
          return; // 🚫 Stop here if error
        }

        // ✅ Proceed only if success:
        dispatch(setGameConfig({ roomCode, mode: "friend" }));
        router.push("/lobby");
      }
    );
  };


  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-[#1A3E5E]'>
      <GameSelectCard title="Enter Room Code" description="Ask your friend for their 6-character room code to join their game." image={images.success}> 
          <View className="h-auto w-full flex items-center justify-center gap-4">
            <TextInput placeholder="Room Code" className="text-lg font-NunitoBold tracking-widest text-[#1A3E5E] rounded-2xl p-4 bg-blue-100 w-[90%]" style={{
              boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(55, 55, 55, 0.2) 2px 2px 7px inset'
            }} onChange={(e) => setRoomCode(e.nativeEvent.text)} value={roomCode}/>
            <TouchableOpacity className="flex-row items-center justify-center rounded-2xl p-2 h-12 bg-blue-200 w-[90%]" style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
            }}
              onPress={handleJoinRoom}
            >
              <Text className="text-blue-600 font-medium font-NunitoBold text-md">
                Join Room
              </Text>
            </TouchableOpacity>
          </View> 
        </GameSelectCard>
    </SafeAreaView>
  )
}