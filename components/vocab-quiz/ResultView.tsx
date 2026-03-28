'use client';

import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Star, Frown, Rocket } from 'lucide-react';
import { DifficultyCategory } from '@/data/wordData';

type ResultViewProps = {
  score: number;
  category: DifficultyCategory;
  onRestart: () => void;
  onReplay: () => void;
};

export default function ResultView({ score, category, onRestart, onReplay }: ResultViewProps) {
  const getEvaluation = () => {
    if (score === 100) return { 
      text: "太強了！簡直是英文大師！", 
      icon: <Star className="tw-w-16 tw-h-16 tw-text-yellow-400" />,
      color: "tw-text-yellow-500"
    };
    if (score >= 80) return { 
      text: "表現優異！繼續保持！", 
      icon: <Rocket className="tw-w-16 tw-h-16 tw-text-blue-400" />,
      color: "tw-text-blue-500"
    };
    if (score >= 60) return { 
      text: "及格了，再加油一點點！", 
      icon: <Trophy className="tw-w-16 tw-h-16 tw-text-green-400" />,
      color: "tw-text-green-500"
    };
    return { 
      text: "再接再厲，多練習幾次吧！", 
      icon: <Frown className="tw-w-16 tw-h-16 tw-text-gray-400" />,
      color: "tw-text-gray-500"
    };
  };

  const evalData = getEvaluation();

  return (
    <div className="tw-bg-white tw-rounded-3xl tw-shadow-sm tw-p-8 md:tw-p-12 tw-border tw-border-gray-50 tw-text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          rotate: { type: "tween", duration: 0.5 }
        }}
        className="tw-flex tw-justify-center tw-mb-6"
      >
        {evalData.icon}
      </motion.div>

      <h2 className="tw-text-sm tw-font-bold tw-text-gray-400 tw-uppercase tw-tracking-widest tw-mb-2">
        {category.title} - 測試完成
      </h2>
      
      <div className="tw-mb-8">
        <span className="tw-text-7xl md:tw-text-8xl tw-font-black tw-text-gray-900">{score}</span>
        <span className="tw-text-2xl tw-font-bold tw-text-gray-300"> / 100</span>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`tw-text-2xl tw-font-bold tw-mb-12 ${evalData.color}`}
      >
        {evalData.text}
      </motion.p>

      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-8 tw-py-4 tw-bg-primary tw-text-white tw-rounded-2xl tw-font-bold tw-shadow-lg shadow-primary/20 tw-transition-all"
        >
          <RotateCcw className="tw-w-5 tw-h-5" />
          重新挑戰
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-8 tw-py-4 tw-bg-gray-100 tw-text-gray-700 tw-rounded-2xl tw-font-bold hover:tw-bg-gray-200 tw-transition-all"
        >
          <Home className="tw-w-5 tw-h-5" />
          返回選單
        </motion.button>
      </div>
    </div>
  );
}
