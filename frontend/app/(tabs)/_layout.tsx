import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const pathname = usePathname();
  return (
    <>
    <Tabs screenOptions={{
    tabBarStyle: [{
      backgroundColor: '#0a1a33',
      borderRadius: 30,
      height: 75,
      width: '90%',
      alignSelf: 'center',
      paddingBottom: 10,
      paddingTop: 10,
      marginBottom: 15,
      borderTopWidth: 0,
      boxShadow: 'rgba(31, 125, 183, 0.4) 0px -5px 10px inset',
    },
      (pathname === "/home" || pathname === "/leaderboard" || pathname === "/profile") ? null : { display: 'none' },
    ],
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
