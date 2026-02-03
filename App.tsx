import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { TicTacToeScreen } from './screens/TicTacToeScreen';
import { ConnectFourScreen } from './screens/ConnectFourScreen';
import { DotsBoxesScreen } from './screens/DotsBoxesScreen';

type Screen = 'home' | 'tictactoe' | 'connect4' | 'dots';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleSelectGame = (gameId: string) => {
    setCurrentScreen(gameId as Screen);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        
        {currentScreen === 'home' && <HomeScreen onSelectGame={handleSelectGame} />}
        {currentScreen === 'tictactoe' && <TicTacToeScreen onBack={handleBackToHome} />}
        {currentScreen === 'connect4' && <ConnectFourScreen onBack={handleBackToHome} />}
        {currentScreen === 'dots' && <DotsBoxesScreen onBack={handleBackToHome} />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
