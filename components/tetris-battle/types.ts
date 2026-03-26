export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

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
  nextPiece: PieceType;
  holdPiece: PieceType | null;
  canHold: boolean;
  score: number;
  lines: number;
  level: number;
  isGameOver: boolean;
  combo: number;
  bag: PieceType[];
  pendingGarbage: number; // Number of garbage lines soon to be added
  lastMoveTSpin: boolean;
}

export interface BattleUpdate {
  linesSent: number;
}
