import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {

  return (
    <>
    <Tabs screenOptions={{
    tabBarStyle: {
      backgroundColor: '#000',
      borderRadius: 20,
      height: 70,
      width: '90%',
      alignSelf: 'center',
      paddingBottom: 10,
      paddingTop: 10,
      marginBottom: 15,
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: '#0ea5e9', // active icon/text color
    tabBarInactiveTintColor: '#3282B8', // inactive icon/text color
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: 'Nunito-Bold',
    },
  }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'trophy' : 'trophy-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
    <StatusBar style="light" />
    </>
  );
}
