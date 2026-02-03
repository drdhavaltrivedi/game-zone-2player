import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.scoreCard, styles.player1Card]}>
        <Text style={styles.scoreLabel}>Player 1</Text>
        <Text style={styles.symbol}>X</Text>
        <Text style={styles.score}>{scores.X}</Text>
      </View>

      <View style={[styles.scoreCard, styles.drawCard]}>
        <Text style={styles.scoreLabel}>Draws</Text>
        <Text style={styles.drawIcon}>─</Text>
        <Text style={styles.score}>{scores.draws}</Text>
      </View>

      <View style={[styles.scoreCard, styles.player2Card]}>
        <Text style={styles.scoreLabel}>Player 2</Text>
        <Text style={styles.symbol}>O</Text>
        <Text style={styles.score}>{scores.O}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  player1Card: {
    borderTopWidth: 3,
    borderTopColor: COLORS.player1,
  },
  player2Card: {
    borderTopWidth: 3,
    borderTopColor: COLORS.player2,
  },
  drawCard: {
    borderTopWidth: 3,
    borderTopColor: COLORS.textSecondary,
  },
  scoreLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  symbol: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  drawIcon: {
    fontSize: TYPOGRAPHY.sizes['2xl'],
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    marginBottom: SPACING.xs,
  },
  score: {
    fontSize: TYPOGRAPHY.sizes['2xl'],
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
