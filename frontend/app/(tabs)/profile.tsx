import BackgroundWrapper from "@/components/backgroundWrapper";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/userSlice";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import * as Progress from "react-native-progress";

const ProfileScreen = () => {
  const {id, username, highScore, totalGamesPlayed, rank, winCount, lossCount} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <BackgroundWrapper className='justify-end py-2'>
      <View className="flex items-center justify-center w-[90%] h-[95%] bg-black border-[1px] border-primary-200/30 rounded-2xl">
        {/* Profile Info */}
        <View className="flex w-[90%] h-[28%] items-center justify-end gap-1 rounded-b-xl">
          <Image
            source={images.playsingle}
            resizeMode="cover"
            className="absolute top-[-20%] left-[50%-14] w-28 h-28 rounded-full border-2 border-primary-300"
          />
          <Text className="text-3xl font-NunitoSemiBold text-primary-100 mb-1">
            {username}
          </Text>
          <View className="flex flex-row items-center w-full justify-between bg-primary-400/80 px-6 py-3 rounded-2xl border-[1px] border-primary-200/20">
            <View className="flex items-start justify-center gap-2">
              <View className="flex flex-row items-center gap-1">
                <Ionicons name="person-outline" size={14} color="#3282B8" />
                <Text className="text-md font-NunitoLight text-primary-200/60">
                  {id}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <AntDesign name="mail" size={14} color="#3282B8" />
                <Text className="text-md font-NunitoLight text-primary-200/60">
                  {username}@gmail.com
                </Text>
              </View>
            </View>
            <View className="flex justify-center items-center w-12 h-12 bg-primary-300/50 rounded-full">
              <MaterialIcons name="edit" size={24} color="#3282B8" />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex w-[90%] h-[72%] items-center justify-center">
          <View className="flex flex-row w-full h-[30%] items-center justify-evenly">
            <View className="flex items-center justify-center gap-1 py-2 px-6 bg-primary-400 border-[1px] border-primary-200/20 rounded-2xl">
              <Text className="text-lg tracking-widest font-Nunito text-primary-200">
                Reflex
              </Text>
              <View className="flex flex-row items-center justify-center gap-2">
                <Image source={images.coin} className="w-6 h-6" />
                <Text className="text-2xl font-NunitoSemiBold text-primary-100">
                  {highScore || 0}
                </Text>
              </View>
            </View>
            <View className="flex items-center justify-center gap-1 py-2 px-4 bg-primary-400 border-[1px] border-primary-200/20 rounded-2xl">
              <Text className="text-lg tracking-widest font-Nunito text-primary-200">
                Global Rank
              </Text>
              <View className="flex flex-row items-center justify-center gap-2">
                <Image source={images.rank} className="w-6 h-6" />
                <Text className="text-2xl font-NunitoSemiBold text-primary-100">
                  {rank || "---"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex w-full h-[45%] items-center justify-evenly bg-primary-400/70 border-[1px] border-primary-200/20 rounded-2xl">
            <Text className="text-xl tracking-widest font-NunitoSemiBold text-primary-100/80">MultiPlayer</Text>
            <View className="flex items-center justify-evenly w-full flex-row">
              <View className="flex items-center justify-center gap-1 px-4 py-2 bg-primary-300/80 rounded-2xl">
                <Text className="text-md tracking-widest font-Nunito text-white/70">
                  Games Played
                </Text>
                <Text className="text-2xl font-NunitoSemiBold text-primary-100">
                  {totalGamesPlayed}
                </Text>
              </View>
              <View className="flex items-center justify-center gap-1 px-4 py-2 bg-success-100/80 rounded-2xl">
                <Text className="text-md tracking-widest font-Nunito text-white/70">
                  Wins
                </Text>
                <Text className="text-2xl font-NunitoSemiBold text-primary-100">
                  {winCount || 0}
                </Text>
              </View>
              <View className="flex items-center justify-center gap-1 px-4 py-2 bg-error-100/80 rounded-2xl">
                <Text className="text-md tracking-widest font-Nunito text-white/70">
                  Losses
                </Text>
                <Text className="text-2xl font-NunitoSemiBold text-primary-100">
                  {lossCount || 0}
                </Text>
              </View>
            </View>
            <View className="flex gap-1 rounded-lg w-full p-2">
              <Progress.Bar 
                progress={(winCount / totalGamesPlayed) || 0.01} 
                width={270} 
                height={12} 
                color="#7EB489" 
                unfilledColor="#000"
                borderRadius={10}
                borderWidth={0.5}
                borderColor="#7EB489"
                style={{margin: "auto"}}
              />
              <Text className="text-sm ml-4 tracking-widest font-Nunito text-success-100">Efficiency {(winCount / totalGamesPlayed)*100 || 0}%</Text>
            </View>
          </View>
          <View className="flex w-full h-[25%] items-center justify-center">
            <CustomButton handleClick={() => { dispatch(logout()); router.push('/signIn'); }} btnText="Reset Game" />
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

export default ProfileScreen;
