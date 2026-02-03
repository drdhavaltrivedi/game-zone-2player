import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Player } from '../utils/gameLogic';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';

interface GameStatusProps {
  winner: Player | 'draw' | null;
  onNewGame: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, onNewGame }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (winner) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      bounceAnim.setValue(0);
    }
  }, [winner]);

  if (!winner) {
    return null;
  }

  const isDraw = winner === 'draw';
  const gradient = isDraw ? COLORS.gradient1 : winner === 'X' ? COLORS.gradient2 : COLORS.gradient3;
  const winnerName = winner === 'X' ? 'Player 1' : winner === 'O' ? 'Player 2' : '';

  const bounce = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.modalContainer}>
        <LinearGradient colors={gradient} style={styles.modal} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Animated.View style={{ transform: [{ translateY: bounce }] }}>
            {isDraw ? (
              <>
                <Text style={styles.emoji}>🤝</Text>
                <Text style={styles.title}>It's a Draw!</Text>
                <Text style={styles.subtitle}>Well played both!</Text>
              </>
            ) : (
              <>
                <Text style={styles.emoji}>🎉</Text>
                <Text style={styles.title}>{winnerName} Wins!</Text>
                <Text style={styles.subtitle}>
                  {winner} takes the victory
                </Text>
              </>
            )}
          </Animated.View>

          <TouchableOpacity style={styles.button} onPress={onNewGame} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.backgroundLight, COLORS.background]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
  },
  modal: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING['2xl'],
    alignItems: 'center',
    ...SHADOWS.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes['3xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    opacity: 0.9,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
});
