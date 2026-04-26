export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type SpinType = PieceType | null;

export interface Piece {
  type: PieceType;
  pos: { x: number; y: number };
  rotation: number; // 0, 1, 2, 3
  shape: number[][];
  color: string;
}

export type Board = (string | null)[][];

export interface GameState {
  board: Board;
  activePiece: Piece | null;
  nextPieces: PieceType[];   // now stores 3 next pieces
  holdPiece: PieceType | null;
  canHold: boolean;
  score: number;
  lines: number;
  level: number;
  isGameOver: boolean;
  combo: number;
  bag: PieceType[];
  pendingGarbage: number;      // lines currently in the "buffer" bar
  garbageTimer: number | null; // timestamp when garbage was first queued
  lastMoveTSpin: boolean;
  lastSpinType: SpinType;      // which piece did the last spin
}

export interface BattleUpdate {
  linesSent: number;
}

export interface LeaderboardEntry {
  level: number;
  score: number;
  date: string;
}
