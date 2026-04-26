'use client';

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { PieceType, SpinType } from './types';
import { PIECES, COLS, ROWS, WALL_KICKS, WALL_KICKS_I } from './Constants';
import {
  generateBag,
  getPiece,
  checkCollision,
  clearLines,
  addGarbageLines,
  checkSpin,
  calculateAttack,
  calculateScore,
  rotateMatrix,
  getShadowPos,
} from './gameLogic';
import { findBestMove } from './ai';

// ─── Rendering Constants ────────────────────────────────────────────────────
const BS = 28; // block size in pixels
const CANVAS_W = COLS * BS;
const CANVAS_H = ROWS * BS;

// ─── TETR.IO-like Timing Constants ─────────────────────────────────────────
const DAS_MS = 133;          // Delayed Auto-Shift delay
const ARR_MS = 16;           // Auto-Repeat Rate (near instant)
const SOFT_DROP_G = 0.5;     // cells per frame (soft drop multiplier)
const LOCK_DELAY_MS = 500;   // ms before piece locks after touching ground
const MAX_LOCK_RESETS = 15;  // max lock delay resets per piece
const ARE_MS = 200;          // appearance delay after piece locks
const LINE_CLEAR_MS = 200;   // pause for line clear animation (within ARE)
const GARBAGE_COOLDOWN_MS = 3000; // ms before garbage is pushed

// ─── Gravity Table (ms per row) ────────────────────────────────────────────
function getGravityMsPerRow(level: number): number {
  // TETR.IO-approximate gravity curve
  const speeds = [1000, 793, 618, 473, 355, 262, 190, 135, 94, 64, 43, 28, 18, 11, 7];
  return speeds[Math.min(level - 1, speeds.length - 1)];
}

// ─── Engine State (all in refs — zero React renders in hot path) ────────────
interface ActivePiece {
  type: PieceType;
  pos: { x: number; y: number };
  rotation: number;
  shape: number[][];
  color: string;
}

interface EngineState {
  board: (string | null)[][];
  piece: ActivePiece | null;
  nextPieces: PieceType[];
  holdPiece: PieceType | null;
  canHold: boolean;
  score: number;
  level: number;
  lines: number;
  combo: number;
  isGameOver: boolean;
  pendingGarbage: number;
  garbageQueuedAt: number;
  lastSpinType: SpinType;
  bag: PieceType[];
  // Gravity
  gravityAccum: number;   // ms accumulated for gravity
  // Lock delay
  lockTimer: number;      // ms since piece touched ground (-1 = floating)
  lockResets: number;     // resets used this piece
  // ARE (appearance delay)
  areTimer: number;       // ms remaining before next spawn
  isInARE: boolean;
  // Line clear flash
  flashRows: Set<number>;
  flashTimer: number;
  // Input timing (DAS/ARR)
  dasKey: 'left' | 'right' | null;
  dasTimer: number;
  softDropHeld: boolean;
  // Bot
  botTarget: { x: number; rotation: number } | null;
  botActionAccum: number; // ms accumulated for bot action intervals
}

function makeBag(existing: PieceType[] = []): PieceType[] {
  let bag = [...existing];
  while (bag.length <= 5) {
    bag = [...bag, ...generateBag()];
  }
  return bag;
}

function createInitialState(level = 1): EngineState {
  let bag = makeBag();
  const firstType = bag.shift()!;
  const piece = getPiece(firstType) as ActivePiece;
  return {
    board: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
    piece,
    nextPieces: bag.slice(0, 3),
    holdPiece: null,
    canHold: true,
    score: 0,
    level,
    lines: 0,
    combo: -1,
    isGameOver: false,
    pendingGarbage: 0,
    garbageQueuedAt: 0,
    lastSpinType: null,
    bag: bag.slice(3),
    gravityAccum: 0,
    lockTimer: -1,
    lockResets: 0,
    areTimer: 0,
    isInARE: false,
    flashRows: new Set(),
    flashTimer: 0,
    dasKey: null,
    dasTimer: 0,
    softDropHeld: false,
    botTarget: null,
    botActionAccum: 0,
  };
}

// ─── Piece Helpers ──────────────────────────────────────────────────────────
function spawnFromState(s: EngineState): EngineState {
  let bag = [...s.bag];
  bag = makeBag(bag);
  const nextType = s.nextPieces[0];
  const newNextPieces = [...s.nextPieces.slice(1), bag.shift()!];
  const newPiece = getPiece(nextType) as ActivePiece;

  if (checkCollision(s.board, newPiece)) {
    return { ...s, isGameOver: true, piece: null };
  }
  return {
    ...s,
    piece: newPiece,
    nextPieces: newNextPieces,
    bag,
    canHold: true,
    lockTimer: -1,
    lockResets: 0,
    gravityAccum: 0,
    isInARE: false,
    areTimer: 0,
    botTarget: null,
    botActionAccum: 0,
  };
}

function isOnGround(s: EngineState): boolean {
  if (!s.piece) return false;
  return checkCollision(s.board, s.piece, { x: s.piece.pos.x, y: s.piece.pos.y + 1 });
}

function landPiece(
  s: EngineState,
  onAttack: (lines: number, combo: number, spin: SpinType) => void
): EngineState {
  const { piece, board, pendingGarbage, garbageQueuedAt } = s;
  if (!piece) return s;

  // Place piece on board
  const newBoard = board.map(r => [...r]);
  piece.shape.forEach((row, y) => {
    row.forEach((v, x) => {
      if (v) {
        const by = piece.pos.y + y;
        const bx = piece.pos.x + x;
        if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
          newBoard[by][bx] = piece.color;
        }
      }
    });
  });

  const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
  const newCombo = linesCleared > 0 ? s.combo + 1 : -1;
  const spinType = s.lastSpinType;

  // Garbage cancellation
  let newPendingGarbage = pendingGarbage;
  let newGarbageQueuedAt = garbageQueuedAt;
  let finalBoard = clearedBoard;

  if (linesCleared > 0 && newPendingGarbage > 0) {
    const cancel = Math.min(linesCleared, newPendingGarbage);
    newPendingGarbage -= cancel;
    if (newPendingGarbage === 0) newGarbageQueuedAt = 0;
  }

  if (linesCleared > 0) {
    onAttack(linesCleared, newCombo, spinType);
  }

  const earned = calculateScore(linesCleared, s.level, spinType, newCombo);
  const newLines = s.lines + linesCleared;
  const newLevel = Math.max(s.level, Math.floor(newLines / 10) + 1);

  // Flash rows for animation
  const flashRows = new Set<number>();
  const tempBoard = newBoard;
  for (let y = 0; y < ROWS; y++) {
    if (tempBoard[y].every(c => c !== null)) flashRows.add(y);
  }

  // Check game over after clearing
  if (finalBoard[0].some(c => c !== null)) {
    return { ...s, board: finalBoard, isGameOver: true, piece: null };
  }

  return {
    ...s,
    board: finalBoard,
    piece: null,
    lines: newLines,
    score: s.score + earned,
    level: newLevel,
    combo: newCombo,
    lastSpinType: null,
    pendingGarbage: newPendingGarbage,
    garbageQueuedAt: newGarbageQueuedAt,
    flashRows,
    flashTimer: linesCleared > 0 ? LINE_CLEAR_MS : 0,
    isInARE: true,
    areTimer: ARE_MS + (linesCleared > 0 ? LINE_CLEAR_MS : 0),
    gravityAccum: 0,
    lockTimer: -1,
    lockResets: 0,
  };
}

function tryRotate(s: EngineState, dir: 1 | -1): EngineState {
  if (!s.piece) return s;
  const newShape = rotateMatrix(s.piece.shape, dir);
  const startRot = s.piece.rotation;
  const endRot = (startRot + dir + 4) % 4;
  const kickTable = s.piece.type === 'I' ? WALL_KICKS_I : WALL_KICKS;
  const kicks = kickTable[`${startRot}-${endRot}`] || [[0, 0]];

  for (const [dx, dy] of kicks) {
    const newPos = { x: s.piece.pos.x + dx, y: s.piece.pos.y + dy };
    if (!checkCollision(s.board, s.piece, newPos, newShape)) {
      const rotatedPiece: ActivePiece = {
        ...s.piece,
        pos: newPos,
        shape: newShape,
        rotation: endRot,
      };
      const spinType = checkSpin(s.board, rotatedPiece);
      // Reset lock delay on successful rotate (if on ground)
      const wasOnGround = isOnGround(s);
      const canReset = wasOnGround && s.lockResets < MAX_LOCK_RESETS;
      return {
        ...s,
        piece: rotatedPiece,
        lastSpinType: spinType,
        lockTimer: canReset ? 0 : s.lockTimer,
        lockResets: canReset ? s.lockResets + 1 : s.lockResets,
      };
    }
  }
  return s;
}

function tryMove(s: EngineState, dx: number, dy: number): EngineState {
  if (!s.piece) return s;
  const newPos = { x: s.piece.pos.x + dx, y: s.piece.pos.y + dy };
  if (!checkCollision(s.board, s.piece, newPos)) {
    // Reset lock delay on successful horizontal move while on ground
    const wasOnGround = dy === 0 && isOnGround(s);
    const canReset = wasOnGround && s.lockResets < MAX_LOCK_RESETS;
    return {
      ...s,
      piece: { ...s.piece, pos: newPos },
      lastSpinType: null,
      lockTimer: canReset ? 0 : s.lockTimer,
      lockResets: canReset ? s.lockResets + 1 : s.lockResets,
    };
  }
  return s;
}

function tryHardDrop(
  s: EngineState,
  onAttack: (lines: number, combo: number, spin: SpinType) => void
): EngineState {
  if (!s.piece) return s;
  let newY = s.piece.pos.y;
  while (!checkCollision(s.board, s.piece, { x: s.piece.pos.x, y: newY + 1 })) {
    newY++;
  }
  const dropped = { ...s, piece: { ...s.piece, pos: { ...s.piece.pos, y: newY } } };
  return landPiece(dropped, onAttack);
}

function tryHold(s: EngineState): EngineState {
  if (!s.piece || !s.canHold) return s;
  const heldType = s.piece.type;
  let bag = [...s.bag];
  let newNextPieces = [...s.nextPieces];

  let newPiece: ActivePiece;
  if (s.holdPiece) {
    newPiece = getPiece(s.holdPiece) as ActivePiece;
  } else {
    newPiece = getPiece(newNextPieces.shift()!) as ActivePiece;
    bag = makeBag(bag);
    newNextPieces.push(bag.shift()!);
  }

  return {
    ...s,
    piece: newPiece,
    holdPiece: heldType,
    nextPieces: newNextPieces,
    bag,
    canHold: false,
    lockTimer: -1,
    lockResets: 0,
    gravityAccum: 0,
    lastSpinType: null,
  };
}

// ─── Canvas Renderer (pure canvas 2D) ──────────────────────────────────────
const BORDER_COLOR = '#1a1a2e';
const BG_COLOR = '#0d0d1a';
const GRID_COLOR = '#ffffff08';
const GHOST_ALPHA = 0.15;
const LOCK_HIGHLIGHT = '#ffffff30';

function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  alpha = 1,
  glow = false
) {
  const px = x * BS;
  const py = y * BS;
  ctx.globalAlpha = alpha;

  // Main block
  ctx.fillStyle = color;
  ctx.fillRect(px + 1, py + 1, BS - 2, BS - 2);

  // Top-left highlight
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(px + 1, py + 1, BS - 2, 3);
  ctx.fillRect(px + 1, py + 1, 3, BS - 2);

  // Bottom-right shadow
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(px + 1, py + BS - 4, BS - 2, 3);
  ctx.fillRect(px + BS - 4, py + 1, 3, BS - 2);

  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, BS - 2, BS - 2);
    ctx.shadowBlur = 0;
  }

  ctx.globalAlpha = 1;
}

function renderBoard(
  ctx: CanvasRenderingContext2D,
  s: EngineState,
  isPlayer: boolean
) {
  // Background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Grid lines
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * BS, 0);
    ctx.lineTo(x * BS, CANVAS_H);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * BS);
    ctx.lineTo(CANVAS_W, y * BS);
    ctx.stroke();
  }

  // Board cells
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = s.board[y][x];
      if (cell) {
        const isGarbage = cell === '#555555';
        // Flash effect on clearing rows
        if (s.flashRows.has(y) && s.flashTimer > 0) {
          const flashProgress = 1 - s.flashTimer / LINE_CLEAR_MS;
          const flashAlpha = 0.4 + flashProgress * 0.6;
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
          ctx.fillRect(x * BS + 1, y * BS + 1, BS - 2, BS - 2);
        } else {
          drawBlock(ctx, x, y, isGarbage ? '#666' : cell);
        }
      }
    }
  }

  // Ghost piece
  if (s.piece && !s.isInARE) {
    const shadowY = getShadowPos(s.board, s.piece as any).y;
    if (shadowY !== s.piece.pos.y) {
      s.piece.shape.forEach((row, dy) => {
        row.forEach((v, dx) => {
          if (v) {
            const bx = s.piece!.pos.x + dx;
            const by = shadowY + dy;
            if (by >= 0 && by < ROWS) {
              drawBlock(ctx, bx, by, s.piece!.color, GHOST_ALPHA);
            }
          }
        });
      });
    }
  }

  // Active piece
  if (s.piece && !s.isInARE) {
    const lockProgress = s.lockTimer >= 0
      ? Math.min(s.lockTimer / LOCK_DELAY_MS, 1)
      : 0;
    const glow = lockProgress > 0.5 && isPlayer;

    s.piece.shape.forEach((row, dy) => {
      row.forEach((v, dx) => {
        if (v) {
          const bx = s.piece!.pos.x + dx;
          const by = s.piece!.pos.y + dy;
          if (by >= 0 && by < ROWS) {
            // Lock delay: piece tints slightly when about to lock
            let color = s.piece!.color;
            if (lockProgress > 0.6) {
              ctx.globalAlpha = 0.85 + 0.15 * Math.sin(Date.now() / 80);
            }
            drawBlock(ctx, bx, by, color, 1, glow);
            ctx.globalAlpha = 1;
          }
        }
      });
    });
  }

  // Border
  ctx.strokeStyle = isPlayer ? '#3b82f6' : '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, CANVAS_W, CANVAS_H);
}

// ─── Main update function (called in RAF) ──────────────────────────────────
function updateEngine(
  s: EngineState,
  dt: number,
  isBot: boolean,
  onAttack: (lines: number, combo: number, spin: SpinType) => void,
  botSpeed: number
): EngineState {
  if (s.isGameOver) return s;

  let ns = { ...s };

  // Flash timer
  if (ns.flashTimer > 0) {
    ns.flashTimer = Math.max(0, ns.flashTimer - dt);
    if (ns.flashTimer === 0) ns.flashRows = new Set();
  }

  // ARE: waiting to spawn next piece
  if (ns.isInARE) {
    ns.areTimer = Math.max(0, ns.areTimer - dt);
    if (ns.areTimer <= 0) {
      // Push garbage if any is waiting
      if (ns.pendingGarbage > 0) {
        const now = Date.now();
        const delay = ns.garbageQueuedAt ? now - ns.garbageQueuedAt : GARBAGE_COOLDOWN_MS + 1;
        if (delay >= GARBAGE_COOLDOWN_MS) {
          ns.board = addGarbageLines(ns.board, ns.pendingGarbage);
          ns.pendingGarbage = 0;
          ns.garbageQueuedAt = 0;
        }
      }
      ns = spawnFromState(ns);
    }
    return ns;
  }

  if (!ns.piece) return ns;

  // ─── Bot AI logic ───────────────────────────────────────────────────────
  if (isBot) {
    ns.botActionAccum += dt;
    if (ns.botActionAccum >= botSpeed) {
      ns.botActionAccum = 0;

      // Calculate target if not set
      if (!ns.botTarget) {
        const best = findBestMove(ns.board, ns.piece as any);
        ns.botTarget = { x: best.x, rotation: best.rotation };
      }

      const target = ns.botTarget;
      const rotDiff = (target.rotation - ns.piece.rotation + 4) % 4;
      if (rotDiff !== 0) {
        ns = tryRotate(ns, 1);
      } else {
        const xDiff = target.x - ns.piece.pos.x;
        if (xDiff !== 0) {
          ns = tryMove(ns, xDiff > 0 ? 1 : -1, 0);
        } else {
          // Hard drop when aligned
          ns.botTarget = null;
          ns = tryHardDrop(ns, onAttack);
        }
      }
    }
    return ns;
  }

  // ─── Player DAS/ARR ────────────────────────────────────────────────────
  if (ns.dasKey) {
    ns.dasTimer += dt;
    if (ns.dasTimer >= DAS_MS) {
      // ARR repeat
      const repeatCount = Math.floor((ns.dasTimer - DAS_MS) / ARR_MS);
      for (let i = 0; i <= repeatCount; i++) {
        ns = tryMove(ns, ns.dasKey === 'left' ? -1 : 1, 0);
      }
      ns.dasTimer = DAS_MS + ((ns.dasTimer - DAS_MS) % ARR_MS);
    }
  }

  // ─── Gravity ────────────────────────────────────────────────────────────
  const gravityMs = getGravityMsPerRow(ns.level);
  const actualDt = ns.softDropHeld ? Math.min(dt, 50) : dt; // cap dt to prevent skipping too many rows
  const effectiveDt = ns.softDropHeld ? Math.min(dt * (gravityMs / 50), dt * 10) : dt;
  ns.gravityAccum += effectiveDt;

  while (ns.gravityAccum >= gravityMs) {
    ns.gravityAccum -= gravityMs;
    const moved = tryMove(ns, 0, 1);
    if (moved.piece?.pos.y !== ns.piece?.pos.y) {
      ns = moved;
    }
  }

  // ─── Lock Delay ─────────────────────────────────────────────────────────
  if (isOnGround(ns)) {
    if (ns.lockTimer < 0) {
      ns.lockTimer = 0;
    } else {
      ns.lockTimer += dt;
      if (ns.lockTimer >= LOCK_DELAY_MS || ns.lockResets >= MAX_LOCK_RESETS) {
        ns = landPiece(ns, onAttack);
      }
    }
  } else {
    ns.lockTimer = -1;
  }

  return ns;
}

// ─── Public API (forwardRef) ────────────────────────────────────────────────
export interface TetrisBoardHandle {
  reset(level: number): void;
  receiveGarbage(lines: number): void;
  inputCommand(cmd: string): void;
  getDisplayState(): {
    score: number;
    level: number;
    lines: number;
    combo: number;
    holdPiece: PieceType | null;
    nextPieces: PieceType[];
    pendingGarbage: number;
    garbageQueuedAt: number;
    isGameOver: boolean;
    lastSpinType: SpinType;
  };
}

interface TetrisBoardProps {
  isBot?: boolean;
  isPlayer?: boolean;
  isStarted?: boolean;
  level?: number;
  onAttack: (lines: number, combo: number, spin: SpinType) => void;
  onGameOver?: (score: number, level: number) => void;
  onUIUpdate?: () => void;
}

const TetrisBoard = forwardRef<TetrisBoardHandle, TetrisBoardProps>(
  ({ isBot = false, isPlayer = true, isStarted = false, level = 1, onAttack, onGameOver, onUIUpdate }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<EngineState>(createInitialState(level));
    const rafRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const wasGameOverRef = useRef(false);
    const uiUpdateAccumRef = useRef(0);
    const isStartedRef = useRef(isStarted);
    isStartedRef.current = isStarted;

    // Bot speed (ms per action step)
    const getBotSpeed = (lvl: number) => Math.max(30, 200 - (lvl - 1) * 12);

    const handleAttack = useCallback((lines: number, combo: number, spin: SpinType) => {
      const attack = calculateAttack(lines, combo, stateRef.current.level, spin);
      if (attack > 0) onAttack(lines, combo, spin);
    }, [onAttack]);

    // ─── Game Loop (RAF) ──────────────────────────────────────────────────
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false })!;

      const loop = (timestamp: number) => {
        const dt = Math.min(timestamp - lastTimeRef.current, 100); // cap dt at 100ms
        lastTimeRef.current = timestamp;

        if (isStartedRef.current && !stateRef.current.isGameOver) {
          const botSpeed = getBotSpeed(stateRef.current.level);
          stateRef.current = updateEngine(
            stateRef.current,
            dt,
            isBot,
            handleAttack,
            botSpeed
          );

          // Fire onGameOver callback only once
          if (stateRef.current.isGameOver && !wasGameOverRef.current) {
            wasGameOverRef.current = true;
            onGameOver?.(stateRef.current.score, stateRef.current.level);
          }

          // Rate-limit UI state updates to ~10fps to avoid re-renders
          uiUpdateAccumRef.current += dt;
          if (uiUpdateAccumRef.current >= 100) {
            uiUpdateAccumRef.current = 0;
            onUIUpdate?.();
          }
        }

        renderBoard(ctx, stateRef.current, isPlayer);
        rafRef.current = requestAnimationFrame(loop);
      };

      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafRef.current);
    }, [isBot, isPlayer, handleAttack, onGameOver, onUIUpdate]);

    // ─── Expose imperative API ─────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      reset(lvl: number) {
        stateRef.current = createInitialState(lvl);
        wasGameOverRef.current = false;
      },
      receiveGarbage(lines: number) {
        const s = stateRef.current;
        stateRef.current = {
          ...s,
          pendingGarbage: s.pendingGarbage + lines,
          garbageQueuedAt: s.garbageQueuedAt || Date.now(),
        };
      },
      inputCommand(cmd: string) {
        if (!isStartedRef.current || stateRef.current.isGameOver || stateRef.current.isInARE) return;
        const s = stateRef.current;
        switch (cmd) {
          case 'left':
            stateRef.current = { ...tryMove(s, -1, 0), dasKey: 'left', dasTimer: 0 };
            break;
          case 'right':
            stateRef.current = { ...tryMove(s, 1, 0), dasKey: 'right', dasTimer: 0 };
            break;
          case 'left_release':
            if (s.dasKey === 'left') stateRef.current = { ...s, dasKey: null, dasTimer: 0 };
            break;
          case 'right_release':
            if (s.dasKey === 'right') stateRef.current = { ...s, dasKey: null, dasTimer: 0 };
            break;
          case 'down':
            stateRef.current = { ...s, softDropHeld: true };
            break;
          case 'down_release':
            stateRef.current = { ...s, softDropHeld: false };
            break;
          case 'rotate_cw':
            stateRef.current = tryRotate(s, 1);
            break;
          case 'rotate_ccw':
            stateRef.current = tryRotate(s, -1);
            break;
          case 'hard_drop':
            stateRef.current = tryHardDrop(s, handleAttack);
            break;
          case 'hold':
            stateRef.current = tryHold(s);
            break;
        }
      },
      getDisplayState() {
        const s = stateRef.current;
        return {
          score: s.score,
          level: s.level,
          lines: s.lines,
          combo: s.combo,
          holdPiece: s.holdPiece,
          nextPieces: s.nextPieces,
          pendingGarbage: s.pendingGarbage,
          garbageQueuedAt: s.garbageQueuedAt,
          isGameOver: s.isGameOver,
          lastSpinType: s.lastSpinType,
        };
      },
    }), [handleAttack]);

    return (
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{ imageRendering: 'pixelated', display: 'block' }}
      />
    );
  }
);

TetrisBoard.displayName = 'TetrisBoard';
export default TetrisBoard;
export { CANVAS_W, CANVAS_H };
