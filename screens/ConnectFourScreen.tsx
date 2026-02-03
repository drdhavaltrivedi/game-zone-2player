import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - SPACING.lg * 2) / 7;

type Player = 'red' | 'yellow' | null;
type Board = Player[][];

interface ConnectFourScreenProps {
  onBack: () => void;
}

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

const checkWinner = (board: Board): { winner: Player; line: number[][] } => {
  // Check horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const cell = board[row][col];
      if (
        cell &&
        cell === board[row][col + 1] &&
        cell === board[row][col + 2] &&
        cell === board[row][col + 3]
      ) {
        return {
          winner: cell,
          line: [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]],
        };
      }
    }
  }

  // Check vertical
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      if (
        cell &&
        cell === board[row + 1][col] &&
        cell === board[row + 2][col] &&
        cell === board[row + 3][col]
      ) {
        return {
          winner: cell,
          line: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]],
        };
      }
    }
  }

  // Check diagonal (down-right)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const cell = board[row][col];
      if (
        cell &&
        cell === board[row + 1][col + 1] &&
        cell === board[row + 2][col + 2] &&
        cell === board[row + 3][col + 3]
      ) {
        return {
          winner: cell,
          line: [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]],
        };
      }
    }
  }

  // Check diagonal (down-left)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      const cell = board[row][col];
      if (
        cell &&
        cell === board[row + 1][col - 1] &&
        cell === board[row + 2][col - 2] &&
        cell === board[row + 3][col - 3]
      ) {
        return {
          winner: cell,
          line: [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]],
        };
      }
    }
  }

  return { winner: null, line: [] };
};

const isBoardFull = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export function ConnectFourScreen({ onBack }: ConnectFourScreenProps) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const [winner, setWinner] = useState<Player | 'draw'>(null);
  const [winningLine, setWinningLine] = useState<number[][]>([]);
  const [scores, setScores] = useState({ red: 0, yellow: 0, draws: 0 });

  const dropDisc = async (col: number) => {
    if (winner) return;

    // Find the lowest empty row in the column
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === null) {
        row = r;
        break;
      }
    }

    if (row === -1) return; // Column is full

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const { winner: gameWinner, line } = checkWinner(newBoard);

    if (gameWinner) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setWinner(gameWinner);
      setWinningLine(line);
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (isBoardFull(newBoard)) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const handleNewGame = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBoard(createEmptyBoard());
    setCurrentPlayer('red');
    setWinner(null);
    setWinningLine([]);
  };

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  };

  const isWinningCell = (row: number, col: number): boolean => {
    return winningLine.some(([r, c]) => r === row && c === col);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EF4444', '#F59E0B']}
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
            <Text style={styles.title}>🔴 Connect Four</Text>
          </View>

          {/* Score Board */}
          <View style={styles.scoreBoard}>
            <View style={styles.scoreItem}>
              <View style={[styles.scoreDisc, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.scoreText}>{scores.red}</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>DRAWS</Text>
              <Text style={styles.scoreText}>{scores.draws}</Text>
            </View>
            <View style={styles.scoreItem}>
              <View style={[styles.scoreDisc, { backgroundColor: '#FBBF24' }]} />
              <Text style={styles.scoreText}>{scores.yellow}</Text>
            </View>
          </View>

          {/* Current Player */}
          {!winner && (
            <View style={styles.playerIndicator}>
              <View
                style={[
                  styles.currentDisc,
                  { backgroundColor: currentPlayer === 'red' ? '#DC2626' : '#FBBF24' },
                ]}
              />
              <Text style={styles.playerText}>
                {currentPlayer === 'red' ? 'Red' : 'Yellow'}'s Turn
              </Text>
            </View>
          )}

          {winner && (
            <View style={styles.winnerBanner}>
              <Text style={styles.winnerText}>
                {winner === 'draw' ? "It's a Draw!" : `${winner === 'red' ? 'Red' : 'Yellow'} Wins!`}
              </Text>
              <TouchableOpacity onPress={handleNewGame} style={styles.newGameButton}>
                <Text style={styles.newGameButtonText}>NEW GAME</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Game Board */}
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => dropDisc(colIndex)}
                    activeOpacity={0.7}
                    style={[
                      styles.cell,
                      isWinningCell(rowIndex, colIndex) && styles.winningCell,
                    ]}
                  >
                    {cell && (
                      <View
                        style={[
                          styles.disc,
                          {
                            backgroundColor: cell === 'red' ? '#DC2626' : '#FBBF24',
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                ))}
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
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreDisc: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: SPACING.xs,
  },
  scoreLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: '#FFFFFF',
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  scoreText: {
    fontSize: TYPOGRAPHY.sizes['2xl'],
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFFFFF',
  },
  playerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  currentDisc: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: SPACING.sm,
  },
  playerText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
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
    color: '#EF4444',
    letterSpacing: 1,
  },
  board: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: SPACING.sm,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    margin: 2,
    borderRadius: CELL_SIZE / 2,
  },
  winningCell: {
    backgroundColor: '#10B981',
  },
  disc: {
    width: CELL_SIZE * 0.75,
    height: CELL_SIZE * 0.75,
    borderRadius: (CELL_SIZE * 0.75) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
