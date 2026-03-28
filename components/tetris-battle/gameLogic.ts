import { Piece, PieceType, Board, GameState } from './types';
import { COLS, ROWS, PIECES, WALL_KICKS } from './Constants';

export const createEmptyBoard = (): Board => 
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateBag = (): PieceType[] => {
  const types: PieceType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  return shuffle([...types]);
};

export const getPiece = (type: PieceType): Piece => {
  return {
    type,
    pos: { x: Math.floor(COLS / 2) - 1, y: 0 },
    rotation: 0,
    shape: PIECES[type].shape,
    color: PIECES[type].color,
  };
};

export const rotateMatrix = (matrix: number[][], dir: number = 1): number[][] => {
  // Transpose
  const newMatrix = matrix[0].map((_, index) => matrix.map(col => col[index]));
  if (dir === 1) {
    // Clockwise: reverse each row
    return newMatrix.map(row => row.reverse());
  }
  // Counter-Clockwise: reverse the order of rows
  return newMatrix.reverse();
};

export const checkCollision = (board: Board, piece: Piece, pos = piece.pos, shape = piece.shape): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = pos.x + x;
        const boardY = pos.y + y;
        if (
          boardX < 0 || 
          boardX >= COLS || 
          boardY >= ROWS ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const getShadowPos = (board: Board, piece: Piece): { x: number; y: number } => {
  let shadowY = piece.pos.y;
  while (!checkCollision(board, piece, { ...piece.pos, y: shadowY + 1 })) {
    shadowY++;
  }
  return { x: piece.pos.x, y: shadowY };
};

export const clearLines = (board: Board): { newBoard: Board; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = ROWS - newBoard.length;
  const emptyRows = Array.from({ length: linesCleared }, () => Array(COLS).fill(null));
  return {
    newBoard: [...emptyRows, ...newBoard],
    linesCleared,
  };
};

export const addGarbageLines = (board: Board, lines: number): Board => {
  const linesToAdd = Math.min(lines, ROWS);
  const newBoard = board.slice(linesToAdd);
  for (let i = 0; i < linesToAdd; i++) {
    const row = Array(COLS).fill('#a0a0a0');
    const hole = Math.floor(Math.random() * COLS);
    row[hole] = null;
    newBoard.push(row);
  }
  return newBoard;
};

export const calculateAttack = (lines: number, combo: number, level: number = 1, isTSpin: boolean = false): number => {
  let baseAttack = 0;
  
  if (isTSpin) {
    // T-Spin bonuses are usually linesCleared * 2
    if (lines === 1) baseAttack = 2;
    if (lines === 2) baseAttack = 4;
    if (lines === 3) baseAttack = 6;
    if (lines === 0) baseAttack = 0; // T-Spin with no clear is 0 attack in some rules, or just bonus points
  } else {
    if (lines === 2) baseAttack = level > 2 ? 1 : 0;
    if (lines === 3) baseAttack = level > 1 ? 2 : 1;
    if (lines === 4) baseAttack = level > 1 ? 4 : 2;
  }
  
  if (lines > 0 && combo > 0) {
    baseAttack += Math.floor(combo / 2);
  }
  return baseAttack;
};
