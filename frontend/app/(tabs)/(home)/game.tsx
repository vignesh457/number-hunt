import CopyCode from '@/components/CopyCode'
import Grid from '@/components/Grid'
import Timer from '@/components/Timer'
import { images } from '@/constants'
import { setMyPoints, setOpponentPoints } from '@/redux/gameSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { showPopup } from '@/redux/uiSlice'
import { socket } from '@/utils/socket'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress'
import FlippingCoin from '@/components/FlippingCoin'

const GameScreen = () => {
  const { roomCode, players, myPoints, opponentPoints } = useAppSelector((s) => s.game);
    const userId = useAppSelector((s) => s.user.id);
    const [points, setPoints] = useState(30);
  
    const myPlayer = players.find((p) => p.id === userId);
    const opponent = players.find((p) => p.id !== userId);
  
    const [isMyTurn, setIsMyTurn] = useState(myPlayer?.isHost);
    const [round, setRound] = useState(1);
    const [targetNumber, setTargetNumber] = useState<number | null>(null);

    const pointsRef = useRef(points);

    const dispatch = useAppDispatch();

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          dispatch(showPopup({ title: 'Exit Game', message: 'Are you sure you want to exit the game?', confirmType: 'exit' }));
          return true;

        };
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => subscription.remove();
      }, [dispatch])
    );

    useEffect(() => {
      pointsRef.current = points;
    }, [points]);
    useEffect(() => {
      console.log(`myPoints: ${myPoints}, opponentPoints: ${opponentPoints}`);
    },[myPoints, opponentPoints]);
  
    // 🔑 Listen for turn, number to find, etc.
    useEffect(() => {
      socket.on("number_selected", ({ targetNumber }) => {
        // hasSentZeroPoints.current = false;
        setTargetNumber(targetNumber);
      });
  
      socket.on("add_points", ({ playerId, points }) => {
        console.log(`Points added: ${points} by ${playerId === userId ? "you" : "opponent"} (${playerId})`);
        // console.log(`myPoints: ${myPoints}, opponentPoints: ${opponentPoints}`);
        if (playerId === userId) {
          dispatch(setMyPoints(points ));
        } else {
          dispatch(setOpponentPoints(points));
        }
        // switch turn
        setIsMyTurn(playerId === userId);
        // console.log(`isMyTurn: ${isMyTurn} (${userId})`);
        setTargetNumber(null);
        setRound((prev) => {
          const nextRound = prev + 1;
          if (Math.ceil(nextRound / 2) > 5) {
            console.log("Emitting end_game now ###");
            socket.emit("end_game", { roomCode });
          }
          return nextRound;
        });
      });
  
      socket.on("game_ended", () => {
        // console.log("Game ended ###");
        router.replace({ 
          pathname: '/result',
          params: { me: myPlayer?.name, opponent: opponent?.name },
        });
     });


      return () => {
        socket.off("number_selected");
        socket.off("add_points");
        socket.off("game_ended");
      };
    }, []);

    useEffect(() => {
      //points timer
      if (!targetNumber) return;
      setPoints(30);
      const interval = setInterval(() => {
        // console.log(`Points: ${pointsRef.current} is my turn to find: ${!isMyTurn} targetNumber: ${targetNumber}`);
        if (pointsRef.current === 0 && !isMyTurn && targetNumber !== null) {
          handleNumberFound(-1);
          clearInterval(interval);
          return;
        }
        setPoints((p) => Math.max(0, p - 1));
      }, 1000);

      return () => clearInterval(interval);
    },[targetNumber]);
  
    const pickNumber = (number: number) => {
      // if (!isMyTurn) return;
      // console.log(`Picked number: ${number} by ${myPlayer?.name}`);
      socket.emit("select_number", { roomCode, number });
    };
  
    const handleNumberFound = (num: number) => {
      // console.log(`Found number: ${num}`);
      if(num === -1) {
        socket.emit("number_found", { roomCode, points: 0, userId });
        return;
      }
      if (num === targetNumber) {
        socket.emit("number_found", { roomCode, points, userId });
      }
    };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-400 gap-4">
      <View className="flex-[0.8] items-center justify-between gap-4 p-2 w-[90%] rounded-2xl">
        <View className='flex-row w-full h-11 items-center justify-between'>
          <View className='w-[45%] h-full flex items-center justify-center rounded-xl p-2 border-[1px] border-primary-300/70 bg-black'>
            <Text className="w-full text-center text-xl font-NunitoSemiBold text-primary-100">⚔️ Round : {Math.ceil(round / 2) > 5 ? 5 : Math.ceil(round / 2)}/5</Text>
          </View>
          <View className='w-[55%] h-full flex items-center justify-center'>
            <CopyCode viewClassName='bg-primary-400'/>
          </View>
        </View>
        {/* scores of players */}
        <View className='flex-row w-full items-center justify-between'>
          <View className='flex w-36 items-start justify-center p-4 bg-success-100 rounded-xl mr-4'>
            <Text className="text-md text-base w-[80%] text-primary-400 font-NunitoSemiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {myPlayer?.name || "Me"}
            </Text>
            <View className="absolute top-[-3px] right-[-8px] bg-black border-success-100 border-2 flex items-center justify-center rounded-3xl h-16 w-16">
              <Image source={images.coin} className='w-5 h-5' />
              <Text className='text-lg text-success-100 font-Nunito'>{myPoints}</Text>
            </View>
          </View>
          <View className='flex w-36 items-start justify-center p-4 bg-error-100 rounded-xl mr-4'>
            <Text className="text-md text-base w-[80%] text-primary-400 font-NunitoSemiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {opponent?.name || "Waiting..."}
            </Text>
            <View className="absolute top-[-3px] right-[-8px] bg-black border-error-100 border-2 flex items-center justify-center rounded-3xl h-16 w-16">
              <Image source={images.coin} className='w-5 h-5' />
              <Text className='text-lg text-error-100 font-Nunito'>{opponentPoints}</Text>
            </View>
          </View>
        </View>
        {/* Timer */}
        <View className="flex flex-row items-center justify-center bg-primary-300/20 rounded-lg border-[0.5px] border-primary-300 w-full p-2">
          <FlippingCoin />
          <Progress.Bar 
            progress={(points / 30) || 0} 
            width={240} 
            height={14} 
            color="#FFCB61" 
            unfilledColor="#000"
            borderRadius={10}
            borderWidth={1}
            borderColor="#FFCB61"
            style={{margin: "auto"}}
            animationType="timing"
          />
        </View>
        {/* comments on the game */}
      </View>
      {isMyTurn && (
        <View className='flex w-full items-center justify-center gap-4'>
          <View className="flex flex-row items-center justify-center bg-primary-300/20 rounded-lg border-[0.5px] border-primary-300 w-[90%] p-2"> 
            <Text className='text-xl text-primary-100/90 font-Nunito'>{targetNumber ? `Opponent is searching for ${targetNumber}...`: "Assign a number"}</Text>
          </View>
          <Grid
            targetNumber={targetNumber}
            onNumberClick={pickNumber}
            disabled={targetNumber!==null}
          />
        </View>
      )}
      {!isMyTurn && (
        <View className='flex w-full items-center justify-center gap-4'>
          <View className="flex flex-row items-center justify-center bg-primary-300/20 rounded-lg border-[0.5px] border-primary-300 w-[90%] p-2"> 
            <Text className='text-xl text-blue-200 font-NunitoSemiBold'>{targetNumber ? `Find ${targetNumber}`: "Opponent is assigning a number..." }</Text>
          </View>
          <Grid
            targetNumber={targetNumber}
            onNumberClick={handleNumberFound}
            disabled={targetNumber===null}
          />
        </View>
      )}
      <View className='w-full h-32 bg-black mt-4'>
          {/* Ads section */}
      </View>
    </SafeAreaView>
  )
}

export default GameScreen