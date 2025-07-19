import Grid from '@/components/Grid'
import Timer from '@/components/Timer'
import { useAppSelector } from '@/redux/hook'
import { socket } from '@/utils/socket'
import { router } from 'expo-router'
import React, { use, useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const GameScreen = () => {
  const { roomCode, players } = useAppSelector((s) => s.game);
    const userId = useAppSelector((s) => s.user.id);
    const [points, setPoints] = useState(0);
  
    const myPlayer = players.find((p) => p.id === userId);
    const opponent = players.find((p) => p.id !== userId);
  
    const [isMyTurn, setIsMyTurn] = useState(myPlayer?.isHost);
    const [round, setRound] = useState(1);
    const [targetNumber, setTargetNumber] = useState<number | null>(null);
    const [myPoints, setMyPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
  
    const myPointsRef = useRef(myPoints);
    const opponentPointsRef = useRef(opponentPoints);
    useEffect(() => {
      myPointsRef.current = myPoints;
      opponentPointsRef.current = opponentPoints;
    }, [myPoints, opponentPoints]);
  
    // 🔑 Listen for turn, number to find, etc.
    useEffect(() => {
      socket.on("number_selected", ({ targetNumber, targetPlayer }) => {
        // if (targetPlayer === userId) {
        //   setTargetNumber(targetNumber);
        //   console.log(`Target number: ${targetNumber} to ${myPlayer?.name}`);
        // }
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
        console.log(`isMyTurn: ${isMyTurn} (${userId})`);
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
        console.log("Game ended ###");
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
      setPoints(30);
      const interval = setInterval(() => {
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
      if (num !== targetNumber) return;
      if (num === targetNumber) {
        socket.emit("number_found", { roomCode, points, userId });
      }
      // else{
      //   socket.emit("number_found", { roomCode, points: 0, userId });
      // }
    };
  return (
    <SafeAreaView className='flex-1 items-center justify-start bg-[#1A3E5E]'>
      <View className="flex items-center justify-center gap-2 p-2 w-[90%] rounded-2xl" >
        <Text className="text-xl text-[#1A3E5E] bg-blue-200 rounded-2xl px-4 py-1 font-NunitoBold">
          Round : {Math.ceil(round/2)}/5
        </Text>
        {/* scores of players */}
        <View className='flex-row w-full items-center justify-between'>
        <View className='flex items-center justify-start rounded-xl p-1 bg-blue-200/10'>
          <Text className="text-md text-blue-300 font-NunitoBold">
            {myPlayer?.name || "Me"}
          </Text>
          <View className="flex items-center justify-center rounded-2xl h-10 w-10 mx-4">
            <Text className='text-md text-blue-400 font-NunitoBold'>{myPoints}</Text>
          </View>
        </View>
        <View className='flex items-center justify-start rounded-xl p-1 bg-blue-200/10'>
          <Text className="text-md text-blue-300 font-NunitoBold">
            {opponent?.name || "Opponent"}
          </Text>
          <View className="flex items-center justify-center rounded-2xl h-10 w-10 mx-4">
            <Text className='text-md text-blue-400 font-NunitoBold'>{opponentPoints}</Text>
          </View>
        </View>
        </View>
        {/* Timer */}
        {/* <Timer/> */}
        <Text className={`text-xl text-blue-200 font-NunitoBold w-full text-center p-2 ${targetNumber ? "visible" : "invisible"}`}>Points : {points}</Text>
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