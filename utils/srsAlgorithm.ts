
export type SRSState = 'new' | 'learning' | 'review' | 'relearning';
export type SRSRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSData {
  word: string;
  stability: number;      // 記憶穩定度 (單位：天)
  difficulty: number;     // 難度係數 (1-10)
  lapses: number;         // 忘記次數
  last_reviewed: string | null; // 上次複習時間 ISO
  due_date: string;       // 下次應複習時間 ISO
  state: SRSState;
}

const DEFAULT_STABILITY = 0.1; // 預設 2.4 小時後出現
const DEFAULT_DIFFICULTY = 5.0;

/**
 * 計算當前的可回想率 (Retrievability)
 * R = e^(ln(0.9) * (t / S))
 */
export function calculateRetrievability(srs: SRSData): number {
  if (!srs.last_reviewed) return 0;
  
  const now = new Date().getTime();
  const last = new Date(srs.last_reviewed).getTime();
  const elapsedDays = (now - last) / (1000 * 60 * 60 * 24);
  
  return Math.exp(Math.log(0.9) * (elapsedDays / srs.stability));
}

/**
 * 計算下一個狀態
 */
export function computeNextSRS(srs: SRSData, rating: SRSRating): SRSData {
  const now = new Date();
  let { stability, difficulty, lapses, state } = srs;

  // 1. 根據 Rating 調整難度 (Difficulty)
  // 1: Again (+2), 2: Hard (+1), 3: Good (0), 4: Easy (-1)
  const diffAdjustment = [2, 1, 0, -1][rating - 1];
  difficulty = Math.max(1, Math.min(10, difficulty + diffAdjustment));

  // 2. 根據 Rating 與當前狀態更新穩定度 (Stability)
  if (rating === 1) { // Again
    stability = DEFAULT_STABILITY; // 重設穩定度
    lapses += 1;
    state = 'relearning';
  } else {
    // 簡單的倍數增長邏輯
    const factor = [0, 1.2, 2.5, 4.5][rating - 1];
    
    if (state === 'new' || state === 'relearning') {
      stability = factor * 0.5; // 新詞或重學詞起步較快
      state = 'learning';
    } else {
      stability = stability * factor * (1.1 - difficulty / 100); // 難度越高，穩定度增長越慢
      state = 'review';
    }
  }

  // 限制穩定度範圍
  stability = Math.max(0.01, Math.min(365, stability));

  // 3. 計算下次過期時間 (Due Date)
  const dueDate = new Date(now.getTime() + stability * 24 * 60 * 60 * 1000);

  return {
    ...srs,
    stability,
    difficulty,
    lapses,
    last_reviewed: now.toISOString(),
    due_date: dueDate.toISOString(),
    state
  };
}

/**
 * 獲取預設的 SRS 資料
 */
export function createDefaultSRS(word: string): SRSData {
  return {
    word,
    stability: DEFAULT_STABILITY,
    difficulty: DEFAULT_DIFFICULTY,
    lapses: 0,
    last_reviewed: null,
    due_date: new Date().toISOString(),
    state: 'new'
  };
}
