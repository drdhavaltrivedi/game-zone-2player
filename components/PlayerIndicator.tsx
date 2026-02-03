import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Player } from '../utils/gameLogic';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';

interface PlayerIndicatorProps {
  currentPlayer: Player;
  winner: Player | 'draw' | null;
}

export const PlayerIndicator: React.FC<PlayerIndicatorProps> = ({ currentPlayer, winner }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (!winner) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [currentPlayer, winner]);

  if (winner) {
    return null;
  }

  const gradient = currentPlayer === 'X' ? COLORS.gradient2 : COLORS.gradient3;
  const playerName = currentPlayer === 'X' ? 'Player 1' : 'Player 2';

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: pulseAnim }] }]}>
      <LinearGradient colors={gradient} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.label}>Current Turn</Text>
        <View style={styles.playerInfo}>
          <Text style={styles.symbol}>{currentPlayer}</Text>
          <Text style={styles.playerName}>{playerName}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  gradient: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  symbol: {
    fontSize: TYPOGRAPHY.sizes['3xl'],
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.extrabold,
  },
  playerName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
