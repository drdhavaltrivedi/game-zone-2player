import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';
import { CellValue } from '../utils/gameLogic';

interface CellProps {
  value: CellValue;
  onPress: () => void;
  size: number;
  isWinningCell: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onPress, size, isWinningCell }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (value) {
      Animated.spring(opacityAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 300,
      }).start();
    }
  }, [value]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getSymbolColor = () => {
    if (value === 'X') return COLORS.player1;
    if (value === 'O') return COLORS.player2;
    return COLORS.text;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={value !== null}
        style={[
          styles.cell,
          {
            width: size,
            height: size,
            backgroundColor: isWinningCell ? COLORS.surfaceLight : COLORS.surface,
          },
        ]}
        activeOpacity={0.7}
      >
        {value && (
          <Animated.Text
            style={[
              styles.symbol,
              {
                color: getSymbolColor(),
                fontSize: size * 0.6,
                opacity: opacityAnim,
              },
            ]}
          >
            {value}
          </Animated.Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  symbol: {
    fontWeight: TYPOGRAPHY.weights.extrabold,
    textAlign: 'center',
  },
});
