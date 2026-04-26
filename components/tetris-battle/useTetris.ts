'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Board, Piece, PieceType, GameState, SpinType } from './types';
import {
  createEmptyBoard,
  generateBag,
  getPiece,
  checkCollision,
  rotateMatrix,
  clearLines,
  addGarbageLines,
  calculateAttack,
  calculateScore,
  checkSpin,
} from './gameLogic';
import { ROWS, COLS, WALL_KICKS, WALL_KICKS_I, GARBAGE_DELAY_MS } from './Constants';

const NEXT_PREVIEW_COUNT = 3;

export const useTetris = (
  onLinesCleared: (lines: number, combo: number, spinType: SpinType) => void
) => {
  const [state, setState] = useState<GameState>({
    board: createEmptyBoard(),
    activePiece: null,
    nextPieces: ['I', 'O', 'T'],
    holdPiece: null,
    canHold: true,
    score: 0,
    lines: 0,
    level: 1,
    isGameOver: false,
    combo: -1,
    bag: [],
    pendingGarbage: 0,
    garbageTimer: null,
    lastMoveTSpin: false,
    lastSpinType: null,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  // Garbage flush timer: after GARBAGE_DELAY_MS, push pending garbage into board
  useEffect(() => {
    if (state.pendingGarbage <= 0 || state.garbageTimer === null || state.isGameOver) return;

    const now = Date.now();
    const elapsed = now - state.garbageTimer;
    const remaining = GARBAGE_DELAY_MS - elapsed;

    if (remaining <= 0) {
      // Time's up - push all pending garbage
      setState(prev => {
        if (prev.pendingGarbage <= 0) return prev;
        const newBoard = addGarbageLines(prev.board, prev.pendingGarbage);
        return { ...prev, board: newBoard, pendingGarbage: 0, garbageTimer: null };
      });
      return;
    }

    const timer = setTimeout(() => {
      setState(prev => {
        if (prev.pendingGarbage <= 0) return prev;
        const newBoard = addGarbageLines(prev.board, prev.pendingGarbage);
        return { ...prev, board: newBoard, pendingGarbage: 0, garbageTimer: null };
      });
    }, remaining);

    return () => clearTimeout(timer);
  }, [state.pendingGarbage, state.garbageTimer, state.isGameOver]);

  const spawnPiece = useCallback(() => {
    setState(prev => {
      let newBag = [...prev.bag];
      while (newBag.length <= NEXT_PREVIEW_COUNT) {
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
        nextPieces: newBag.slice(0, NEXT_PREVIEW_COUNT),
        bag: newBag,
        canHold: true,
      };
    });
  }, []);

  const reset = useCallback((newLevel?: number) => {
    let initialBag = generateBag();
    while (initialBag.length <= NEXT_PREVIEW_COUNT) {
      initialBag = [...initialBag, ...generateBag()];
    }
    const firstType = initialBag.shift()!;
    setState({
      board: createEmptyBoard(),
      activePiece: getPiece(firstType),
      nextPieces: initialBag.slice(0, NEXT_PREVIEW_COUNT),
      holdPiece: null,
      canHold: true,
      score: 0,
      lines: 0,
      level: newLevel || 1,
      isGameOver: false,
      combo: -1,
      bag: initialBag,
      pendingGarbage: 0,
      garbageTimer: null,
      lastMoveTSpin: false,
      lastSpinType: null,
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
        return { ...prev, activePiece: { ...prev.activePiece, pos: newPos }, lastMoveTSpin: false, lastSpinType: null };
      }
      if (dy > 0) {
        return landPiece(prev);
      }
      return prev;
    });
  }, []);

  const rotate = useCallback((dir: number = 1) => {
    setState(prev => {
      if (!prev.activePiece || prev.isGameOver) return prev;

      const newShape = rotateMatrix(prev.activePiece.shape, dir);
      const startRotation = prev.activePiece.rotation;
      const endRotation = (startRotation + dir + 4) % 4;

      const kickTable = prev.activePiece.type === 'I' ? WALL_KICKS_I : WALL_KICKS;
      const kicks = kickTable[`${startRotation}-${endRotation}`] || [[0, 0]];

      for (const [dx, dy] of kicks) {
        const newPos = { x: prev.activePiece.pos.x + dx, y: prev.activePiece.pos.y + dy };
        if (!checkCollision(prev.board, prev.activePiece, newPos, newShape)) {
          const rotatedPiece = { ...prev.activePiece, pos: newPos, shape: newShape, rotation: endRotation };
          const spinType = checkSpin(prev.board, rotatedPiece);
          const isTSpin = spinType === 'T';
          return {
            ...prev,
            activePiece: rotatedPiece,
            lastMoveTSpin: isTSpin,
            lastSpinType: spinType,
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
      let newNextPieces = [...prev.nextPieces];
      let newBag = [...prev.bag];

      if (prev.holdPiece) {
        newActive = getPiece(prev.holdPiece);
      } else {
        newActive = getPiece(newNextPieces.shift()!);
        // Refill nextPieces from bag
        while (newNextPieces.length < NEXT_PREVIEW_COUNT) {
          if (newBag.length === 0) newBag = generateBag();
          newNextPieces.push(newBag.shift()!);
        }
      }

      return {
        ...prev,
        activePiece: newActive,
        holdPiece: newHold,
        nextPieces: newNextPieces,
        bag: newBag,
        canHold: false,
      };
    });
  }, []);

  const landPiece = (prevState: GameState): GameState => {
    const { board, activePiece, pendingGarbage, combo, lastSpinType } = prevState;
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

    // Battle logic: Garbage cancellation
    // If player clears lines, cancel pending garbage first
    let finalBoard = boardAfterClear;
    let newPendingGarbage = pendingGarbage;
    let newGarbageTimer = prevState.garbageTimer;
    let newCombo = linesCleared > 0 ? combo + 1 : -1;

    if (linesCleared > 0 && newPendingGarbage > 0) {
      // Cancel garbage with cleared lines
      const cancelledLines = Math.min(linesCleared, newPendingGarbage);
      newPendingGarbage = newPendingGarbage - cancelledLines;
      if (newPendingGarbage === 0) newGarbageTimer = null;
    } else if (linesCleared === 0 && newPendingGarbage > 0 && newGarbageTimer !== null) {
      // No clear - garbage timer keeps running (handled by useEffect flush)
    }

    if (linesCleared > 0) {
      onLinesCleared(linesCleared, newCombo, lastSpinType);
    }

    // Score
    const earned = calculateScore(linesCleared, prevState.level, lastSpinType, newCombo);

    // Level up every 10 lines
    const newLines = prevState.lines + linesCleared;
    const newLevel = Math.floor(newLines / 10) + 1;

    // Check game over
    if (finalBoard[0].some(cell => cell !== null)) {
      return { ...prevState, board: finalBoard, isGameOver: true };
    }

    // Spawn next piece from the queue
    let newNextPieces = [...prevState.nextPieces];
    let newBag = [...prevState.bag];
    const nextType = newNextPieces.shift()!;

    while (newNextPieces.length < NEXT_PREVIEW_COUNT) {
      if (newBag.length === 0) newBag = [...generateBag()];
      newNextPieces.push(newBag.shift()!);
    }

    const nextPieceObj = getPiece(nextType);

    return {
      ...prevState,
      board: finalBoard,
      activePiece: nextPieceObj,
      nextPieces: newNextPieces,
      bag: newBag,
      canHold: true,
      lines: newLines,
      score: prevState.score + earned,
      level: Math.max(prevState.level, newLevel),
      combo: newCombo,
      pendingGarbage: newPendingGarbage,
      garbageTimer: newGarbageTimer,
      lastMoveTSpin: false,
      lastSpinType: null,
    };
  };

  const receiveGarbage = useCallback((lines: number) => {
    setState(prev => ({
      ...prev,
      pendingGarbage: prev.pendingGarbage + lines,
      garbageTimer: prev.garbageTimer ?? Date.now(), // start timer if not already running
    }));
  }, []);

  return { state, move, rotate, hardDrop, hold, reset, receiveGarbage, spawnPiece, setLevel };
};
