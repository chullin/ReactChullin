export const STARRED_WORDS_KEY = 'vocab_starred_words';
export const DAILY_SETTINGS_KEY = 'vocab_daily_settings';
export const DAILY_PROGRESS_KEY = 'vocab_daily_progress';

// ----------------------------------------------------
// 1. Starred Words (Wrong Answers or Manual Favorites)
// ----------------------------------------------------

export function getStarredWords(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STARRED_WORDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addStarredWord(word: string) {
  if (typeof window === 'undefined') return;
  const current = getStarredWords();
  if (!current.includes(word)) {
    localStorage.setItem(STARRED_WORDS_KEY, JSON.stringify([...current, word]));
  }
}

export function removeStarredWord(word: string) {
  if (typeof window === 'undefined') return;
  const current = getStarredWords();
  localStorage.setItem(STARRED_WORDS_KEY, JSON.stringify(current.filter(w => w !== word)));
}

export function toggleStarredWord(word: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getStarredWords();
  const exists = current.includes(word);
  if (exists) {
    removeStarredWord(word);
    return false;
  } else {
    addStarredWord(word);
    return true;
  }
}

// ----------------------------------------------------
// 2. Daily Settings (How many cards per day)
// ----------------------------------------------------

export interface DailySettings {
  wordsPerDay: number;
}

const DEFAULT_SETTINGS: DailySettings = {
  wordsPerDay: 10
};

export function getDailySettings(): DailySettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(DAILY_SETTINGS_KEY);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function updateDailySettings(settings: Partial<DailySettings>) {
  if (typeof window === 'undefined') return;
  const current = getDailySettings();
  localStorage.setItem(DAILY_SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}

// ----------------------------------------------------
// 3. Daily Progress (Which index are we on today)
// ----------------------------------------------------

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  categoryId: string; // which dictionary
  currentIndex: number; // what index in the dict are we at
  completedToday: number; // how many viewed today
}

function getTodayString() {
  const d = new Date();
  // Ensure local timezone YYYY-MM-DD
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDailyProgress(categoryId: string): DailyProgress {
  const defaultProgress: DailyProgress = {
    date: getTodayString(),
    categoryId,
    currentIndex: 0,
    completedToday: 0
  };

  if (typeof window === 'undefined') return defaultProgress;

  try {
    const itemKey = `${DAILY_PROGRESS_KEY}_${categoryId}`;
    const data = localStorage.getItem(itemKey);
    if (data) {
      const parsed = JSON.parse(data) as DailyProgress;
      // If a new day has started, reset completed counter but keep the overall index
      if (parsed.date !== getTodayString()) {
        const updated = {
          ...parsed,
          date: getTodayString(),
          completedToday: 0
        };
        localStorage.setItem(itemKey, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return defaultProgress;
}

export function updateDailyProgress(categoryId: string, deltaWords: number) {
  if (typeof window === 'undefined') return;
  const current = getDailyProgress(categoryId);
  const updated = {
    ...current,
    currentIndex: current.currentIndex + deltaWords,
    completedToday: current.completedToday + deltaWords
  };
  localStorage.setItem(`${DAILY_PROGRESS_KEY}_${categoryId}`, JSON.stringify(updated));
}

// Global master index reset (if user wants to restart)
export function resetDailyProgress(categoryId: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${DAILY_PROGRESS_KEY}_${categoryId}`);
}
