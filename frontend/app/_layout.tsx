import CustomAlert from '@/components/CustomAlert';
import '@/global.css';
import { store } from '@/redux/store';
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const [loaded] = useFonts({
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-Light": Nunito_300Light,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <CustomAlert />
        <Slot /> 
      <StatusBar style="light" />
    </Provider>
  );
}
