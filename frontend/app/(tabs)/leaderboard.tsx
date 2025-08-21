import BackgroundWrapper from '@/components/backgroundWrapper';
import LeaderboardItem from '@/components/LeaderboardItem';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setLeaderboard } from '@/redux/leaderboardSlice';
import { showAlert } from '@/redux/uiSlice';
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LeaderboardScreen = () => {
  const dispatch = useAppDispatch();
  const leaderboardData = useAppSelector((state) => state.leaderboard.entries);

  const fetchLeaderboardData = async () => {
    // Fetch leaderboard data from the server or store it in state
    console.log("Fetching leaderboard data...");
    try {
      const response = await fetch('http://192.168.1.3:3000/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      dispatch(setLeaderboard(data));
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      dispatch(showAlert({ type: 'error', message: 'Failed to fetch leaderboard data' }));
    }
  }

  useEffect(() => {
    // Fetch leaderboard data from the server or store it in state
    fetchLeaderboardData();
  },[])
  
  return (
    <BackgroundWrapper className='justify-center py-2'>
      <View className='flex w-[90%] h-[95%] items-center justify-center gap-2 p-4 bg-black border-[1px] border-primary-200/30 rounded-2xl'>
        <Text className='text-4xl p-4 font-NunitoSemiBold text-primary-100/80 tracking-wider bg-primary-300/60 w-full text-center rounded-2xl'>🏆 Leaderboard</Text>
        <FlatList
          data={leaderboardData}
          renderItem={({ item }) => <LeaderboardItem item={item} />}
          keyExtractor={(item) => item.userId}
          contentContainerStyle={{ paddingVertical: 20, gap: 12 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BackgroundWrapper>
  )
}

export default LeaderboardScreen