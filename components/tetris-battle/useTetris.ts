'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Board, Piece, PieceType, GameState } from './types';
import { 
  createEmptyBoard, 
  generateBag, 
  getPiece, 
  checkCollision, 
  rotateMatrix, 
  clearLines, 
  addGarbageLines,
  calculateAttack
} from './gameLogic';
import { ROWS, COLS, WALL_KICKS, WALL_KICKS_I } from './Constants';

export const useTetris = (onLinesCleared: (lines: number, combo: number, isTSpin: boolean) => void) => {
  const [state, setState] = useState<GameState>({
    board: createEmptyBoard(),
    activePiece: null,
    nextPiece: 'I',
    holdPiece: null,
    canHold: true,
    score: 0,
    lines: 0,
    level: 1,
    isGameOver: false,
    combo: -1,
    bag: [],
    pendingGarbage: 0,
    lastMoveTSpin: false,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const spawnPiece = useCallback(() => {
    setState(prev => {
      let newBag = [...prev.bag];
      if (newBag.length <= 1) {
        newBag = [...newBag, ...generateBag()];
      }
      
      const nextType = newBag.shift()!;
      const piece = getPiece(nextType);
      
      if (checkCollision(prev.board, piece)) {
        return { ...prev, isGameOver: true };
      }
      
      return {
        ...prev,
        activePiece: piece,
        nextPiece: newBag[0],
        bag: newBag,
        canHold: true,
      };
    });
  }, []);

  const reset = useCallback((newLevel?: number) => {
    const initialBag = generateBag();
    const firstType = initialBag.shift()!;
    setState({
      board: createEmptyBoard(),
      activePiece: getPiece(firstType),
      nextPiece: initialBag[0],
      holdPiece: null,
      canHold: true,
      score: 0,
      lines: 0,
      level: newLevel || 1,
      isGameOver: false,
      combo: -1,
      bag: initialBag,
      pendingGarbage: 0,
      lastMoveTSpin: false,
    });
  }, []);

  const setLevel = useCallback((l: number) => {
    setState(prev => ({ ...prev, level: l }));
  }, []);

  const move = useCallback((dx: number, dy: number) => {
    setState(prev => {
      if (!prev.activePiece || prev.isGameOver) return prev;
      const newPos = { x: prev.activePiece.pos.x + dx, y: prev.activePiece.pos.y + dy };
      if (!checkCollision(prev.board, prev.activePiece, newPos)) {
        return { ...prev, activePiece: { ...prev.activePiece, pos: newPos }, lastMoveTSpin: false };
      }
      if (dy > 0) {
        // Landing
        return landPiece(prev);
      }
      return { ...prev, lastMoveTSpin: false };
    });
  }, []);

  const checkTSpin = (board: Board, piece: Piece): boolean => {
    if (piece.type !== 'T') return false;
    
    const corners = [
      { x: piece.pos.x, y: piece.pos.y },               // Top-left
      { x: piece.pos.x + 2, y: piece.pos.y },           // Top-right
      { x: piece.pos.x, y: piece.pos.y + 2 },           // Bottom-left
      { x: piece.pos.x + 2, y: piece.pos.y + 2 },       // Bottom-right
    ];

    let occupied = 0;
    corners.forEach(c => {
      if (c.x < 0 || c.x >= COLS || c.y >= ROWS || (c.y >= 0 && board[c.y][c.x])) {
        occupied++;
      }
    });

    return occupied >= 3;
  };

  const rotate = useCallback(() => {
    setState(prev => {
      if (!prev.activePiece || prev.isGameOver) return prev;
      
      const newShape = rotateMatrix(prev.activePiece.shape);
      const startRotation = prev.activePiece.rotation;
      const endRotation = (startRotation + 1) % 4;
      
      const kickTable = prev.activePiece.type === 'I' ? WALL_KICKS_I : WALL_KICKS;
      const kicks = kickTable[`${startRotation}-${endRotation}`] || [[0, 0]];

      for (const [dx, dy] of kicks) {
        const newPos = { x: prev.activePiece.pos.x + dx, y: prev.activePiece.pos.y + dy };
        if (!checkCollision(prev.board, prev.activePiece, newPos, newShape)) {
          const isTSpin = checkTSpin(prev.board, { ...prev.activePiece, pos: newPos, shape: newShape });
          return { 
            ...prev, 
            activePiece: { ...prev.activePiece, pos: newPos, shape: newShape, rotation: endRotation },
            lastMoveTSpin: isTSpin 
          };
        }
      }
      
      return prev;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setState(prev => {
      if (!prev.activePiece || prev.isGameOver) return prev;
      let newY = prev.activePiece.pos.y;
      while (!checkCollision(prev.board, prev.activePiece, { ...prev.activePiece.pos, y: newY + 1 })) {
        newY++;
      }
      return landPiece({ ...prev, activePiece: { ...prev.activePiece, pos: { ...prev.activePiece.pos, y: newY } } });
    });
  }, []);

  const hold = useCallback(() => {
    setState(prev => {
      if (!prev.activePiece || !prev.canHold || prev.isGameOver) return prev;
      
      let newHold = prev.activePiece.type;
      let newActive: Piece | null = null;
      let newNext = prev.nextPiece;
      let newBag = [...prev.bag];

      if (prev.holdPiece) {
        newActive = getPiece(prev.holdPiece);
      } else {
        newActive = getPiece(newNext);
        if (newBag.length <= 1) newBag = [...newBag, ...generateBag()];
        newNext = newBag.shift()!;
      }

      return {
        ...prev,
        activePiece: newActive,
        holdPiece: newHold,
        nextPiece: newNext,
        bag: newBag,
        canHold: false,
      };
    });
  }, []);

  const landPiece = (prevState: GameState): GameState => {
    const { board, activePiece, pendingGarbage, combo } = prevState;
    if (!activePiece) return prevState;

    const newBoard = board.map(row => [...row]);
    activePiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const by = activePiece.pos.y + y;
          const bx = activePiece.pos.x + x;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            newBoard[by][bx] = activePiece.color;
          }
        }
      });
    });

    const { newBoard: boardAfterClear, linesCleared } = clearLines(newBoard);
    
    // Battle logic: Pending Garbage
    let finalBoard = boardAfterClear;
    let newPendingGarbage = pendingGarbage;
    let newCombo = linesCleared > 0 ? combo + 1 : -1;

    if (linesCleared === 0 && pendingGarbage > 0) {
      finalBoard = addGarbageLines(boardAfterClear, pendingGarbage);
      newPendingGarbage = 0;
    }

    if (linesCleared > 0) {
      onLinesCleared(linesCleared, newCombo, prevState.lastMoveTSpin);
    }

    // Check game over again
    if (finalBoard[0].some(cell => cell !== null)) {
      return { ...prevState, board: finalBoard, isGameOver: true };
    }

    // Spawn next piece
    let nextBag = [...prevState.bag];
    if (nextBag.length <= 1) nextBag = [...nextBag, ...generateBag()];
    const nextType = nextBag.shift()!;
    const nextPieceObj = getPiece(nextType);

    return {
      ...prevState,
      board: finalBoard,
      activePiece: nextPieceObj,
      nextPiece: nextBag[0],
      bag: nextBag,
      canHold: true,
      lines: prevState.lines + linesCleared,
      score: prevState.score + linesCleared * 100 * prevState.level,
      combo: newCombo,
      pendingGarbage: newPendingGarbage,
    };
  };

  const receiveGarbage = useCallback((lines: number) => {
    setState(prev => ({ ...prev, pendingGarbage: prev.pendingGarbage + lines }));
  }, []);

  return { state, move, rotate, hardDrop, hold, reset, receiveGarbage, spawnPiece, setLevel };
};
