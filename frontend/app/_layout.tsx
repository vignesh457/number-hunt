import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomAlert from '@/components/CustomAlert';
import CustomSplashScreen from '@/components/CustomSplashScreen';
import '@/global.css';
import { store } from '@/redux/store';
import {
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import 'react-native-reanimated';
import CustomPopup from '@/components/CustomPopup';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": Fredoka_500Medium,
    "Nunito-SemiBold": Fredoka_600SemiBold,
    "Nunito-Bold": Fredoka_700Bold,
    "Nunito-Light": Fredoka_400Regular,
    "Nunito-Lightest": Fredoka_300Light
  });
  const [appIsReady, setAppIsReady] = useState(false);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#012030',
    },
  };

  // Prevent the splash screen from auto-hiding before we decide
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Prepare app: wait for fonts loaded, then hide splash
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        // You can do other async loading (API, assets) here if needed
        setAppIsReady(true);
        // Hide splash screen after layout
        // (Will be called again in onLayoutRootView just in case)
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // Optionally show your custom splash screen component while loading
    return <CustomSplashScreen />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={CustomTheme}>
        <View style={{ flex: 1, backgroundColor: '#012030' }} onLayout={onLayoutRootView}>
          <CustomAlert />
          <CustomPopup />
          {/* Slot will render the matched route */}
          <Slot />
          <StatusBar style="light"/>
        </View>
      </ThemeProvider>
    </Provider>
  );
}
