
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Word, DifficultyCategory } from '@/data/wordData';
import { 
  SRSData, 
  SRSRating, 
  computeNextSRS, 
  calculateRetrievability, 
  createDefaultSRS 
} from '@/utils/srsAlgorithm';

const SRS_STORAGE_KEY = 'vocab_srs_master';

export function useWordQuiz(category: DifficultyCategory) {
  const [srsMap, setSrsMap] = useState<Record<string, SRSData>>({});
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [shortTermPool, setShortTermPool] = useState<string[]>([]); // 存放需要立即複習的單字 (Again)
  const [mounted, setMounted] = useState(false);

  // 1. 初始化資料
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SRS_STORAGE_KEY);
      if (saved) {
        try {
          setSrsMap(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse SRS data", e);
        }
      }
      setMounted(true);
    }
  }, []);

  // 2. 儲存資料
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(srsMap));
    }
  }, [srsMap, mounted]);

  /**
   * 獲取所有屬於當前 Category 的 SRS 資料
   */
  const currentCategorySrs = useMemo(() => {
    return category.words.map(w => srsMap[w.word] || createDefaultSRS(w.word));
  }, [category.words, srsMap]);

  /**
   * 獲取下一個建議的單字
   */
  const getNextWord = useCallback(() => {
    const now = new Date();
    
    // A. 優先檢查短暫記憶池 (Short-term Pool)
    if (shortTermPool.length > 0) {
      const wordStr = shortTermPool[0];
      const wordObj = category.words.find(w => w.word === wordStr);
      if (wordObj) {
        setCurrentWord(wordObj);
        return wordObj;
      }
    }

    // B. 計算排序權重
    const sortedWords = [...category.words].sort((a, b) => {
      const srsA = srsMap[a.word] || createDefaultSRS(a.word);
      const srsB = srsMap[b.word] || createDefaultSRS(b.word);

      const isDueA = new Date(srsA.due_date) <= now;
      const isDueB = new Date(srsB.due_date) <= now;

      // 1. 優先級 1: 已過期的單字 (Due)
      if (isDueA && !isDueB) return -1;
      if (!isDueA && isDueB) return 1;

      if (isDueA && isDueB) {
        // 如果都過期，比較可回想率 (Retrievability)，越低的越優先
        const rA = calculateRetrievability(srsA);
        const rB = calculateRetrievability(srsB);
        return rA - rB;
      }

      // 2. 優先級 2: 從未學習過的新單字 (New)
      const isNewA = srsA.state === 'new';
      const isNewB = srsB.state === 'new';
      if (isNewA && !isNewB) return -1;
      if (!isNewA && isNewB) return 1;

      // 3. 優先級 3: 尚未到期但快要到期的
      return new Date(srsA.due_date).getTime() - new Date(srsB.due_date).getTime();
    });

    const next = sortedWords[0] || null;
    setCurrentWord(next);
    return next;
  }, [category.words, srsMap, shortTermPool]);

  /**
   * 更新測驗結果
   */
  const updateResult = useCallback((rating: SRSRating) => {
    if (!currentWord) return;

    const wordKey = currentWord.word;
    const currentSrs = srsMap[wordKey] || createDefaultSRS(wordKey);
    const nextSrs = computeNextSRS(currentSrs, rating);

    // 更新 SRS Map
    setSrsMap(prev => ({
      ...prev,
      [wordKey]: nextSrs
    }));

    // 更新短暫記憶池
    if (rating === 1) { // Again
      // 如果答錯，加入池子（如果不在裡面）
      if (!shortTermPool.includes(wordKey)) {
        setShortTermPool(prev => [...prev, wordKey]);
      }
    } else if (rating >= 3) { // Good or Easy
      // 答對了，從池子移除
      setShortTermPool(prev => prev.filter(w => w !== wordKey));
    } else {
        // Hard: 保持原樣或移到末尾
        if (shortTermPool.includes(wordKey)) {
            setShortTermPool(prev => [...prev.filter(w => w !== wordKey), wordKey]);
        }
    }

    // 自動加載下一個
    // 這裡不直接呼叫 getNextWord，讓 UI 控制何時切換
  }, [currentWord, srsMap, shortTermPool]);

  return {
    currentWord,
    srsMap,
    getNextWord,
    updateResult,
    shortTermPool,
    isReady: mounted
  };
}
