import { setGameConfig } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { socket } from '@/utils/socket';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React, { use, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LobbyScreen = () => {
  const {roomCode, players} = useAppSelector((state) => state.game);
  const {id} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // separating player 1 and player 2
  const player1 = players.find((player) => player.id === id);
  const player2 = players.find((player) => player.id !== id);

  useEffect(() => {
    socket.on('game_started', () => {
      router.replace('/game');
    });
    socket.on('grid_updated', ({grid}) => {
      console.log(`Grid updated: ${JSON.stringify(grid)}`);
      dispatch(setGameConfig({ grid }));
    })
    return () => {
      socket.off('game_started');
    }
  }, []);

  const handleStartGame = () => {
    socket.emit("start_game", { roomCode });
  }

  return (
    <View className='flex-1 items-center justify-evenly bg-[#1A3E5E]'>
        <View className="flex gap-4 items-center justify-center p-8 w-4/5 rounded-2xl bg-blue-300" style={{
        boxShadow: 'rgba(50, 50, 93, 0.2) 5px 5px 20px, rgba(10, 37, 64, 0.5) 0px -2px 15px inset'
        }}>
            <Text className="text-2xl text-white mb-2 font-NunitoBold">
                Players
            </Text>
            <View className='flex-row gap-4 items-center justify-start rounded-2xl p-2 h-20 bg-blue-200 w-[90%]' style={{
                boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(55, 55, 55, 0.2) 2px 2px 10px inset'
            }}>
                <TouchableOpacity className="flex items-center justify-center rounded-2xl bg-blue-200 p-2 h-12 w-12 mx-4 " style={{
                    boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
                    }}
                    onPress={() => {router.back()}}
                >
                    <Ionicons name="person" size={24} color="#60a5fa"/>
                </TouchableOpacity>

                <Text className="text-xl text-blue-400 font-NunitoBold">
                    {player1?.name}
                </Text>
            </View>
            <View className='flex gap-4 items-center justify-center rounded-2xl p-2 h-40 bg-blue-100 w-[90%]' style={{
                boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(55, 55, 55, 0.2) 2px 2px 10px inset'
            }}>
                <View className="flex items-center justify-center rounded-md">
                    <FontAwesome5 name="user-friends" size={24} color="#60a5fa" />
                </View>
        
                <Text className="text-xl text-blue-400 mb-2 font-NunitoBold">
                    {player2?(player2.name):'Waiting for player 2...'}
                </Text>
                <Text className="text-blue-400 text-sm text-center leading-relaxed font-NunitoSemiBold">
                    Room code: <Text className="font-NunitoBold">{roomCode}</Text>
                </Text>
            </View>
        </View>
        <TouchableOpacity className="flex-row items-center justify-center rounded-2xl p-2 h-16 bg-[#FB9844] w-4/5" style={{
            boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
            }}
            onPress={handleStartGame}
            disabled={!(players.length == 2 && player1?.isHost)}
        >
            <Text className="text-white font-medium font-NunitoBold text-md">
                {players.length == 2 && (player1?.isHost ? 'Start Game' : 'Waiting for host to start game...')}
                {players.length != 2 && 'Waiting for other player...'}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default LobbyScreen