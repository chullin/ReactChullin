'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DifficultyCategory } from '@/data/wordData';
import SelectionView from '../vocab-quiz/SelectionView';
import DailyFlashcard from './DailyFlashcard';
import QuizView from './QuizView';
import { Brain, BookOpen, Sparkles } from 'lucide-react';
import { Button, Card, CardBody } from '@heroui/react';

type FlashcardState = 'selection' | 'mode_select' | 'cards' | 'quiz';

export default function FlashcardApp() {
  const [gameState, setGameState] = useState<FlashcardState>('selection');
  const [selectedCategory, setSelectedCategory] = useState<DifficultyCategory | null>(null);

  const handleSelectCategory = (category: DifficultyCategory) => {
    setSelectedCategory(category);
    setGameState('mode_select');
  };

  const handleStartMode = (mode: 'cards' | 'quiz') => {
    setGameState(mode);
  };

  const handleBackToSelection = () => {
    setGameState('selection');
    setSelectedCategory(null);
  };

  const handleBackToModeSelect = () => {
    setGameState('mode_select');
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

        {gameState === 'mode_select' && selectedCategory && (
          <motion.div
            key="mode_select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center justify-center space-y-8 py-12 px-4"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">選擇學習模式</h2>
              <p className="text-gray-500 font-bold">您想要如何練習 {selectedCategory.title}？</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <Card 
                isPressable 
                onPress={() => handleStartMode('cards')}
                className="group border-none shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all hover:-translate-y-1 bg-white rounded-[2rem]"
              >
                <CardBody className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900">瀏覽模式</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      循序漸進查看所有單字，適合初次接觸或快速複習。
                    </p>
                  </div>
                  <div className="font-bold w-full rounded-xl bg-blue-50 text-blue-600 py-2 px-4 text-center group-hover:bg-blue-100 transition-colors">
                    開始瀏覽
                  </div>
                </CardBody>
              </Card>

              <Card 
                isPressable 
                onPress={() => handleStartMode('quiz')}
                className="group border-none shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all hover:-translate-y-1 bg-white rounded-[2rem]"
              >
                <CardBody className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Brain size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="text-amber-400 animate-pulse" size={20} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900">深度學習模式</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      科學演算法追蹤記憶曲線，優先複習您快要忘記的單字。
                    </p>
                  </div>
                  <div className="font-bold w-full rounded-xl bg-purple-50 text-purple-600 py-2 px-4 text-center group-hover:bg-purple-100 transition-colors">
                    啟動 AI 演算法
                  </div>
                </CardBody>
              </Card>
            </div>

            <Button variant="light" color="default" onPress={handleBackToSelection} className="font-bold text-gray-400">
              返回等級選擇
            </Button>
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
              onBack={handleBackToModeSelect}
            />
          </motion.div>
        )}

        {gameState === 'quiz' && selectedCategory && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <QuizView 
              category={selectedCategory} 
              onBack={handleBackToModeSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
