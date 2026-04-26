'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import './tetris.css';
import TetrisBoard, { TetrisBoardHandle, CANVAS_W, CANVAS_H } from '@/components/tetris-battle/TetrisBoard';
import { NextPieceQueue, Leaderboard, getLeaderboard, saveToLeaderboard } from '@/components/tetris-battle/GameUI';
import { PieceType, LeaderboardEntry, SpinType } from '@/components/tetris-battle/types';
import { PIECES } from '@/components/tetris-battle/Constants';
import {
  playClear,
  playTSpin,
  playSpinBonus,
  playComboChime,
  playGameOver,
  playWin,
  playGarbageWarning,
} from '@/utils/tetrisAudio';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Divider, 
  Progress,
  Tooltip,
  User,
  Badge
} from '@heroui/react';
import { 
  Trophy, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  Sword, 
  Bot, 
  Settings2,
  Info,
  TrendingUp,
  Hash,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pending garbage countdown bar
const GARBAGE_COOLDOWN_MS = 3000;

interface DisplayState {
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
}

const emptyDisplay: DisplayState = {
  score: 0, level: 1, lines: 0, combo: -1,
  holdPiece: null, nextPieces: [], pendingGarbage: 0,
  garbageQueuedAt: 0, isGameOver: false, lastSpinType: null,
};

// ─── Piece Mini-Preview ──────────────────────────────────────────────────────
const MiniPiece: React.FC<{ type: PieceType | null; size?: number }> = ({ type, size = 12 }) => {
  if (!type) return <div className="w-12 h-10 flex items-center justify-center text-gray-300 text-[10px] font-bold">EMPTY</div>;
  const piece = PIECES[type];
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, ${size}px)`, gap: 1 }}
    >
      {piece.shape.map((row, y) => row.map((v, x) => (
        <div
          key={`${y}-${x}`}
          className="rounded-[1px]"
          style={{
            width: size, height: size,
            background: v ? piece.color : 'transparent',
            boxShadow: v ? `inset 0 0 4px rgba(255,255,255,0.3)` : undefined,
          }}
        />
      )))}
    </div>
  );
};

// ─── Stats Panel ─────────────────────────────────────────────────────────────
const StatsPanel: React.FC<{ d: DisplayState; isPlayer: boolean }> = ({ d, isPlayer }) => {
  const color = isPlayer ? "primary" : "secondary";
  const spinLabel = d.lastSpinType ? `${d.lastSpinType}-SPIN!` : null;

  return (
    <div className="flex flex-col gap-3 w-[100px]">
      {/* Hold */}
      <Card className="border-none shadow-sm bg-gray-50/50">
        <CardBody className="p-3 items-center">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Hold</p>
          <div className="flex items-center justify-center h-10">
            <MiniPiece type={d.holdPiece} />
          </div>
        </CardBody>
      </Card>

      {/* Score */}
      <Card className="border-none shadow-sm bg-gray-50/50">
        <CardBody className="p-3">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Score</p>
          <p className="text-gray-900 font-black text-sm tabular-nums">
            {d.score.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* Level & Lines */}
      <Card className="border-none shadow-sm bg-gray-50/50">
        <CardBody className="p-3 space-y-2">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Level</p>
            <p className={`text-xl font-black text-${color}`}>
              {d.level}
            </p>
          </div>
          <Divider className="opacity-50" />
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Lines</p>
            <p className="text-sm font-black text-gray-700">{d.lines}</p>
          </div>
        </CardBody>
      </Card>

      {/* Spin label & Combo */}
      <AnimatePresence>
        {spinLabel && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Chip 
              color={d.lastSpinType === 'T' ? "secondary" : "primary"}
              variant="shadow"
              size="sm"
              className="w-full font-black text-[10px]"
            >
              {spinLabel}
            </Chip>
          </motion.div>
        )}
        {d.combo >= 2 && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mt-1"
          >
            <Chip 
              color="warning" 
              variant="flat" 
              className="w-full font-black text-[10px]"
              size="sm"
            >
              {d.combo}× COMBO
            </Chip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Garbage Bar ──────────────────────────────────────────────────────────────
const GarbageBar: React.FC<{ pending: number; queuedAt: number; isPlayer: boolean }> = ({
  pending, queuedAt, isPlayer
}) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (pending <= 0) return;
    const id = setInterval(() => setNow(Date.now()), 50);
    return () => clearInterval(id);
  }, [pending]);

  if (pending <= 0) return <div className="w-2" style={{ height: CANVAS_H }} />;

  const elapsed = queuedAt ? now - queuedAt : 0;
  const remaining = Math.max(0, GARBAGE_COOLDOWN_MS - elapsed);
  const timerValue = (remaining / GARBAGE_COOLDOWN_MS) * 100;
  const heightPct = Math.min(100, pending * 5);
  const barColor = isPlayer ? "danger" : "primary";

  return (
    <div 
      className="relative rounded-full overflow-hidden bg-gray-100 flex flex-col justify-end"
      style={{ width: 10, height: CANVAS_H }}
    >
      <motion.div
        className={`w-full rounded-full bg-${barColor} relative`}
        animate={{ height: `${heightPct}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div 
           className="absolute inset-0 bg-white/30"
           style={{ height: `${timerValue}%`, transition: 'height 0.05s linear' }}
        />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-red-500">
          {pending}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TetrisBattlePage() {
  const [isStarted, setIsStarted] = useState(false);
  const [overallLevel, setOverallLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerDisplay, setPlayerDisplay] = useState<DisplayState>({ ...emptyDisplay });
  const [botDisplay, setBotDisplay] = useState<DisplayState>({ ...emptyDisplay });
  const [playerGameOver, setPlayerGameOver] = useState(false);
  const [botGameOver, setBotGameOver] = useState(false);
  const [playerWon, setPlayerWon] = useState<boolean | null>(null);

  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;
  const overallLevelRef = useRef(overallLevel);
  overallLevelRef.current = overallLevel;

  const playerRef = useRef<TetrisBoardHandle>(null);
  const botRef = useRef<TetrisBoardHandle>(null);

  useEffect(() => { setLeaderboard(getLeaderboard()); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (playerRef.current) setPlayerDisplay(playerRef.current.getDisplayState() as DisplayState);
      if (botRef.current) setBotDisplay(botRef.current.getDisplayState() as DisplayState);
    }, 100);
    return () => clearInterval(id);
  }, []);

  const handlePlayerAttack = useCallback((lines: number, combo: number, spin: SpinType) => {
    const attack = Math.max(0, lines === 1 ? 0 : lines === 2 ? 1 : lines === 3 ? 2 : 4);
    const spinBonus = spin === 'T' ? lines * 2 : spin ? lines : 0;
    const comboBonus = combo >= 7 ? 3 : combo >= 5 ? 2 : combo >= 3 ? 1 : Math.floor(Math.max(0, combo) / 2);
    const total = (spin ? spinBonus : attack) + comboBonus;

    if (total > 0) {
      botRef.current?.receiveGarbage(total);
      playGarbageWarning(isMutedRef.current);
    }
    if (spin === 'T') playTSpin(isMutedRef.current);
    else if (spin) playSpinBonus(isMutedRef.current);
    playClear(lines, combo, isMutedRef.current);
    playComboChime(combo, isMutedRef.current);
  }, []);

  const handleBotAttack = useCallback((lines: number, combo: number, spin: SpinType) => {
    const attack = Math.max(0, lines === 1 ? 0 : lines === 2 ? 1 : lines === 3 ? 2 : 4);
    const spinBonus = spin === 'T' ? lines * 2 : spin ? lines : 0;
    const comboBonus = combo >= 7 ? 3 : combo >= 5 ? 2 : combo >= 3 ? 1 : Math.floor(Math.max(0, combo) / 2);
    const total = (spin ? spinBonus : attack) + comboBonus;
    if (total > 0) playerRef.current?.receiveGarbage(total);
  }, []);

  const handlePlayerGameOver = useCallback((score: number, level: number) => {
    setPlayerGameOver(true);
    setPlayerWon(false);
    setOverallLevel(1);
    playGameOver(isMutedRef.current);
    const entry: LeaderboardEntry = {
      level, score,
      date: new Date().toLocaleDateString('zh-TW'),
    };
    setLeaderboard(saveToLeaderboard(entry));
  }, []);

  const handleBotGameOver = useCallback((score: number, level: number) => {
    setBotGameOver(true);
    setPlayerWon(true);
    setOverallLevel(prev => prev + 1);
    playWin(isMutedRef.current);
    const ps = playerRef.current?.getDisplayState();
    if (ps) {
      const entry: LeaderboardEntry = {
        level: ps.level, score: ps.score,
        date: new Date().toLocaleDateString('zh-TW'),
      };
      setLeaderboard(saveToLeaderboard(entry));
    }
  }, []);

  const startGame = useCallback(() => {
    const lvl = overallLevelRef.current;
    playerRef.current?.reset(lvl);
    botRef.current?.reset(lvl);
    setPlayerGameOver(false);
    setBotGameOver(false);
    setPlayerWon(null);
    setIsStarted(true);
    setPlayerDisplay({ ...emptyDisplay, level: lvl });
    setBotDisplay({ ...emptyDisplay, level: lvl });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (!isStarted || playerGameOver || botGameOver)) {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isStarted, playerGameOver, botGameOver, startGame]);

  useEffect(() => {
    if (!isStarted || playerGameOver || botGameOver) return;
    const down = (e: KeyboardEvent) => {
      const k = e.key;
      if (['ArrowLeft','ArrowRight','ArrowDown','ArrowUp',' ','z','Z','x','X','Shift','c','C'].includes(k)) e.preventDefault();
      if (e.repeat) return;
      switch (k) {
        case 'ArrowLeft':  playerRef.current?.inputCommand('left'); break;
        case 'ArrowRight': playerRef.current?.inputCommand('right'); break;
        case 'ArrowDown':  playerRef.current?.inputCommand('down'); break;
        case 'ArrowUp': case 'x': case 'X': playerRef.current?.inputCommand('rotate_cw'); break;
        case 'z': case 'Z': playerRef.current?.inputCommand('rotate_ccw'); break;
        case ' ': playerRef.current?.inputCommand('hard_drop'); break;
        case 'Shift': case 'c': case 'C': playerRef.current?.inputCommand('hold'); break;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  playerRef.current?.inputCommand('left_release');
      if (e.key === 'ArrowRight') playerRef.current?.inputCommand('right_release');
      if (e.key === 'ArrowDown')  playerRef.current?.inputCommand('down_release');
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [isStarted, playerGameOver, botGameOver]);

  const isOver = playerGameOver || botGameOver;

  return (
    <div className="bg-gray-50/30 min-h-screen py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[32px] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Sword className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-none">TETRIS BATTLE</h1>
              <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Compete against the AI</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isStarted && !isOver && (
              <Chip 
                color="primary" 
                variant="shadow" 
                className="font-black px-4"
                startContent={<Badge color="success" content="" shape="circle" size="sm" className="relative -top-0.5" />}
              >
                ROUND {overallLevel}
              </Chip>
            )}
            <Button
              isIconOnly
              variant="flat"
              color="default"
              radius="full"
              onPress={() => setIsMuted(v => !v)}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
            <Button
              isIconOnly
              variant="flat"
              color="default"
              radius="full"
            >
              <Settings2 size={20} />
            </Button>
          </div>
        </div>

        {/* Main Game Desktop Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr] gap-8 items-start">
          
          {/* ────── PLAYER BOARD ────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
               <User
                name="You (Player)"
                description="Level 1 Elite"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  className: "ring-2 ring-primary ring-offset-2"
                }}
                classNames={{ name: "font-black" }}
              />
              <Chip color="primary" variant="flat" size="sm" className="font-bold">YOUR SIDE</Chip>
            </div>

            <Card className="border-none shadow-2xl p-6 bg-white">
              <div className="flex items-start gap-4 justify-center">
                <StatsPanel d={playerDisplay} isPlayer={true} />
                
                <div className="flex items-stretch gap-2 relative group">
                  <div className="relative rounded-xl overflow-hidden border-4 border-gray-100 shadow-inner">
                    <TetrisBoard
                      ref={playerRef}
                      isPlayer={true}
                      isBot={false}
                      isStarted={isStarted && !isOver}
                      level={overallLevel}
                      onAttack={handlePlayerAttack}
                      onGameOver={handlePlayerGameOver}
                    />
                    
                    {/* Game State Overlays */}
                    {!isStarted && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-white/90 backdrop-blur-md">
                        <div className="p-6 bg-primary/10 rounded-full text-primary">
                          <Play size={48} fill="currentColor" />
                        </div>
                        <div className="text-center">
                          <h2 className="text-3xl font-black text-gray-900">Ready?</h2>
                          <p className="text-gray-400 font-medium">Press Start or Enter to begin</p>
                        </div>
                        <Button color="primary" size="lg" className="font-black px-12 py-7 text-xl" radius="full" onPress={startGame}>
                          START GAME
                        </Button>
                      </div>
                    )}

                    {isOver && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-lg"
                      >
                         <div className={`p-6 rounded-full ${playerWon ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                            {playerWon ? <Trophy size={48} /> : <RotateCcw size={48} />}
                         </div>
                         <h2 className="text-4xl font-black text-gray-900 leading-tight">
                           {playerWon ? 'VICTORY!' : 'GAME OVER'}
                         </h2>
                         <p className="text-gray-500 font-medium text-center">
                            {playerWon ? `You defeated the level ${overallLevel-1} bot!` : 'Don\'t give up, try again!'}
                         </p>
                         <Button 
                            color={playerWon ? "success" : "primary"} 
                            variant="shadow"
                            size="lg" 
                            className="font-black px-12 py-7 text-xl mt-4" 
                            radius="full" 
                            onPress={startGame}
                          >
                            {playerWon ? 'NEXT ROUND' : 'TRY AGAIN'}
                          </Button>
                      </motion.div>
                    )}
                  </div>
                  <GarbageBar
                    pending={playerDisplay.pendingGarbage}
                    queuedAt={playerDisplay.garbageQueuedAt}
                    isPlayer={true}
                  />
                  <div className="hidden sm:block">
                    <NextPieceQueue nextPieces={playerDisplay.nextPieces} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ────── CENTER COLUMN ────── */}
          <div className="hidden lg:flex flex-col gap-6 pt-10">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black text-gray-100 italic tracking-tighter">VS</span>
            </div>

            <Card className="border-none bg-blue-50/50 shadow-none">
              <CardBody className="p-4 space-y-4">
                <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest text-center">Controls</p>
                <div className="space-y-2">
                  {[
                    { keys: ['←', '→'], label: 'Move' },
                    { keys: ['↑', 'X'], label: 'Rotate ↻' },
                    { keys: ['Z'], label: 'Rotate ↺' },
                    { keys: ['↓'], label: 'Soft Drop' },
                    { keys: ['Space'], label: 'Hard Drop' },
                    { keys: ['Shift'], label: 'Hold Piece' },
                  ].map(ctrl => (
                    <div key={ctrl.label} className="flex justify-between items-center bg-white/50 p-2 rounded-xl">
                       <div className="flex gap-1">
                         {ctrl.keys.map(k => <Chip key={k} size="sm" radius="sm" className="font-black text-[10px] bg-white border border-gray-100">{k}</Chip>)}
                       </div>
                       <span className="text-[10px] font-bold text-gray-500 uppercase">{ctrl.label}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Leaderboard entries={leaderboard} />
          </div>

          {/* ────── BOT BOARD ────── */}
          <div className="space-y-4 opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all">
            <div className="flex items-center justify-between px-2">
               <User
                name={`AI Bot (Round ${overallLevel})`}
                description="Predictive Logic v2.1"
                avatarProps={{
                  icon: <Bot />,
                  className: "bg-indigo-100 text-indigo-500 ring-2 ring-indigo-500 ring-offset-2"
                }}
                classNames={{ name: "font-black" }}
              />
              <Chip color="secondary" variant="flat" size="sm" className="font-bold">SYSTEM</Chip>
            </div>

            <Card className="border-none shadow-2xl p-6 bg-white overflow-hidden">
             
              <div className="flex items-start gap-4 justify-center">
                <StatsPanel d={botDisplay} isPlayer={false} />
                
                <div className="flex items-stretch gap-2 relative">
                  <div className="relative rounded-xl overflow-hidden border-4 border-gray-100 shadow-inner opacity-80 group-hover:opacity-100 transition-opacity">
                    <TetrisBoard
                      ref={botRef}
                      isPlayer={false}
                      isBot={true}
                      isStarted={isStarted && !isOver}
                      level={overallLevel}
                      onAttack={handleBotAttack}
                      onGameOver={handleBotGameOver}
                    />
                  </div>
                  <GarbageBar
                    pending={botDisplay.pendingGarbage}
                    queuedAt={botDisplay.garbageQueuedAt}
                    isPlayer={false}
                  />
                  <div className="hidden sm:block">
                    <NextPieceQueue nextPieces={botDisplay.nextPieces} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </div>

        {/* Footer Info */}
        <div className="flex justify-center gap-8 py-8 text-gray-400">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">SRS System</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash size={16} />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">15 Damage Scaling</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">Garbage Cancellation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
