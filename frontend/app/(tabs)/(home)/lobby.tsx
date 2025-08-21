import BackgroundWrapper from '@/components/backgroundWrapper';
import CopyCode from '@/components/CopyCode';
import { setGameConfig, setMyPoints, setOpponentPoints } from '@/redux/gameSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { showPopup } from '@/redux/uiSlice';
import { socket } from '@/utils/socket';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { use, useCallback, useEffect } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';

const LobbyScreen = () => {
  const {roomCode, players} = useAppSelector((state) => state.game);
  const id = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  // separating player 1 and player 2
  const player1 = players.find((player) => player.id === id);
  const player2 = players.find((player) => player.id !== id);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log("Leaving LobbyScreen, leaving room...");
        socket.emit("leave_room", { roomCode, userId: id });
        router.replace('/');
        return false;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [dispatch])
  );

  useEffect(() => {
    socket.on('game_started', () => {
      setMyPoints(0);
      setOpponentPoints(0);
      router.replace('/home');
      router.push('/game');
    });
    socket.on('grid_updated', ({grid}) => {
      // console.log(`Grid updated: ${JSON.stringify(grid)}`);
      // console.log(`Grid updated`);
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
    <BackgroundWrapper className="justify-center">
      <View className="h-[85%] w-full flex items-center justify-evenly">
        <View className="flex items-center justify-center gap-4 p-8 w-4/5 rounded-2xl bg-black border-[1px] border-primary-300/60">
            <Text className="text-4xl text-primary-100 mb-2 font-NunitoBold">
                Players
            </Text>
            <View className='flex-row gap-4 items-center justify-start rounded-2xl p-2 h-20 bg-sky-400 w-[90%]' style={{
                boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(186, 230, 253, 0.8) 5px 5px 10px inset'
            }}>
                <View className="flex items-center justify-center rounded-2xl bg-sky-400 p-2 h-12 w-12 mx-4 " style={{
                    boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(186, 230, 253, 0.8) 5px 5px 10px inset'
                    }}
                >
                    <Ionicons name="person" size={24} color="#0F4C75"/>
                </View>

                <Text className="text-xl text-primary-300 font-NunitoSemiBold">
                    {player1?.name} {player1?.isHost?'(Host)':''}
                </Text>
            </View>
            <View className='flex gap-4 items-center justify-center rounded-2xl p-2 h-40 bg-blue-400 w-[90%]' style={{
                boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(186, 230, 253, 0.8) 5px 5px 10px inset'
            }}>
                <View className="flex items-center justify-center rounded-2xl bg-blue-400 p-2 h-15 w-15 mx-4 " style={{
                    boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(186, 230, 253, 0.8) 5px 5px 10px inset'
                    }}>
                    <FontAwesome5 name="user-friends" size={24} color="#0F4C75" />
                </View>
        
                <Text className="text-xl text-primary-300 mb-2 font-NunitoSemiBold">
                    {player2?(player2.name):'Waiting for player 2...'} {player2?.isHost?'(Host)':''}
                </Text>
            </View>
            <CopyCode/>
        </View>
        <TouchableOpacity className={`flex-row items-center justify-center rounded-2xl p-2 h-16 bg-secondary-200 w-4/5 ${players.length == 2 && player1?.isHost ? '' : 'opacity-80'}`} style={{
                    boxShadow:
                      'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 203, 97, 0.7) 5px 5px 10px inset',
                  }}
            onPress={handleStartGame}
            disabled={!(players.length == 2 && player1?.isHost)}
        >
            <Text className="text-primary-300 font-NunitoSemiBold text-xl">
                {players.length == 2 && (player1?.isHost ? 'Start Game' : 'Waiting for host to start game...')}
                {players.length != 2 && 'Waiting for other player...'}
            </Text>
        </TouchableOpacity>
      </View>
      <View className='w-full h-[15%] bg-black mt-4'>
          {/* Ads section */}
      </View>
    </BackgroundWrapper>
  )
}

export default LobbyScreen