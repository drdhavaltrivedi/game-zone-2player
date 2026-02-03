import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

const { width } = Dimensions.get('window');
const GRID_SIZE = 5; // 5x5 grid of dots = 4x4 boxes
const DOT_SIZE = 12;
const LINE_THICKNESS = 4;
const CELL_SIZE = (width - SPACING.lg * 2 - DOT_SIZE) / GRID_SIZE;

type Player = 'player1' | 'player2';
type Line = { row: number; col: number; direction: 'h' | 'v'; owner: Player | null };
type Box = { row: number; col: number; owner: Player | null };

interface DotsBoxesScreenProps {
  onBack: () => void;
}

const createEmptyLines = (): Line[] => {
  const lines: Line[] = [];
  
  // Horizontal lines
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE - 1; col++) {
      lines.push({ row, col, direction: 'h', owner: null });
    }
  }
  
  // Vertical lines
  for (let row = 0; row < GRID_SIZE - 1; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      lines.push({ row, col, direction: 'v', owner: null });
    }
  }
  
  return lines;
};

const createEmptyBoxes = (): Box[] => {
  const boxes: Box[] = [];
  for (let row = 0; row < GRID_SIZE - 1; row++) {
    for (let col = 0; col < GRID_SIZE - 1; col++) {
      boxes.push({ row, col, owner: null });
    }
  }
  return boxes;
};

export function DotsBoxesScreen({ onBack }: DotsBoxesScreenProps) {
  const [lines, setLines] = useState<Line[]>(createEmptyLines());
  const [boxes, setBoxes] = useState<Box[]>(createEmptyBoxes());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);

  const checkBoxes = (newLines: Line[]): Box[] => {
    const updatedBoxes = boxes.map(box => {
      if (box.owner) return box; // Already owned
      
      const top = newLines.find(l => l.row === box.row && l.col === box.col && l.direction === 'h');
      const bottom = newLines.find(l => l.row === box.row + 1 && l.col === box.col && l.direction === 'h');
      const left = newLines.find(l => l.row === box.row && l.col === box.col && l.direction === 'v');
      const right = newLines.find(l => l.row === box.row && l.col === box.col + 1 && l.direction === 'v');
      
      if (top?.owner && bottom?.owner && left?.owner && right?.owner) {
        return { ...box, owner: currentPlayer };
      }
      
      return box;
    });
    
    return updatedBoxes;
  };

  const handleLinePress = async (lineIndex: number) => {
    if (gameOver || lines[lineIndex].owner) return;
    
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const newLines = [...lines];
    newLines[lineIndex] = { ...newLines[lineIndex], owner: currentPlayer };
    setLines(newLines);
    
    const updatedBoxes = checkBoxes(newLines);
    const boxesCompleted = updatedBoxes.filter(b => b.owner === currentPlayer).length - boxes.filter(b => b.owner === currentPlayer).length;
    
    setBoxes(updatedBoxes);
    
    if (boxesCompleted > 0) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScores(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + boxesCompleted,
      }));
    }
    
    // Check if game is over
    const totalBoxes = (GRID_SIZE - 1) * (GRID_SIZE - 1);
    const completedBoxes = updatedBoxes.filter(b => b.owner !== null).length;
    
    if (completedBoxes === totalBoxes) {
      setGameOver(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (boxesCompleted === 0) {
      // Switch player only if no box was completed
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }
  };

  const handleNewGame = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLines(createEmptyLines());
    setBoxes(createEmptyBoxes());
    setCurrentPlayer('player1');
    setGameOver(false);
  };

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const getLine = (row: number, col: number, direction: 'h' | 'v'): Line | undefined => {
    return lines.find(l => l.row === row && l.col === col && l.direction === direction);
  };

  const getBox = (row: number, col: number): Box | undefined => {
    return boxes.find(b => b.row === row && b.col === col);
  };

  const winner = gameOver
    ? scores.player1 > scores.player2
      ? 'Player 1'
      : scores.player2 > scores.player1
      ? 'Player 2'
      : 'Draw'
    : null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#3B82F6']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
            <Text style={styles.title}>📦 Dots & Boxes</Text>
          </View>

          {/* Score Board */}
          <View style={styles.scoreBoard}>
            <View style={[styles.scoreItem, currentPlayer === 'player1' && styles.activePlayer]}>
              <Text style={styles.playerLabel}>Player 1</Text>
              <Text style={styles.scoreText}>{scores.player1}</Text>
            </View>
            <View style={[styles.scoreItem, currentPlayer === 'player2' && styles.activePlayer]}>
              <Text style={styles.playerLabel}>Player 2</Text>
              <Text style={styles.scoreText}>{scores.player2}</Text>
            </View>
          </View>

          {/* Winner Banner */}
          {gameOver && (
            <View style={styles.winnerBanner}>
              <Text style={styles.winnerText}>
                {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
              </Text>
              <TouchableOpacity onPress={handleNewGame} style={styles.newGameButton}>
                <Text style={styles.newGameButtonText}>NEW GAME</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Game Board */}
          <View style={styles.board}>
            {Array.from({ length: GRID_SIZE }).map((_, row) => (
              <View key={row} style={styles.row}>
                {Array.from({ length: GRID_SIZE }).map((_, col) => {
                  const hLine = getLine(row, col, 'h');
                  const vLine = getLine(row, col, 'v');
                  const box = getBox(row, col);
                  
                  return (
                    <View key={col} style={styles.cellContainer}>
                      {/* Dot */}
                      <View style={styles.dot} />
                      
                      {/* Horizontal Line */}
                      {col < GRID_SIZE - 1 && hLine && (
                        <TouchableOpacity
                          onPress={() => {
                            const lineIndex = lines.findIndex(
                              l => l.row === row && l.col === col && l.direction === 'h'
                            );
                            handleLinePress(lineIndex);
                          }}
                          style={styles.horizontalLineContainer}
                        >
                          <View
                            style={[
                              styles.horizontalLine,
                              hLine.owner && {
                                backgroundColor:
                                  hLine.owner === 'player1' ? '#8B5CF6' : '#EC4899',
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      )}
                      
                      {/* Vertical Line */}
                      {row < GRID_SIZE - 1 && vLine && (
                        <TouchableOpacity
                          onPress={() => {
                            const lineIndex = lines.findIndex(
                              l => l.row === row && l.col === col && l.direction === 'v'
                            );
                            handleLinePress(lineIndex);
                          }}
                          style={styles.verticalLineContainer}
                        >
                          <View
                            style={[
                              styles.verticalLine,
                              vLine.owner && {
                                backgroundColor:
                                  vLine.owner === 'player1' ? '#8B5CF6' : '#EC4899',
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      )}
                      
                      {/* Box */}
                      {row < GRID_SIZE - 1 && col < GRID_SIZE - 1 && box && box.owner && (
                        <View
                          style={[
                            styles.boxFill,
                            {
                              backgroundColor:
                                box.owner === 'player1'
                                  ? 'rgba(139, 92, 246, 0.3)'
                                  : 'rgba(236, 72, 153, 0.3)',
                            },
                          ]}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
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
    paddingTop: SPACING.xl,
    paddingBottom: SPACING['2xl'],
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    marginBottom: SPACING.lg,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: '#FFFFFF',
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes['3xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  scoreItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activePlayer: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  playerLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: '#FFFFFF',
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  scoreText: {
    fontSize: TYPOGRAPHY.sizes['3xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFFFFF',
  },
  winnerBanner: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: TYPOGRAPHY.sizes['2xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFFFFF',
    marginBottom: SPACING.md,
  },
  newGameButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: 25,
  },
  newGameButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#10B981',
    letterSpacing: 1,
  },
  board: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
  },
  cellContainer: {
    position: 'relative',
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  dot: {
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  horizontalLineContainer: {
    position: 'absolute',
    top: -LINE_THICKNESS / 2,
    left: DOT_SIZE / 2,
    width: CELL_SIZE - DOT_SIZE / 2,
    height: LINE_THICKNESS * 3,
    justifyContent: 'center',
  },
  horizontalLine: {
    height: LINE_THICKNESS,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: LINE_THICKNESS / 2,
  },
  verticalLineContainer: {
    position: 'absolute',
    top: DOT_SIZE / 2,
    left: -LINE_THICKNESS / 2,
    width: LINE_THICKNESS * 3,
    height: CELL_SIZE - DOT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: LINE_THICKNESS,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: LINE_THICKNESS / 2,
  },
  boxFill: {
    position: 'absolute',
    top: DOT_SIZE / 2,
    left: DOT_SIZE / 2,
    width: CELL_SIZE - DOT_SIZE,
    height: CELL_SIZE - DOT_SIZE,
    borderRadius: 8,
  },
});
