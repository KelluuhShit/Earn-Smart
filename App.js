import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import StackNavigator from './navigation/StackNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}