'use client';

import React from 'react';
import { PieceType } from './types';
import { PIECES, BLOCK_SIZE } from './Constants';

interface BoxProps {
  label: string;
  pieceType: PieceType | null;
}

export const PieceBox: React.FC<BoxProps> = ({ label, pieceType }) => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600 tw-min-w-[100px]">
      <span className="tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase tw-mb-2">{label}</span>
      <div className="tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-bg-black tw-rounded">
        {pieceType && (
          <div 
            className="tw-grid" 
            style={{ 
              gridTemplateColumns: `repeat(${PIECES[pieceType].shape[0].length}, 1fr)`,
              gap: '1px'
            }}
          >
            {PIECES[pieceType].shape.map((row, y) => 
              row.map((val, x) => (
                <div 
                  key={`${x}-${y}`} 
                  className="tw-w-4 tw-h-4" 
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

interface StatsProps {
  score: number;
  level: number;
  lines: number;
  isTSpin: boolean;
}

export const GameStats: React.FC<StatsProps> = ({ score, level, lines, isTSpin }) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full">
      {isTSpin && (
        <div className="tw-bg-purple-600 tw-text-white tw-text-xs tw-font-black tw-py-1 tw-px-2 tw-rounded tw-text-center tw-animate-bounce tw-uppercase tw-tracking-widest">
          T-SPIN!
        </div>
      )}
      <div className="tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600">
        <div className="tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase">Score</div>
        <div className="tw-text-white tw-text-xl tw-font-mono">{score.toLocaleString()}</div>
      </div>
      <div className="tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600">
        <div className="tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase">Level</div>
        <div className="tw-text-white tw-text-xl tw-font-mono">{level}</div>
      </div>
      <div className="tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600">
        <div className="tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase">Lines</div>
        <div className="tw-text-white tw-text-xl tw-font-mono">{lines}</div>
      </div>
    </div>
  );
};
