import { Piece, PieceType, Board, SpinType } from './types';
import { COLS, ROWS, PIECES } from './Constants';

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
  const newMatrix = matrix[0].map((_, index) => matrix.map(col => col[index]));
  if (dir === 1) {
    return newMatrix.map(row => row.reverse());
  }
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
  const hole = Math.floor(Math.random() * COLS);
  for (let i = 0; i < linesToAdd; i++) {
    const row = Array(COLS).fill('#555555');
    row[hole] = null; // same hole column for this batch (feels more manageable)
    newBoard.push(row);
  }
  return newBoard;
};

/**
 * Check if the last rotation was a "Spin" (T-Spin, S-Spin, Z-Spin, L-Spin, J-Spin)
 * Uses 3-corner rule: at least 3 of the 4 bounding-box corners are occupied/wall
 */
export const checkSpin = (board: Board, piece: Piece): SpinType => {
  const spinnable: PieceType[] = ['T', 'S', 'Z', 'L', 'J'];
  if (!spinnable.includes(piece.type)) return null;

  const size = piece.shape.length; // 3 for most pieces
  const corners = [
    { x: piece.pos.x,          y: piece.pos.y },
    { x: piece.pos.x + size - 1, y: piece.pos.y },
    { x: piece.pos.x,          y: piece.pos.y + size - 1 },
    { x: piece.pos.x + size - 1, y: piece.pos.y + size - 1 },
  ];

  let occupied = 0;
  for (const c of corners) {
    if (c.x < 0 || c.x >= COLS || c.y >= ROWS || (c.y >= 0 && board[c.y][c.x])) {
      occupied++;
    }
  }

  return occupied >= 3 ? piece.type : null;
};

/**
 * Attack calculation with:
 * - T-Spin: ×2 multiplier
 * - S/Z/L/J Spin: lines × 1.5 (rounded)
 * - Enhanced Combo scaling
 */
export const calculateAttack = (
  lines: number,
  combo: number,
  level: number = 1,
  spinType: SpinType = null
): number => {
  let baseAttack = 0;

  if (spinType === 'T') {
    // T-Spin doubles attack
    if (lines === 1) baseAttack = 2;
    else if (lines === 2) baseAttack = 4;
    else if (lines === 3) baseAttack = 6;
  } else if (spinType && ['S', 'Z', 'L', 'J'].includes(spinType)) {
    // S/Z/L/J Spin: 1.5× scaling
    if (lines === 1) baseAttack = 1;
    else if (lines === 2) baseAttack = 3;
    else if (lines === 3) baseAttack = 5;
  } else {
    // Normal clears
    if (lines === 1) baseAttack = level > 3 ? 1 : 0;
    if (lines === 2) baseAttack = level > 2 ? 1 : 0;
    if (lines === 3) baseAttack = level > 1 ? 2 : 1;
    if (lines === 4) baseAttack = level > 1 ? 4 : 2; // Tetris
  }

  // Combo bonus (enhanced scaling)
  if (lines > 0 && combo > 0) {
    if (combo >= 7) baseAttack += 3;
    else if (combo >= 5) baseAttack += 2;
    else if (combo >= 3) baseAttack += 1;
    else baseAttack += Math.floor(combo / 2);
  }

  return baseAttack;
};

/**
 * Score for clearing lines (accounting for spin bonus and level)
 */
export const calculateScore = (lines: number, level: number, spinType: SpinType, combo: number): number => {
  const BASE = [0, 100, 300, 500, 800];
  const base = (BASE[Math.min(lines, 4)] || 0) * level;
  const spinBonus = spinType ? (spinType === 'T' ? base * 1 : Math.floor(base * 0.5)) : 0;
  const comboBonus = combo > 0 ? combo * 50 * level : 0;
  return base + spinBonus + comboBonus;
};
