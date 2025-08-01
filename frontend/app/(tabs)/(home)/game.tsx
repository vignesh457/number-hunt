import CopyCode from '@/components/CopyCode'
import Grid from '@/components/Grid'
import Timer from '@/components/Timer'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { showPopup } from '@/redux/uiSlice'
import { socket } from '@/utils/socket'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const GameScreen = () => {
  const { roomCode, players } = useAppSelector((s) => s.game);
    const userId = useAppSelector((s) => s.user.id);
    const [points, setPoints] = useState(20);
  
    const myPlayer = players.find((p) => p.id === userId);
    const opponent = players.find((p) => p.id !== userId);
  
    const [isMyTurn, setIsMyTurn] = useState(myPlayer?.isHost);
    const [round, setRound] = useState(1);
    const [targetNumber, setTargetNumber] = useState<number | null>(null);
    const [myPoints, setMyPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
  
    const myPointsRef = useRef(myPoints);
    const opponentPointsRef = useRef(opponentPoints);
    // const hasSentZeroPoints = useRef(false);
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
      myPointsRef.current = myPoints;
      opponentPointsRef.current = opponentPoints;
    }, [myPoints, opponentPoints]);

    useEffect(() => {
      pointsRef.current = points;
    }, [points]);

    // useEffect(() => {
    //   if (points === 0 && !hasSentZeroPoints.current) {
    //     console.log("calling handleNumberFound(-1)");
    //     hasSentZeroPoints.current = true;
    //     handleNumberFound(-1);
    //   }
    // }, [points]);

  
    // 🔑 Listen for turn, number to find, etc.
    useEffect(() => {
      socket.on("number_selected", ({ targetNumber }) => {
        // hasSentZeroPoints.current = false;
        setTargetNumber(targetNumber);
      });
  
      socket.on("add_points", ({ playerId, points }) => {
        console.log(`Points added: ${points} by ${playerId === userId ? "you" : "opponent"} (${playerId})`);
        if (playerId === userId) {
          setMyPoints((prev) => prev + points);
        } else {
          setOpponentPoints((prev) => prev + points);
        }
        // switch turn
        setIsMyTurn(playerId === userId);
        // console.log(`isMyTurn: ${isMyTurn} (${userId})`);
        setTargetNumber(null);
        setRound((prev) => {
          const nextRound = prev + 1;
          if (Math.ceil(nextRound / 2) > 2) {
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
          params: { me: myPlayer?.name, opponent: opponent?.name, mypoints: myPointsRef.current, opponentPoints: opponentPointsRef.current },
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
      setPoints(20);
      const interval = setInterval(() => {
        console.log(`Points: ${pointsRef.current} is my turn to find: ${!isMyTurn} targetNumber: ${targetNumber}`);
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
      console.log(`Picked number: ${number} by ${myPlayer?.name}`);
      socket.emit("select_number", { roomCode, number });
    };
  
    const handleNumberFound = (num: number) => {
      console.log(`Found number: ${num}`);
      if(num === -1) {
        socket.emit("number_found", { roomCode, points: 0, userId });
        return;
      }
      if (num === targetNumber) {
        socket.emit("number_found", { roomCode, points, userId });
      }
    };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-400">
      <View className="flex items-center justify-center gap-2 p-2 w-[90%] rounded-2xl" >
        <View className='flex-row w-full h-11 items-center justify-between'>
          <View className='w-[45%] h-full flex items-center justify-center rounded-xl p-1 bg-black'>
            <Text className="w-full text-center text-xl font-NunitoSemiBold text-primary-100">Round : {round > 5 ? 5 : round}/5</Text>
          </View>
          <View className='w-[55%] h-full flex items-end justify-center'>
            <CopyCode viewClassName='bg-primary-300/70'/>
          </View>
        </View>
        {/* scores of players */}
        <View className='flex-row w-full items-center justify-between'>
        <View className='flex w-22 h-22 items-center justify-center rounded-[50%] p-2 bg-success-100'>
          <Text className="text-lg text-primary-300 font-NunitoBold">
            {myPlayer?.name || "Me"}
          </Text>
          <View className="flex items-center justify-center rounded-2xl h-10 w-10 mx-4">
            <Text className='text-lg text-primary-300/80 font-Nunito'>{myPoints}</Text>
          </View>
        </View>
        <View className='flex w-22 h-22 items-center justify-center rounded-[50%] p-2 bg-error-100'>
          <Text className="text-lg text-primary-300 font-NunitoBold">
            {opponent?.name || "Opponent"}
          </Text>
          <View className="flex items-center justify-center rounded-2xl h-10 w-10 mx-4">
            <Text className='text-lg text-primary-300/80 font-Nunito'>{opponentPoints}</Text>
          </View>
        </View>
        </View>
        {/* Timer */}
        {/* <Timer/> */}
        <Text className={`text-xl bg-black rounded-lg text-orange-200 border-[0.5px] border-orange-200/50 font-NunitoBold w-full text-center p-2 ${targetNumber ? "visible" : "visible"}`}>
          Points : {points}
        </Text>
        {/* comments on the game */}
      </View>
      {isMyTurn && (
        <View className='flex items-center justify-center gap-4'>
          <Text className='text-xl text-blue-100 font-NunitoBold'>{targetNumber ? `Opponent is searching for ${targetNumber}...`: "Assign a number"}</Text>
          <Grid
            targetNumber={targetNumber}
            onNumberClick={pickNumber}
            disabled={targetNumber!==null}
          />
        </View>
      )}
      {!isMyTurn && (
        <View className='flex items-center justify-center gap-4'>
          <Text className='text-xl text-blue-200 font-NunitoBold'>{targetNumber ? `Find ${targetNumber}`: "Opponent is assigning a number..." }</Text>
          <Grid
            targetNumber={targetNumber}
            onNumberClick={handleNumberFound}
            disabled={targetNumber===null}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default GameScreen