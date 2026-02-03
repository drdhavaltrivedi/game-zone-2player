// Game Logic Utilities

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export interface GameState {
    board: Board;
    currentPlayer: Player;
    winner: Player | 'draw' | null;
    winLine: number[] | null;
    scores: {
        X: number;
        O: number;
        draws: number;
    };
}

// All possible winning combinations (indices)
const WINNING_COMBINATIONS = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
];

/**
 * Check if there's a winner on the board
 * Returns the winning player and the winning line indices
 */
export const checkWinner = (board: Board): { winner: Player | null; winLine: number[] | null } => {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a] as Player, winLine: combination };
        }
    }
    return { winner: null, winLine: null };
};

/**
 * Check if the game is a draw (all cells filled, no winner)
 */
export const checkDraw = (board: Board): boolean => {
    return board.every(cell => cell !== null);
};

/**
 * Create a new empty board
 */
export const createEmptyBoard = (): Board => {
    return Array(9).fill(null);
};

/**
 * Get the initial game state
 */
export const getInitialGameState = (): GameState => {
    return {
        board: createEmptyBoard(),
        currentPlayer: 'X',
        winner: null,
        winLine: null,
        scores: {
            X: 0,
            O: 0,
            draws: 0,
        },
    };
};

/**
 * Make a move on the board
 * Returns new board if move is valid, null otherwise
 */
export const makeMove = (board: Board, index: number, player: Player): Board | null => {
    if (board[index] !== null) {
        return null; // Cell already occupied
    }

    const newBoard = [...board];
    newBoard[index] = player;
    return newBoard;
};

/**
 * Switch to the next player
 */
export const getNextPlayer = (currentPlayer: Player): Player => {
    return currentPlayer === 'X' ? 'O' : 'X';
};
