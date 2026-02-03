import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

const { width } = Dimensions.get('window');

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color1: string;
  color2: string;
}

const GAMES: Game[] = [
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game',
    icon: '⭕',
    color1: '#8B5CF6',
    color2: '#6366F1',
  },
  {
    id: 'connect4',
    title: 'Connect Four',
    description: 'Connect 4 discs to win',
    icon: '🔴',
    color1: '#EF4444',
    color2: '#F59E0B',
  },
  {
    id: 'dots',
    title: 'Dots & Boxes',
    description: 'Complete boxes to score',
    icon: '📦',
    color1: '#10B981',
    color2: '#3B82F6',
  },
];

interface HomeScreenProps {
  onSelectGame: (gameId: string) => void;
}

export function HomeScreen({ onSelectGame }: HomeScreenProps) {
  const handleGamePress = async (gameId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelectGame(gameId);
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🎮 Game Zone</Text>
            <Text style={styles.subtitle}>Choose Your Game</Text>
          </View>

          {/* Games Grid */}
          <View style={styles.gamesContainer}>
            {GAMES.map((game) => (
              <TouchableOpacity
                key={game.id}
                activeOpacity={0.8}
                onPress={() => handleGamePress(game.id)}
                style={styles.gameCardWrapper}
              >
                <LinearGradient
                  colors={[game.color1, game.color2]}
                  style={styles.gameCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.iconContainer}>
                    <Text style={styles.gameIcon}>{game.icon}</Text>
                  </View>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                  
                  <View style={styles.playButton}>
                    <Text style={styles.playButtonText}>PLAY</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>🎯 2-Player Offline Games</Text>
            <Text style={styles.footerSubtext}>No internet required</Text>
          </View>
        </ScrollView>
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
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  title: {
    fontSize: TYPOGRAPHY.sizes['4xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    letterSpacing: 1,
  },
  gamesContainer: {
    gap: SPACING.lg,
  },
  gameCardWrapper: {
    marginBottom: SPACING.md,
  },
  gameCard: {
    borderRadius: 20,
    padding: SPACING.xl,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: SPACING.md,
  },
  gameIcon: {
    fontSize: 64,
  },
  gameTitle: {
    fontSize: TYPOGRAPHY.sizes['2xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFFFFF',
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  playButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  footer: {
    marginTop: SPACING['2xl'],
    alignItems: 'center',
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  footerSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
});
