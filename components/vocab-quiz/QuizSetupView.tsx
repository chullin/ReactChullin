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
    // Mobile Audio Prime: Initialize context on user gesture
    if (typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        // Play a quick silent buffer to 'unlock' audio
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.001);
        
        // Warm up speech
        window.speechSynthesis.getVoices();
      } catch (e) {
        console.error('Audio prime failed', e);
      }
    }

    const finalCount = customCount ? parseInt(customCount) : count;
    if (isNaN(finalCount) || finalCount <= 0) {
      alert('請輸入有效的題數');
      return;
    }
    onStart(mode, finalCount);
  };

  const active = {
    text: category.color.replace('tw-bg-', 'tw-text-'),
    border: category.color.replace('tw-bg-', 'tw-border-'),
    bg: category.color.replace('tw-bg-', 'tw-bg-') + ' tw-bg-opacity-10',
    hover: category.color.replace('tw-bg-', 'tw-bg-') + ' tw-bg-opacity-5',
    solid: category.color
  };

  return (
    <div className="tw-transform tw-scale-[0.9] tw-origin-top tw-bg-white tw-rounded-[2.5rem] tw-shadow-2xl tw-p-8 md:tw-p-10 tw-border tw-border-gray-100 max-w-2xl tw-mx-auto tw-relative tw-overflow-hidden">
      {/* Background Accent */}
      <div className={`tw-absolute tw-top-0 tw-right-0 tw-w-32 tw-h-32 ${active.bg} tw-rounded-bl-[100%] tw-z-0`} />
      
      <button 
        onClick={onBack}
        className={`tw-relative tw-z-10 tw-group tw-flex tw-items-center tw-gap-2 ${active.text} tw-font-black tw-text-sm tw-mb-10 tw-px-5 tw-py-2.5 tw-rounded-2xl ${active.bg} hover:tw-bg-opacity-20 tw-transition-all`}
      >
        <ArrowLeft className="tw-w-5 tw-h-5 group-hover:tw-translate-x-[-3px] tw-transition-transform" />
        返回類別
      </button>

      <div className="tw-relative tw-z-10 tw-text-center tw-mb-12">
        <div className={`tw-inline-flex tw-p-6 tw-rounded-[2rem] tw-mb-6 ${active.bg} tw-shadow-inner`}>
          <Settings2 className={`tw-w-12 tw-h-12 ${active.text}`} />
        </div>
        <h2 className="tw-text-4xl md:tw-text-5xl tw-font-black tw-text-gray-900 tw-tracking-tight">測驗設定</h2>
        <div className={`tw-mt-4 tw-inline-block tw-px-4 tw-py-1.5 tw-rounded-full ${active.bg} ${active.text} tw-text-sm tw-font-black`}>
          {category.title} 系列
        </div>
      </div>

      <div className="tw-relative tw-z-10 tw-space-y-12">
        {/* Mode Selection */}
        <div>
          <label className="tw-block tw-text-xs tw-font-black tw-text-gray-400 tw-uppercase tw-tracking-widest tw-mb-5 tw-flex tw-items-center tw-gap-2">
            <Languages className="tw-w-4 tw-h-4" /> 學習模式
          </label>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
            <button
              onClick={() => setMode('eng-to-chi')}
              className={`tw-p-6 tw-rounded-3xl tw-border-4 tw-transition-all tw-text-left tw-relative tw-overflow-hidden ${
                mode === 'eng-to-chi' 
                ? `${active.border} ${active.bg} ${active.text}` 
                : 'tw-border-gray-50 tw-bg-white tw-text-gray-400 hover:tw-border-gray-100'
              }`}
            >
              <div className="tw-font-black tw-text-2xl tw-mb-1">英 → 中</div>
              <div className="tw-text-sm tw-font-bold tw-opacity-80">看到單字選意思</div>
            </button>
            <button
              onClick={() => setMode('chi-to-eng')}
              className={`tw-p-6 tw-rounded-3xl tw-border-4 tw-transition-all tw-text-left tw-relative tw-overflow-hidden ${
                mode === 'chi-to-eng' 
                ? `${active.border} ${active.bg} ${active.text}` 
                : 'tw-border-gray-50 tw-bg-white tw-text-gray-400 hover:tw-border-gray-100'
              }`}
            >
              <div className="tw-font-black tw-text-2xl tw-mb-1">中 → 英</div>
              <div className="tw-text-sm tw-font-bold tw-opacity-80">看到意思選單字</div>
            </button>
          </div>
        </div>

        {/* Count Selection */}
        <div>
          <label className="tw-block tw-text-xs tw-font-black tw-text-gray-400 tw-uppercase tw-tracking-widest tw-mb-5 tw-flex tw-items-center tw-gap-2">
            <Book className="tw-w-4 tw-h-4" /> 挑戰題數
          </label>
          <div className="tw-grid tw-grid-cols-4 tw-gap-4">
            {[10, 20, 50].map((v) => (
              <button
                key={v}
                onClick={() => { setCount(v); setCustomCount(''); }}
                className={`tw-py-5 tw-rounded-3xl tw-border-4 tw-font-black tw-text-xl tw-transition-all ${
                  count === v && !customCount
                  ? `${active.border} ${active.bg} ${active.text}` 
                  : 'tw-border-gray-50 tw-bg-white tw-text-gray-400 hover:tw-border-gray-100'
                }`}
              >
                {v}
              </button>
            ))}
            <input
              type="number"
              placeholder="自訂"
              value={customCount}
              onChange={(e) => {
                setCustomCount(e.target.value);
                setCount(0);
              }}
              className={`tw-w-full tw-py-5 tw-px-4 tw-rounded-3xl tw-border-4 tw-font-black tw-text-xl tw-outline-none tw-transition-all tw-text-center ${
                customCount 
                ? `${active.border} ${active.bg} ${active.text}` 
                : 'tw-border-gray-50 tw-bg-white tw-text-gray-400 focus:tw-border-gray-200'
              }`}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className={`tw-w-full tw-py-7 ${active.solid} tw-text-white tw-rounded-[2rem] tw-font-black tw-text-3xl tw-flex tw-items-center tw-justify-center tw-gap-5 tw-shadow-2xl tw-shadow-primary/40 hover:tw-brightness-110 tw-transition-all`}
        >
          <Play className="tw-w-10 tw-h-10" />
          開啟測驗
        </motion.button>
      </div>
    </div>
  );
}
