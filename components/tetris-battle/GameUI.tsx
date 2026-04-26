'use client';

import React, { useState } from 'react';
import { PieceType, LeaderboardEntry } from './types';
import { PIECES } from './Constants';

// ─── Piece Preview Box ───────────────────────────────────────────────────────

interface BoxProps {
  label: string;
  pieceType: PieceType | null;
  small?: boolean;
}

export const PieceBox: React.FC<BoxProps> = ({ label, pieceType, small = false }) => {
  const size = small ? 'w-14 h-14' : 'w-20 h-20';
  const cellSize = small ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className={`flex flex-col items-center bg-gray-800 ${small ? 'p-1.5' : 'p-3'} rounded-lg border-2 border-gray-600 min-w-[${small ? '64' : '100'}px]`}>
      <span className="text-gray-400 text-xs font-bold uppercase mb-1">{label}</span>
      <div className={`${size} flex items-center justify-center bg-black rounded`}>
        {pieceType && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${PIECES[pieceType].shape[0].length}, 1fr)`,
              gap: '1px',
            }}
          >
            {PIECES[pieceType].shape.map((row, y) =>
              row.map((val, x) => (
                <div
                  key={`${x}-${y}`}
                  className={cellSize}
                  style={{ backgroundColor: val ? PIECES[pieceType].color : 'transparent' }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Next Piece Queue (3 previews + locked 4th slot) ─────────────────────────

interface NextQueueProps {
  nextPieces: PieceType[];
}

export const NextPieceQueue: React.FC<NextQueueProps> = ({ nextPieces }) => {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {nextPieces.slice(0, 3).map((p, i) => (
        <PieceBox key={i} label={i === 0 ? 'Next' : `+${i + 1}`} pieceType={p} small={i > 0} />
      ))}
      {/* Locked 4th slot */}
      <div className="relative">
        <button
          onClick={() => setShowEgg(v => !v)}
          className="flex flex-col items-center bg-gray-900 p-1.5 rounded-lg border-2 border-gray-700 w-full cursor-pointer hover:border-yellow-600 transition-colors min-w-[64px]"
        >
          <span className="text-gray-600 text-xs font-bold uppercase mb-1">+4</span>
          <div className="w-14 h-14 flex items-center justify-center bg-black rounded">
            <span className="text-2xl">🔒</span>
          </div>
        </button>
        {showEgg && (
          <div className="absolute right-full top-0 mr-2 z-50 bg-yellow-400 text-black rounded-lg p-3 shadow-2xl w-36 text-sm font-black leading-tight">
            ☕ 請贊助我！<br />
            <span className="text-xs font-normal text-gray-700">這個功能需要贊助才能解鎖 😄</span>
            <button onClick={(e) => { e.stopPropagation(); setShowEgg(false); }} className="mt-2 w-full bg-black text-white text-xs rounded py-1 hover:bg-gray-800">
              好啦好啦 XD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Game Stats ───────────────────────────────────────────────────────────────

interface StatsProps {
  score: number;
  level: number;
  lines: number;
  lastSpinType: string | null;
  combo: number;
}

export const GameStats: React.FC<StatsProps> = ({ score, level, lines, lastSpinType, combo }) => {
  const getSpinLabel = () => {
    if (!lastSpinType) return null;
    if (lastSpinType === 'T') return { text: 'T-SPIN!', color: 'bg-purple-600' };
    if (lastSpinType === 'S') return { text: 'S-SPIN!', color: 'bg-green-600' };
    if (lastSpinType === 'Z') return { text: 'Z-SPIN!', color: 'bg-red-600' };
    if (lastSpinType === 'L') return { text: 'L-SPIN!', color: 'bg-orange-500' };
    if (lastSpinType === 'J') return { text: 'J-SPIN!', color: 'bg-blue-600' };
    return null;
  };

  const spinLabel = getSpinLabel();

  return (
    <div className="flex flex-col gap-2 w-full">
      {spinLabel && (
        <div className={`${spinLabel.color} text-white text-xs font-black py-1 px-2 rounded text-center animate-bounce uppercase tracking-widest`}>
          {spinLabel.text}
        </div>
      )}
      {combo >= 2 && (
        <div className="bg-yellow-500 text-black text-xs font-black py-1 px-2 rounded text-center uppercase">
          {combo}× COMBO 🔥
        </div>
      )}
      <div className="bg-gray-800 p-3 rounded-lg border-2 border-gray-600">
        <div className="text-gray-400 text-xs font-bold uppercase">Score</div>
        <div className="text-white text-xl font-mono">{score.toLocaleString()}</div>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg border-2 border-gray-600">
        <div className="text-gray-400 text-xs font-bold uppercase">Level</div>
        <div className="text-white text-xl font-mono">{level}</div>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg border-2 border-gray-600">
        <div className="text-gray-400 text-xs font-bold uppercase">Lines</div>
        <div className="text-white text-xl font-mono">{lines}</div>
      </div>
    </div>
  );
};

// ─── Leaderboard ──────────────────────────────────────────────────────────────

const LB_KEY = 'tetris_leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LB_KEY) || '[]');
  } catch { return []; }
};

export const saveToLeaderboard = (entry: LeaderboardEntry): LeaderboardEntry[] => {
  const current = getLeaderboard();
  const merged = [...current, entry];
  // Sort: higher level first, then higher score
  merged.sort((a, b) => b.level !== a.level ? b.level - a.level : b.score - a.score);
  const top5 = merged.slice(0, 5);
  localStorage.setItem(LB_KEY, JSON.stringify(top5));
  return top5;
};

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const RANK_COLORS = ['text-yellow-400', 'text-gray-300', 'text-orange-400', 'text-gray-400', 'text-gray-400'];
const RANK_EMOJI = ['🥇', '🥈', '🥉', '4th', '5th'];
const TIER_NAMES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'];
const getTier = (level: number) => TIER_NAMES[Math.min(level - 1, TIER_NAMES.length - 1)];
const TIER_COLORS: Record<string, string> = {
  Bronze: 'text-orange-400',
  Silver: 'text-gray-300',
  Gold: 'text-yellow-400',
  Platinum: 'text-cyan-300',
  Diamond: 'text-blue-400',
  Master: 'text-purple-400',
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 w-full">
      <h3 className="text-center text-[11px] font-black uppercase tracking-widest text-gray-300 mb-3">
        🏆 排行榜
      </h3>
      {entries.length === 0 ? (
        <div className="text-gray-600 text-xs text-center py-4">尚無紀錄</div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {entries.map((e, i) => {
            const tier = getTier(e.level);
            return (
              <div key={i} className="flex items-center gap-2 bg-gray-900 rounded-lg px-2 py-1.5">
                <span className={`text-sm w-6 text-center ${RANK_COLORS[i] || 'text-gray-400'}`}>{RANK_EMOJI[i]}</span>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className={`text-[10px] font-black uppercase ${TIER_COLORS[tier] || 'text-gray-400'}`}>
                    Lv.{e.level} {tier}
                  </span>
                  <span className="text-white text-xs font-mono truncate">{e.score.toLocaleString()}</span>
                </div>
                <span className="text-gray-600 text-[9px]">{e.date}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
