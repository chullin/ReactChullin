'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DifficultyCategory } from '@/data/wordData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  ChevronRight,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { QuizMode } from './QuizSetupView';
import { getPinyin } from '@/utils/pinyinUtils';

interface Question {
  id: string;
  word: string;
  definition: string;
  displayValue: string;
  correctAnswer: string;
  options: string[];
}

type QuizGameProps = {
  category: DifficultyCategory;
  mode: QuizMode;
  totalQuestions: number;
  onFinish: (score: number) => void;
  onBack: () => void;
};

// Simple phonetic mapping for common words
const getPhonetic = (word: string): string => {
  const commonDict: Record<string, string> = {
    'apple': '/ˈæp.əl/', 'banana': '/bəˈnæn.ə/', 'cat': '/kæt/', 'dog': '/dɒɡ/',
    'elephant': '/ˈel.ɪ.fənt/', 'father': '/ˈfɑː.ðər/', 'mother': '/ˈmʌð.ər/',
    'brother': '/ˈbrʌð.ər/', 'sister': '/ˈsɪs.tər/', 'family': '/ˈfæm.əl.i/',
    'school': '/skuːl/', 'teacher': '/ˈtiː.tʃər/', 'student': '/ˈstjuː.dənt/',
    'English': '/ˈɪŋ.ɡlɪʃ/', 'book': '/bʊk/', 'pencil': '/ˈpen.səl/',
    'water': '/ˈwɔː.tər/', 'bread': '/bred/', 'rice': '/raɪs/', 'fish': '/fɪʃ/',
    'happy': '/ˈhæp.i/', 'sad': '/sæd/', 'big': '/bɪɡ/', 'small': '/smɔːl/',
    'available': '/əˈveɪ.lə.bəl/', 'cabbage': '/ˈkæb.ɪdʒ/', 'restaurant': '/ˈres.trɒnt/'
  };
  return commonDict[word.toLowerCase()] || `/${word.toLowerCase()}/`;
};

const getMemoryAid = (word: string, definition: string) => {
  return {
    association: `想像一個 ${definition} 的畫面，標記上 "${word}"。`,
    story: `小明今天在森林裡遇到一隻 ${word} (${definition})。它看起來非常友善。`,
    structure: word.length > 5 ? `這個字由 ${word.length} 個字母組成：${word.split('').join('-')}。` : `這是一個基礎單字。`
  };
};

export default function QuizGame({ category, mode, totalQuestions, onFinish, onBack }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [masteredWords, setMasteredWords] = useState<Set<string>>(new Set());

  const active = useMemo(() => {
    const text = category.color.replace('tw-bg-', 'tw-text-');
    const border = category.color.replace('tw-bg-', 'tw-border-');
    const bg = category.color.replace('tw-bg-', 'tw-bg-') + ' tw-bg-opacity-10';
    const solid = category.color;
    return { text, border, bg, solid };
  }, [category.color]);

  const playTone = useCallback((type: 'correct' | 'wrong') => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, context.currentTime);
        gainNode.gain.setValueAtTime(0.05, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
      } else {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(220, context.currentTime);
        oscillator.frequency.linearRampToValueAtTime(110, context.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.05, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.4);
      }
      setTimeout(() => context.close(), 600);
    } catch(e) {}
  }, []);

  useEffect(() => {
    const shuffledWords = [...category.words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, Math.min(totalQuestions, shuffledWords.length));
    
    const generatedQuestions = selectedWords.map((wordObj, index) => {
      const isEngToChi = mode === 'eng-to-chi';
      return {
        id: `q-${index}`,
        word: wordObj.word,
        definition: wordObj.definition,
        displayValue: isEngToChi ? wordObj.word : wordObj.definition,
        correctAnswer: isEngToChi ? wordObj.definition : wordObj.word,
        options: [
          isEngToChi ? wordObj.definition : wordObj.word,
          ...category.words
            .filter(w => w.word !== wordObj.word)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => isEngToChi ? w.definition : w.word)
        ].sort(() => Math.random() - 0.5)
      };
    });
    
    setQuestions(generatedQuestions);
    setMasteredWords(new Set());
    setCurrentQuestionIndex(0);
  }, [category, mode, totalQuestions]);

  const speak = useCallback((text: string, isChinese: boolean = false) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isChinese ? 'zh-TW' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length && !isAnswering) {
      const q = questions[currentQuestionIndex];
      speak(mode === 'eng-to-chi' ? q.word : q.definition, mode === 'chi-to-eng');
    }
  }, [currentQuestionIndex, questions, isAnswering, speak, mode]);

  const advance = useCallback((currentMasteredCount?: number) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswering(false);
      setIsWrong(false);
    } else {
      // Calculate final completion score: use the latest count if provided
      const finalCount = currentMasteredCount ?? masteredWords.size;
      const totalToPlay = questions.filter(q => !q.id.includes('retry')).length || totalQuestions;
      const finalScore = Math.round((finalCount / totalToPlay) * 100);
      onFinish(finalScore);
    }
  }, [currentQuestionIndex, questions, masteredWords.size, onFinish, totalQuestions]);

  const handleOptionSelect = (option: string) => {
    if (isAnswering) return;
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;
    setSelectedOption(option);
    setIsAnswering(true);
    
    if (isCorrect) {
      playTone('correct');
      const newMastered = new Set(masteredWords).add(currentQ.word);
      setMasteredWords(newMastered);
      
      // Auto-advance for correct answers
      setTimeout(() => {
        advance(newMastered.size);
      }, 1000);
    } else {
      playTone('wrong');
      setIsWrong(true);
      const failedQuestion = {
        ...currentQ,
        id: `retry-${currentQ.word}-${Date.now()}`,
        options: [...currentQ.options].sort(() => Math.random() - 0.5)
      };
      setQuestions(prev => [...prev, failedQuestion]);
    }
  };

  if (questions.length === 0) return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
      <div className={`tw-animate-spin tw-w-8 tw-h-8 tw-border-4 ${active.border} tw-border-t-transparent tw-rounded-full`}></div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];
  const memoryAid = getMemoryAid(currentQuestion.word, currentQuestion.definition);
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 12) return 'tw-text-3xl md:tw-text-5xl';
    if (len > 8) return 'tw-text-4xl md:tw-text-6xl';
    return 'tw-text-5xl md:tw-text-7xl';
  };

  return (
    <div className="tw-transform tw-scale-[0.9] tw-origin-top tw-bg-white tw-rounded-[3rem] tw-shadow-2xl tw-p-6 md:tw-p-10 tw-border tw-border-gray-50 tw-relative tw-overflow-hidden tw-max-w-2xl tw-mx-auto">
      <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-3 tw-bg-gray-50">
        <motion.div className={`tw-h-full ${active.solid}`} initial={{ width: 0 }} animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="tw-flex tw-justify-between tw-items-center tw-mb-10 tw-mt-2">
        <button onClick={onBack} className={`tw-group tw-flex tw-items-center tw-gap-2 ${active.text} tw-bg-white tw-border-2 ${active.border} tw-px-4 tw-py-1.5 tw-rounded-full tw-font-black tw-text-xs hover:${active.solid} hover:tw-text-white tw-transition-all`}>
          <ArrowLeft className="tw-w-4 tw-h-4 group-hover:tw-translate-x-[-2px] tw-transition-transform" />
          <span>離開測驗</span>
        </button>
        <div className={`tw-font-black ${active.text} ${active.bg} tw-px-5 tw-py-1.5 tw-rounded-full tw-text-sm`}>
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="tw-text-center tw-mb-12">
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-mb-4">
          <motion.h2 key={currentQuestion.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`tw-font-black tw-text-gray-900 tw-tracking-tight tw-leading-tight tw-break-words tw-w-full ${getFontSize(currentQuestion.displayValue)}`}>
            {currentQuestion.displayValue}
          </motion.h2>
          <button onClick={() => speak(mode === 'eng-to-chi' ? currentQuestion.word : currentQuestion.definition, mode === 'chi-to-eng')} className={`tw-p-5 tw-rounded-3xl ${active.solid} tw-text-white tw-shadow-2xl hover:tw-scale-110 active:tw-scale-95 tw-transition-all`}>
            <Volume2 className="tw-w-8 tw-h-8" />
          </button>
        </div>
        
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
          <div className={`tw-px-4 tw-py-1.5 tw-rounded-2xl ${active.bg} ${active.text} tw-font-black tw-text-sm tw-border ${active.border} tw-border-opacity-20`}>
            {mode === 'eng-to-chi' ? 'Phonetic IPA' : 'Diplomatic Pinyin'}
          </div>
          <div className="tw-text-gray-900 tw-font-black tw-text-2xl">
            {mode === 'eng-to-chi' ? getPhonetic(currentQuestion.word) : getPinyin(currentQuestion.definition)}
          </div>
        </div>
      </div>

      <div className="tw-grid tw-grid-cols-1 tw-gap-4">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQuestion.correctAnswer;
          const showResult = isAnswering;
          
          let buttonClass = "tw-w-full tw-p-6 tw-rounded-[2rem] tw-border-4 tw-text-2xl tw-font-black tw-transition-all tw-relative tw-overflow-hidden ";
          if (!showResult) {
            buttonClass += `tw-bg-white ${active.border} tw-border-opacity-20 ${active.text} hover:tw-border-opacity-100 active:tw-scale-95`;
          } else if (isCorrect) {
            buttonClass += "tw-bg-green-500 tw-border-green-500 tw-text-white tw-shadow-xl tw-shadow-green-200";
          } else if (isSelected) {
            buttonClass += "tw-bg-red-500 tw-border-red-500 tw-text-white tw-shadow-xl tw-shadow-red-200";
          } else {
            buttonClass += `tw-bg-gray-50 tw-border-gray-50 tw-text-gray-200 tw-opacity-50`;
          }

          return (
            <motion.button key={`${currentQuestion.id}-${idx}`} animate={showResult && isSelected && !isCorrect ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} disabled={isAnswering} onClick={() => handleOptionSelect(option)} className={buttonClass}>
              <div className="tw-flex tw-justify-center tw-items-center tw-gap-3">
                <span>{option}</span>
                {showResult && isCorrect && <CheckCircle2 className="tw-w-7 tw-h-7" />}
                {showResult && isSelected && !isCorrect && <XCircle className="tw-w-7 tw-h-7" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswering && isWrong && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="tw-mt-8 tw-bg-red-50 tw-rounded-[2.5rem] tw-p-8 tw-border-4 tw-border-red-200">
            <div className="tw-flex tw-items-center tw-gap-3 tw-text-red-600 tw-font-black tw-text-xl tw-mb-6">
              <XCircle className="tw-w-8 tw-h-8" />
              <span>別灰心，正確答案是：{currentQuestion.correctAnswer}</span>
            </div>
            
            <div className="tw-grid tw-grid-cols-1 tw-gap-5">
              <div className="tw-bg-white tw-p-5 tw-rounded-3xl tw-shadow-sm tw-flex tw-items-start tw-gap-4">
                <ImageIcon className="tw-w-6 tw-h-6 tw-text-blue-500 tw-shrink-0 tw-mt-1" />
                <div>
                  <div className="tw-font-black tw-text-xs tw-text-blue-500 tw-uppercase tw-mb-1">圖像連想</div>
                  <p className="tw-text-sm tw-text-gray-700 tw-font-bold">{memoryAid.association}</p>
                </div>
              </div>
              <div className="tw-bg-white tw-p-5 tw-rounded-3xl tw-shadow-sm tw-flex tw-items-start tw-gap-4">
                <BookOpen className="tw-w-6 tw-h-6 tw-text-purple-500 tw-shrink-0 tw-mt-1" />
                <div>
                  <div className="tw-font-black tw-text-xs tw-text-purple-500 tw-uppercase tw-mb-1">情境故事</div>
                  <p className="tw-text-sm tw-text-gray-700 tw-font-bold">{memoryAid.story}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => advance()}
              className="tw-w-full tw-mt-8 tw-flex tw-items-center tw-justify-center tw-gap-3 tw-bg-gray-900 tw-text-white tw-py-6 tw-rounded-3xl tw-font-black tw-text-xl hover:tw-bg-black tw-transition-all"
            >  學起來了，繼續 <ChevronRight className="tw-w-6 tw-h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
