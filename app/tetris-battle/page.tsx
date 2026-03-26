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

  // Player Hook
  const player = useTetris((lines, combo, isTSpin) => {
    const attack = calculateAttack(lines, combo, player.state.level, isTSpin);
    if (attack > 0) bot.receiveGarbage(attack);
  });

  // Bot Hook
  const bot = useTetris((lines, combo, isTSpin) => {
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

  // Player Controls
  useEffect(() => {
    if (!isStarted || player.state.isGameOver || bot.state.isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': 
          e.preventDefault();
          player.move(-1, 0); 
          break;
        case 'ArrowRight': 
          e.preventDefault();
          player.move(1, 0); 
          break;
        case 'ArrowDown': 
          e.preventDefault();
          player.move(0, 1); 
          break;
        case 'ArrowUp': 
          e.preventDefault();
          player.rotate(); 
          break;
        case ' ': 
          e.preventDefault(); 
          player.hardDrop(); 
          break;
        case 'c': 
        case 'C': 
          e.preventDefault();
          player.hold(); 
          break;
      }
      // Alternate check for C key
      if (e.code === 'KeyC') {
        player.hold();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        for (let i = 0; i < bestMove.rotation; i++) bot.rotate();
        
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

  const startGame = () => {
    player.reset(overallLevel);
    bot.reset(overallLevel);
    setIsStarted(true);
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-900 tw-text-white tw-p-8 tw-font-sans">
      <div className="tw-max-w-6xl tw-mx-auto">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
          <div className="tw-flex tw-items-center tw-gap-4">
            <h1 className="tw-text-4xl tw-font-black tw-italic tw-tracking-tighter tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-red-500 tw-to-yellow-500">
              TETRIS BATTLE
            </h1>
            {isStarted && (
              <div className="tw-px-3 tw-py-1 tw-bg-yellow-500 tw-text-black tw-text-sm tw-font-black tw-rounded tw-uppercase">
                Round {overallLevel}
              </div>
            )}
          </div>
          {!isStarted ? (
            <button 
              onClick={startGame}
              className="tw-px-8 tw-py-3 tw-bg-red-600 hover:tw-bg-red-700 tw-rounded-full tw-font-bold tw-text-lg tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-red-900/50"
            >
              START GAME
            </button>
          ) : player.state.isGameOver || bot.state.isGameOver ? (
            <div className="tw-flex tw-items-center tw-gap-6">
              <div className="tw-text-2xl tw-font-bold tw-text-yellow-400">
                {player.state.isGameOver ? 'GAME OVER - BOT WINS!' : `YOU WIN! (Ready for Round ${overallLevel}?)`}
              </div>
              <button 
                onClick={startGame}
                className="tw-px-6 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-rounded-full tw-font-bold tw-text-base tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-blue-900/50"
              >
                {player.state.isGameOver ? 'RETRY' : 'NEXT ROUND'}
              </button>
            </div>
          ) : (
            <div className="tw-text-2xl tw-font-bold tw-animate-pulse tw-text-yellow-400">
              BATTLE IN PROGRESS
            </div>
          )}
        </div>

        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-8 tw-justify-center tw-items-start">
          {/* Player Side */}
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
            <h2 className="tw-text-xl tw-font-bold tw-text-blue-400">PLAYER (YOU)</h2>
            <div className="tw-flex tw-gap-4">
              <div className="tw-flex tw-flex-col tw-gap-4">
                <PieceBox label="Hold" pieceType={player.state.holdPiece} />
                <GameStats score={player.state.score} level={player.state.level} lines={player.state.lines} isTSpin={player.state.lastMoveTSpin} />
              </div>
              <div className="tw-relative">
                <TetrisCanvas board={player.state.board} activePiece={player.state.activePiece} isPlayer={true} />
                {player.state.pendingGarbage > 0 && (
                  <div className="tw-absolute -tw-left-4 tw-bottom-0 tw-w-2 tw-bg-red-500" style={{ height: `${Math.min(100, player.state.pendingGarbage * 5)}%` }} />
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-4">
                <PieceBox label="Next" pieceType={player.state.nextPiece} />
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="tw-hidden lg:tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-20">
            <div className="tw-text-6xl tw-font-black tw-text-gray-700 tw-opacity-50">VS</div>
          </div>

          {/* Bot Side */}
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
            <h2 className="tw-text-xl tw-font-bold tw-text-red-400">BOT (AI)</h2>
            <div className="tw-flex tw-gap-4">
              <div className="tw-flex tw-flex-col tw-gap-4">
                <PieceBox label="Hold" pieceType={bot.state.holdPiece} />
                <GameStats score={bot.state.score} level={bot.state.level} lines={bot.state.lines} isTSpin={bot.state.lastMoveTSpin} />
              </div>
              <div className="tw-relative">
                <TetrisCanvas board={bot.state.board} activePiece={bot.state.activePiece} isPlayer={false} />
                {bot.state.pendingGarbage > 0 && (
                  <div className="tw-absolute -tw-left-4 tw-bottom-0 tw-w-2 tw-bg-red-500" style={{ height: `${Math.min(100, bot.state.pendingGarbage * 5)}%` }} />
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-4">
                <PieceBox label="Next" pieceType={bot.state.nextPiece} />
              </div>
            </div>
          </div>
        </div>

        <div className="tw-mt-12 tw-p-6 tw-bg-gray-800 tw-rounded-xl tw-border tw-border-gray-700 tw-max-w-2xl tw-mx-auto">
          <h3 className="tw-text-lg tw-font-bold tw-mb-4 tw-text-gray-300">Controls</h3>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-text-sm tw-text-gray-400">
            <div><span className="tw-text-white tw-font-bold">Arrow Keys:</span> Move & Rotate</div>
            <div><span className="tw-text-white tw-font-bold">Space:</span> Hard Drop</div>
            <div><span className="tw-text-white tw-font-bold">C Key:</span> Hold Piece</div>
            <div><span className="tw-text-white tw-font-bold">Goal:</span> Clear lines to send garbage to the BOT!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
