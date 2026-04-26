'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DifficultyCategory } from '@/data/wordData';
import SelectionView from '../vocab-quiz/SelectionView';
import DailyFlashcard from './DailyFlashcard';

type FlashcardState = 'selection' | 'cards';

export default function FlashcardApp() {
  const [gameState, setGameState] = useState<FlashcardState>('selection');
  const [selectedCategory, setSelectedCategory] = useState<DifficultyCategory | null>(null);

  const handleSelectCategory = (category: DifficultyCategory) => {
    setSelectedCategory(category);
    setGameState('cards');
  };

  const handleBack = () => {
    setGameState('selection');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-[500px] w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {gameState === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SelectionView 
              onSelect={handleSelectCategory} 
              title="每日單字卡"
              description="選擇適合的等級建立您的每日小任務！"
              modeSwitchPath="/vocab-quiz"
              modeSwitchText="前往測驗挑戰"
            />
          </motion.div>
        )}

        {gameState === 'cards' && selectedCategory && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <DailyFlashcard 
              category={selectedCategory} 
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
