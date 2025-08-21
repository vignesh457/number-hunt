// RoomScreen.js
import BackgroundWrapper from "@/components/backgroundWrapper";
import CustomButton from "@/components/CustomButton";
import GameSelectCard from "@/components/GameSelectCard";
import { images } from "@/constants";
import { useRouteDebugger } from "@/hooks/useRouteDebugger";
import { setGameConfig } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { showAlert } from "@/redux/uiSlice";
import { socket } from "@/utils/socket";
import { router, useRouter, useNavigation } from "expo-router";
import React, { use } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = React.useState("");
  const { username, id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    socket.emit(
      "join_room",
      { roomCode, name: username, userId: id },
      (response: any) => {
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
    <BackgroundWrapper className="justify-center">
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
            <View className="h-[85%] w-full flex items-center justify-center">
              <GameSelectCard image={images.roomjoin}>
                <View className="h-auto w-full flex items-center justify-center gap-4">
                  <TextInput
                    placeholder="Enter Room Code"
                    className="text-lg font-NunitoLight tracking-[1px] text-primary-100 rounded-2xl px-6 border-[1px] border-primary-300 bg-primary-400 w-[90%] placeholder:color-primary-300/60"
                    onChange={(e) => setRoomCode(e.nativeEvent.text)}
                    value={roomCode}
                  />
                  <CustomButton handleClick={handleJoinRoom} btnText="Join Room" type="secondary" />
                </View>
              </GameSelectCard>
            </View>
        </TouchableWithoutFeedback>
        <View className='w-full h-[15%] bg-black mt-4'>
            {/* Ads section */}
        </View>
    </BackgroundWrapper>
  );
}
