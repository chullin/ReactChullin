'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DifficultyCategory } from '@/data/wordData';
import { ArrowLeft, Book, Languages, Settings2, Play } from 'lucide-react';

export type QuizMode = 'eng-to-chi' | 'chi-to-eng';

interface QuizSetupViewProps {
  category: DifficultyCategory;
  onStart: (mode: QuizMode, count: number) => void;
  onBack: () => void;
}

export default function QuizSetupView({ category, onStart, onBack }: QuizSetupViewProps) {
  const [mode, setMode] = useState<QuizMode>('eng-to-chi');
  const [count, setCount] = useState<number>(10);
  const [customCount, setCustomCount] = useState<string>('');

  const handleStart = () => {
    const finalCount = customCount ? parseInt(customCount) : count;
    if (isNaN(finalCount) || finalCount <= 0) {
      alert('請輸入有效的題數');
      return;
    }
    onStart(mode, finalCount);
  };

  return (
    <div className="tw-bg-white tw-rounded-3xl tw-shadow-sm tw-p-8 md:tw-p-10 tw-border tw-border-gray-50 max-w-2xl tw-mx-auto">
      <button 
        onClick={onBack}
        className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400 hover:tw-text-gray-600 tw-transition-colors tw-mb-8"
      >
        <ArrowLeft className="tw-w-5 tw-h-5" />
        <span className="tw-font-medium">返回難度選擇</span>
      </button>

      <div className="tw-text-center tw-mb-10">
        <div className={`tw-inline-flex tw-p-4 tw-rounded-2xl tw-mb-4 ${category.color} tw-bg-opacity-10`}>
          <Settings2 className={`tw-w-8 tw-h-8 ${category.color.replace('tw-bg-', 'tw-text-')}`} />
        </div>
        <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900">測驗設定</h2>
        <p className="tw-text-gray-500 tw-mt-2">客製化你的學習體驗：{category.title}</p>
      </div>

      <div className="tw-space-y-8">
        {/* Mode Selection */}
        <div>
          <label className="tw-block tw-text-sm tw-font-bold tw-text-gray-700 tw-mb-4 tw-flex tw-items-center tw-gap-2">
            <Languages className="tw-w-4 tw-h-4" /> 測驗模式
          </label>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <button
              onClick={() => setMode('eng-to-chi')}
              className={`tw-p-4 tw-rounded-2xl tw-border-2 tw-transition-all tw-text-left ${
                mode === 'eng-to-chi' 
                ? 'tw-border-primary tw-bg-primary/5 tw-text-primary' 
                : 'tw-border-gray-100 tw-bg-white tw-text-gray-600 hover:tw-border-gray-200'
              }`}
            >
              <div className="tw-font-bold tw-text-lg">英文 → 中文</div>
              <div className="tw-text-xs tw-opacity-70">看到英文單字選中文意思</div>
            </button>
            <button
              onClick={() => setMode('chi-to-eng')}
              className={`tw-p-4 tw-rounded-2xl tw-border-2 tw-transition-all tw-text-left ${
                mode === 'chi-to-eng' 
                ? 'tw-border-primary tw-bg-primary/5 tw-text-primary' 
                : 'tw-border-gray-100 tw-bg-white tw-text-gray-600 hover:tw-border-gray-200'
              }`}
            >
              <div className="tw-font-bold tw-text-lg">中文 → 英文</div>
              <div className="tw-text-xs tw-opacity-70">看到中文意思選英文單字</div>
            </button>
          </div>
        </div>

        {/* Count Selection */}
        <div>
          <label className="tw-block tw-text-sm tw-font-bold tw-text-gray-700 tw-mb-4 tw-flex tw-items-center tw-gap-2">
            <Book className="tw-w-4 tw-h-4" /> 題目數量
          </label>
          <div className="tw-grid tw-grid-cols-4 tw-gap-3 tw-mb-4">
            {[10, 20, 50].map((v) => (
              <button
                key={v}
                onClick={() => { setCount(v); setCustomCount(''); }}
                className={`tw-py-3 tw-rounded-xl tw-border-2 tw-font-bold tw-transition-all ${
                  count === v && !customCount
                  ? 'tw-border-primary tw-bg-primary/5 tw-text-primary' 
                  : 'tw-border-gray-100 tw-bg-white tw-text-gray-600 hover:tw-border-gray-200'
                }`}
              >
                {v} 題
              </button>
            ))}
            <div className="tw-relative">
              <input
                type="number"
                placeholder="自訂"
                value={customCount}
                onChange={(e) => {
                  setCustomCount(e.target.value);
                  setCount(0);
                }}
                className={`tw-w-full tw-py-3 tw-px-3 tw-rounded-xl tw-border-2 tw-font-bold tw-outline-none tw-transition-all ${
                  customCount 
                  ? 'tw-border-primary tw-bg-primary/5 tw-text-primary' 
                  : 'tw-border-gray-100 tw-bg-white tw-text-gray-400 focus:tw-border-gray-300'
                }`}
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="tw-w-full tw-py-5 tw-bg-primary tw-text-white tw-rounded-2xl tw-font-black tw-text-xl tw-flex tw-items-center tw-justify-center tw-gap-3 tw-shadow-lg tw-shadow-primary/20 hover:tw-shadow-xl hover:tw-shadow-primary/30 tw-transition-all"
        >
          <Play className="tw-w-6 tw-h-6" />
          開始測驗
        </motion.button>
      </div>
    </div>
  );
}
