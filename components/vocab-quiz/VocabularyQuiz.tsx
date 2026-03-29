'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wordData, DifficultyCategory, Word } from '@/data/wordData';
import SelectionView from './SelectionView';
import QuizSetupView, { QuizMode } from './QuizSetupView';
import QuizGame from './QuizGame';
import ResultView from './ResultView';

export type GameState = 'selection' | 'setup' | 'playing' | 'results';

export default function VocabularyQuiz() {
  const [gameState, setGameState] = useState<GameState>('selection');
  const [selectedCategory, setSelectedCategory] = useState<DifficultyCategory | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>('eng-to-chi');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [score, setScore] = useState(0);

  const handleSelectCategory = (category: DifficultyCategory) => {
    setSelectedCategory(category);
    setGameState('setup');
    setScore(0);
  };

  const handleStartQuiz = (mode: QuizMode, count: number) => {
    setQuizMode(mode);
    setQuestionCount(count);
    setGameState('playing');
  };

  const handleFinishGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('selection');
    setSelectedCategory(null);
    setScore(0);
  };

  const handleReplay = () => {
    setGameState('playing');
    setScore(0);
  };

  return (
    <div className="tw-min-h-[600px] tw-w-full tw-max-w-4xl tw-mx-auto tw-p-4 md:tw-p-8">
      <AnimatePresence mode="wait">
        {gameState === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SelectionView onSelect={handleSelectCategory} />
          </motion.div>
        )}

        {gameState === 'setup' && selectedCategory && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizSetupView 
              category={selectedCategory}
              onStart={handleStartQuiz}
              onBack={handleRestart}
            />
          </motion.div>
        )}

        {gameState === 'playing' && selectedCategory && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <QuizGame 
              category={selectedCategory} 
              mode={quizMode}
              totalQuestions={questionCount}
              onFinish={handleFinishGame}
              onBack={handleRestart}
            />
          </motion.div>
        )}

        {gameState === 'results' && selectedCategory && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResultView 
              score={score} 
              category={selectedCategory}
              onRestart={handleRestart}
              onReplay={handleReplay}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
