import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import '@/global.css';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
    tabBarStyle: {
      backgroundColor: '#BFDBFE',
      borderRadius: 20,
      height: 70,
      width: '95%',
      alignSelf: 'center',
      paddingBottom: 10,
      paddingTop: 10,
      marginBottom: 20,
      boxShadow: 'rgba(50, 50, 93, 0.3) 3px 3px 15px, rgba(255, 255, 255, 0.8) 3px 3px 10px inset'
    },
    tabBarActiveTintColor: '#2563eb', // active icon/text color
    tabBarInactiveTintColor: '#2563eb', // inactive icon/text color
    tabBarLabelStyle: {
      fontSize: 12,
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
  );
}
