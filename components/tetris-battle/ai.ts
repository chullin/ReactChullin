import { Board, Piece, PieceType } from './types';
import { COLS, ROWS } from './Constants';
import { rotateMatrix, checkCollision } from './gameLogic';

interface AIAction {
  x: number;
  rotation: number;
  score: number;
}

const getColumnHeights = (board: Board): number[] => {
  const heights = Array(COLS).fill(0);
  const rows = board.length;
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < rows; y++) {
      if (board[y][x]) {
        heights[x] = rows - y;
        break;
      }
    }
  }
  return heights;
};

const countHoles = (board: Board): number => {
  let holes = 0;
  const rows = board.length;
  for (let x = 0; x < COLS; x++) {
    let blockFound = false;
    for (let y = 0; y < rows; y++) {
      if (board[y][x]) {
        blockFound = true;
      } else if (blockFound) {
        holes++;
      }
    }
  }
  return holes;
};

const getBumpiness = (heights: number[]): number => {
  let bumpiness = 0;
  for (let i = 0; i < heights.length - 1; i++) {
    bumpiness += Math.abs(heights[i] - heights[i + 1]);
  }
  return bumpiness;
};

// Evaluate a board state
const evaluateBoard = (board: Board): number => {
  const heights = getColumnHeights(board);
  const aggregateHeight = heights.reduce((a, b) => a + b, 0);
  const holes = countHoles(board);
  const bumpiness = getBumpiness(heights);
  
  // Weights (Standard heuristic weights for Tetris AI)
  const a = -0.510066;
  const c = -0.35663;
  const d = -0.184483;
  
  return a * aggregateHeight + c * holes + d * bumpiness;
};

export const findBestMove = (board: Board, piece: Piece): AIAction => {
  let bestAction: AIAction = { x: 0, rotation: 0, score: -Infinity };
  
  // Try all 4 rotations
  for (let r = 0; r < 4; r++) {
    let currentShape = piece.shape;
    for (let i = 0; i < r; i++) {
      currentShape = rotateMatrix(currentShape);
    }
    
    // Try all horizontal positions
    for (let x = -2; x < COLS; x++) {
      if (checkCollision(board, piece, { x, y: 0 }, currentShape)) continue;
      
      // Find landing Y
      let y = 0;
      while (!checkCollision(board, piece, { x, y: y + 1 }, currentShape)) {
        y++;
      }
      
      // Simulate landing
      const tempBoard = board.map(row => [...row]);
      let linesCleared = 0;
      for (let py = 0; py < currentShape.length; py++) {
        for (let px = 0; px < currentShape[py].length; px++) {
          if (currentShape[py][px]) {
            const by = y + py;
            const bx = x + px;
            if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
              tempBoard[by][bx] = piece.color;
            }
          }
        }
      }
      
      // Check for line clears
      const boardAfterLines = tempBoard.filter(row => row.some(cell => cell === null));
      linesCleared = ROWS - boardAfterLines.length;
      
      const score = evaluateBoard(boardAfterLines) + (linesCleared * 0.760666 * 10); // Weight for line clears
      
      if (score > bestAction.score) {
        bestAction = { x, rotation: r, score };
      }
    }
  }
  
  return bestAction;
};
