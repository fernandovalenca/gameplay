import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';

import { Routes } from './src/routes';
import { Background } from './src/components';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsHaveBeenLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  if (!fontsHaveBeenLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
