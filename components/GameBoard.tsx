import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Cell } from './Cell';
import { Board, CellValue } from '../utils/gameLogic';
import { GAME } from '../constants/theme';

interface GameBoardProps {
  board: Board;
  onCellPress: (index: number) => void;
  winLine: number[] | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CELL_SIZE = (SCREEN_WIDTH - GAME.boardPadding * 2 - GAME.cellGap * 2) / 3;

export const GameBoard: React.FC<GameBoardProps> = ({ board, onCellPress, winLine }) => {
  const isWinningCell = (index: number) => {
    return winLine ? winLine.includes(index) : false;
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onPress={() => onCellPress(index)}
            size={CELL_SIZE}
            isWinningCell={isWinningCell(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: CELL_SIZE * 3 + GAME.cellGap * 2,
    height: CELL_SIZE * 3 + GAME.cellGap * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAME.cellGap,
  },
});
