import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { GameBoard } from '../components/GameBoard';
import { PlayerIndicator } from '../components/PlayerIndicator';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameStatus } from '../components/GameStatus';
import {
  getInitialGameState,
  makeMove,
  checkWinner,
  checkDraw,
  getNextPlayer,
  GameState,
} from '../utils/gameLogic';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface TicTacToeScreenProps {
  onBack: () => void;
}

export function TicTacToeScreen({ onBack }: TicTacToeScreenProps) {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());

  const handleCellPress = async (index: number) => {
    if (gameState.winner) return;

    const newBoard = makeMove(gameState.board, index, gameState.currentPlayer);
    if (!newBoard) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
    }));

    const { winner, winLine } = checkWinner(newBoard);
    
    if (winner) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        winner,
        winLine,
        scores: {
          ...prev.scores,
          [winner]: prev.scores[winner] + 1,
        },
      }));
    } else if (checkDraw(newBoard)) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        winner: 'draw',
        scores: {
          ...prev.scores,
          draws: prev.scores.draws + 1,
        },
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: getNextPlayer(prev.currentPlayer),
      }));
    }
  };

  const handleNewGame = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    setGameState(prev => ({
      ...getInitialGameState(),
      scores: prev.scores,
    }));
  };

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.backgroundGradient as [string, string]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Tic Tac Toe</Text>
            <Text style={styles.subtitle}>2 Player Offline Game</Text>
          </View>

          {/* Score Board */}
          <ScoreBoard scores={gameState.scores} />

          {/* Player Indicator */}
          <PlayerIndicator currentPlayer={gameState.currentPlayer} winner={gameState.winner} />

          {/* Game Board */}
          <GameBoard
            board={gameState.board}
            onCellPress={handleCellPress}
            winLine={gameState.winLine}
          />
        </ScrollView>

        {/* Game Status Modal */}
        <GameStatus winner={gameState.winner} onNewGame={handleNewGame} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING['2xl'],
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes['4xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
