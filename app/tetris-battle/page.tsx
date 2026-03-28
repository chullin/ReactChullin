'use client';

import React, { useEffect, useCallback, useState } from 'react';
import './tetris.css';
import TetrisCanvas from '@/components/tetris-battle/TetrisCanvas';
import { GameStats, PieceBox } from '@/components/tetris-battle/GameUI';
import { useTetris } from '@/components/tetris-battle/useTetris';
import { calculateAttack } from '@/components/tetris-battle/gameLogic';
import { findBestMove } from '@/components/tetris-battle/ai';

export default function TetrisBattlePage() {
  const [isStarted, setIsStarted] = useState(false);
  const [overallLevel, setOverallLevel] = useState(1);
  const [playerFlash, setPlayerFlash] = useState(false);
  const [botFlash, setBotFlash] = useState(false);

  // Player Hook
  const player = useTetris((lines, combo, isTSpin) => {
    setPlayerFlash(true);
    setTimeout(() => setPlayerFlash(false), 200);
    const attack = calculateAttack(lines, combo, player.state.level, isTSpin);
    if (attack > 0) bot.receiveGarbage(attack);
  });

  // Bot Hook
  const bot = useTetris((lines, combo, isTSpin) => {
    setBotFlash(true);
    setTimeout(() => setBotFlash(false), 200);
    const attack = calculateAttack(lines, combo, bot.state.level, isTSpin);
    if (attack > 0) player.receiveGarbage(attack);
  });

  // Level Up Logic
  useEffect(() => {
    if (bot.state.isGameOver && !player.state.isGameOver && isStarted) {
      // Player won! Incremental level for next round
      setOverallLevel(prev => prev + 1);
    }
  }, [bot.state.isGameOver]);

  // DAS (Delayed Auto Shift) state
  const dasTimers = React.useRef<{ [key: string]: { timeout: NodeJS.Timeout | null, interval: NodeJS.Timeout | null } }>({
    ArrowLeft: { timeout: null, interval: null },
    ArrowRight: { timeout: null, interval: null },
  });

  const stopDAS = (key: string) => {
    if (dasTimers.current[key]) {
      if (dasTimers.current[key].timeout) clearTimeout(dasTimers.current[key].timeout!);
      if (dasTimers.current[key].interval) clearInterval(dasTimers.current[key].interval!);
      dasTimers.current[key] = { timeout: null, interval: null };
    }
  };

  const startDAS = (key: string, moveFn: () => void) => {
    if (dasTimers.current[key] && (dasTimers.current[key].timeout || dasTimers.current[key].interval)) return;
    
    moveFn();
    dasTimers.current[key].timeout = setTimeout(() => {
      dasTimers.current[key].interval = setInterval(moveFn, 30);
    }, 150);
  };

  // Player Controls
  useEffect(() => {
    if (!isStarted || player.state.isGameOver || bot.state.isGameOver) {
      stopDAS('ArrowLeft');
      stopDAS('ArrowRight');
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Filter keys to prevent default behavior
      const trackedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'z', 'Z', 'x', 'X', 'Shift', 'c', 'C'];
      if (trackedKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft': 
          startDAS('ArrowLeft', () => player.move(-1, 0));
          break;
        case 'ArrowRight': 
          startDAS('ArrowRight', () => player.move(1, 0));
          break;
        case 'ArrowDown': 
          player.move(0, 1); 
          break;
        case 'ArrowUp': 
        case 'x':
        case 'X':
          player.rotate(1); // CW
          break;
        case 'z':
        case 'Z':
          player.rotate(-1); // CCW
          break;
        case ' ': 
          player.hardDrop(); 
          break;
        case 'Shift':
        case 'c': 
        case 'C': 
          player.hold(); 
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') stopDAS('ArrowLeft');
      if (e.key === 'ArrowRight') stopDAS('ArrowRight');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopDAS('ArrowLeft');
      stopDAS('ArrowRight');
    };
  }, [isStarted, player, bot.state.isGameOver]);

  // Game Loop (Gravity)
  useEffect(() => {
    if (!isStarted || player.state.isGameOver || bot.state.isGameOver) return;

    const gravitySpeed = Math.max(150, 1200 - (overallLevel - 1) * 80);
    const interval = setInterval(() => {
      player.move(0, 1);
    }, gravitySpeed);

    return () => clearInterval(interval);
  }, [isStarted, player.state.isGameOver, bot.state.isGameOver, overallLevel]);

  // Bot AI Logic
  useEffect(() => {
    if (!isStarted || bot.state.isGameOver || player.state.isGameOver) return;

    const botSpeed = Math.max(100, 1500 - (overallLevel - 1) * 100);
    const botInterval = setInterval(() => {
      if (bot.state.activePiece) {
        const bestMove = findBestMove(bot.state.board, bot.state.activePiece);
        
        // Simulate BOT actions
        // 1. Rotate to targets
        const rotationDiff = (bestMove.rotation - bot.state.activePiece.rotation + 4) % 4;
        for (let i = 0; i < rotationDiff; i++) bot.rotate(1);
        
        // 2. Move to target X
        const diffX = bestMove.x - bot.state.activePiece.pos.x;
        if (diffX !== 0) {
          const dir = diffX > 0 ? 1 : -1;
          for (let i = 0; i < Math.abs(diffX); i++) bot.move(dir, 0);
        }
        
        // 3. Drop
        bot.hardDrop();
      }
    }, botSpeed);

    return () => clearInterval(botInterval);
  }, [isStarted, bot.state.activePiece, bot.state.isGameOver, player.state.isGameOver, overallLevel]);

  const startGame = useCallback(() => {
    player.reset(overallLevel);
    bot.reset(overallLevel);
    setIsStarted(true);
  }, [overallLevel, player, bot]);

  // Start Key Listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!isStarted || player.state.isGameOver || bot.state.isGameOver) {
          e.preventDefault();
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isStarted, player.state.isGameOver, bot.state.isGameOver, startGame]);

  return (
    <div className="tw-bg-gray-900 tw-text-white tw-flex tw-flex-col tw-justify-center tw-px-2 tw-py-1 sm:tw-px-3 tw-font-sans tw-overflow-hidden" style={{ height: 'calc(100dvh - 120px)' }}>
      <div className="tw-max-w-6xl tw-mx-auto tw-w-full">
        {/* Compact Title Bar */}
        <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
          <h1 className="tw-text-2xl lg:tw-text-3xl tw-font-black tw-italic tw-tracking-tighter tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-red-500 tw-to-yellow-500">
            TETRIS BATTLE
          </h1>
          {isStarted && (
            <div className="tw-px-2 tw-py-0.5 tw-bg-yellow-500 tw-text-black tw-text-xs tw-font-black tw-rounded tw-uppercase">
              Round {overallLevel}
            </div>
          )}
          {isStarted && !player.state.isGameOver && !bot.state.isGameOver && (
            <div className="tw-text-xs tw-font-bold tw-animate-pulse tw-text-yellow-400 tw-ml-2">
              ● BATTLE IN PROGRESS
            </div>
          )}
        </div>

        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-3 lg:tw-gap-6 tw-justify-center tw-items-start">
          {/* Player Side */}
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 lg:tw-gap-2">
            <h2 className="tw-text-base tw-font-bold tw-text-blue-400">PLAYER (YOU)</h2>
            <div className="tw-flex tw-gap-2 lg:tw-gap-3">
              <div className="tw-flex tw-flex-col tw-gap-2 lg:tw-gap-3">
                <PieceBox label="Hold" pieceType={player.state.holdPiece} />
                <GameStats score={player.state.score} level={player.state.level} lines={player.state.lines} isTSpin={player.state.lastMoveTSpin} />
              </div>
              {/* Player Canvas with overlays */}
              <div className="tw-relative">
                <div className={`tw-relative tw-transition-all tw-duration-200 ${playerFlash ? 'tw-scale-[1.02] tw-brightness-125 tw-shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`}>
                  <TetrisCanvas board={player.state.board} activePiece={player.state.activePiece} isPlayer={true} />
                  {player.state.pendingGarbage > 0 && (
                    <div className="tw-absolute -tw-left-2 lg:-tw-left-3 tw-bottom-0 tw-w-1.5 tw-bg-red-500" style={{ height: `${Math.min(100, player.state.pendingGarbage * 5)}%` }} />
                  )}
                </div>

                {/* Game State Overlay on Player Board */}
                {!isStarted && (
                  <div className="tw-absolute tw-inset-0 tw-bg-gray-900/80 tw-backdrop-blur-sm tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded tw-gap-3">
                    <div className="tw-text-lg tw-font-black tw-text-white tw-text-center tw-leading-tight">TETRIS<br/>BATTLE</div>
                    <button
                      onClick={startGame}
                      className="tw-px-5 tw-py-2 tw-bg-red-600 hover:tw-bg-red-700 tw-rounded-full tw-font-bold tw-text-sm tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-red-900/50"
                    >
                      START GAME
                    </button>
                    <div className="tw-text-xs tw-text-gray-400">or press Enter</div>
                  </div>
                )}

                {isStarted && (player.state.isGameOver || bot.state.isGameOver) && (
                  <div className="tw-absolute tw-inset-0 tw-bg-gray-900/85 tw-backdrop-blur-sm tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded tw-gap-3">
                    <div className="tw-text-xl tw-font-black tw-text-yellow-400 tw-text-center tw-leading-tight">
                      {player.state.isGameOver ? 'GAME\nOVER' : 'YOU\nWIN!'}
                    </div>
                    <div className="tw-text-xs tw-text-gray-300 tw-text-center">
                      {player.state.isGameOver ? 'Bot wins this round' : `Ready for Round ${overallLevel}?`}
                    </div>
                    <button
                      onClick={startGame}
                      className="tw-px-5 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-rounded-full tw-font-bold tw-text-sm tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-blue-900/50"
                    >
                      {player.state.isGameOver ? 'RETRY' : 'NEXT ROUND'}
                    </button>
                    <div className="tw-text-xs tw-text-gray-400">or press Enter</div>
                  </div>
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-3">
                <PieceBox label="Next" pieceType={player.state.nextPiece} />
              </div>
            </div>
          </div>

          {/* VS Divider + Controls */}
          <div className="tw-hidden lg:tw-flex tw-flex-col tw-items-center tw-justify-start tw-pt-4 tw-gap-4 tw-flex-shrink-0" style={{ minWidth: '110px' }}>
            <div className="tw-text-4xl tw-font-black tw-text-gray-700 tw-opacity-50">VS</div>
            {/* Controls moved here */}
            <div className="tw-p-2 tw-bg-gray-800 tw-rounded-xl tw-border tw-border-gray-700 tw-w-full">
              <h3 className="tw-text-[10px] tw-font-bold tw-mb-1 tw-text-gray-300 tw-text-center tw-uppercase tw-tracking-wider">Controls</h3>
              <div className="tw-flex tw-flex-col tw-gap-1 tw-text-[10px] tw-text-gray-400">
                <div><span className="tw-text-white tw-font-bold">Enter:</span> Start</div>
                <div><span className="tw-text-white tw-font-bold">← →:</span> Move</div>
                <div><span className="tw-text-white tw-font-bold">Z:</span> Rotate Left</div>
                <div><span className="tw-text-white tw-font-bold">X / ↑:</span> Rotate Right</div>
                <div><span className="tw-text-white tw-font-bold">↓:</span> Soft Drop</div>
                <div><span className="tw-text-white tw-font-bold">Space:</span> Hard Drop</div>
                <div><span className="tw-text-white tw-font-bold">Shift:</span> Hold</div>
              </div>
            </div>
          </div>

          {/* Bot Side */}
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 lg:tw-gap-2">
            <h2 className="tw-text-base tw-font-bold tw-text-red-400">BOT (AI)</h2>
            <div className="tw-flex tw-gap-2 lg:tw-gap-3">
              <div className="tw-flex tw-flex-col tw-gap-2 lg:tw-gap-3">
                <PieceBox label="Hold" pieceType={bot.state.holdPiece} />
                <GameStats score={bot.state.score} level={bot.state.level} lines={bot.state.lines} isTSpin={bot.state.lastMoveTSpin} />
              </div>
              <div className={`tw-relative tw-transition-all tw-duration-200 ${botFlash ? 'tw-scale-[1.02] tw-brightness-125 tw-shadow-[0_0_20px_rgba(239,68,68,0.6)]' : ''}`}>
                <TetrisCanvas board={bot.state.board} activePiece={bot.state.activePiece} isPlayer={false} />
                {bot.state.pendingGarbage > 0 && (
                  <div className="tw-absolute -tw-left-2 lg:-tw-left-3 tw-bottom-0 tw-w-1.5 tw-bg-blue-500" style={{ height: `${Math.min(100, bot.state.pendingGarbage * 5)}%` }} />
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-3">
                <PieceBox label="Next" pieceType={bot.state.nextPiece} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
