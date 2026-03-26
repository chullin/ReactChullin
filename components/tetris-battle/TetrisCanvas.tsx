'use client';

import React, { useEffect, useRef } from 'react';
import { Board, Piece } from './types';
import { BLOCK_SIZE, COLS, ROWS } from './Constants';
import { getShadowPos } from './gameLogic';

interface Props {
  board: Board;
  activePiece: Piece | null;
  isPlayer: boolean;
}

const TetrisCanvas: React.FC<Props> = ({ board, activePiece, isPlayer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK_SIZE, 0);
      ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
      ctx.stroke();
    }

    // Draw Board
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          drawBlock(ctx, x, y, color);
        }
      });
    });

    // Draw Active Piece
    if (activePiece) {
      // Draw Shadow
      const shadowPos = getShadowPos(board, activePiece);
      activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            drawBlock(ctx, shadowPos.x + x, shadowPos.y + y, activePiece.color, 0.3);
          }
        });
      });

      // Draw Piece
      activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            drawBlock(ctx, activePiece.pos.x + x, activePiece.pos.y + y, activePiece.color);
          }
        });
      });
    }
  }, [board, activePiece]);

  const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, alpha = 1) => {
    if (y < 0) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    // Highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    
    ctx.globalAlpha = 1;
  };

  return (
    <div className="tw-relative tw-border-4 tw-border-gray-700 tw-bg-black tw-shadow-2xl tw-rounded-lg tw-overflow-hidden">
      <canvas
        ref={canvasRef}
        width={COLS * BLOCK_SIZE}
        height={ROWS * BLOCK_SIZE}
        className="tw-block"
      />
    </div>
  );
};

export default TetrisCanvas;
