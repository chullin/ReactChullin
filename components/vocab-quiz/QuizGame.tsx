'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word, DifficultyCategory } from '@/data/wordData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Lightbulb, 
  ChevronRight,
  BookOpen,
  Image as ImageIcon,
  History
} from 'lucide-react';
import { QuizMode } from './QuizSetupView';

interface Question {
  id: string; // Unique ID to track re-queued questions
  word: string;
  definition: string;
  displayValue: string; // The text shown as the question (Eng or Chi)
  correctAnswer: string; // The expected answer text
  options: string[];
}

type QuizGameProps = {
  category: DifficultyCategory;
  mode: QuizMode;
  totalQuestions: number;
  onFinish: (score: number) => void;
  onBack: () => void;
};

// Simple phonetic mapping for elementary words (Extensible)
const getPhonetic = (word: string): string => {
  const commonDict: Record<string, string> = {
    'apple': '/ˈæp.əl/',
    'banana': '/bəˈnæn.ə/',
    'cat': '/kæt/',
    'dog': '/dɒɡ/',
    'elephant': '/ˈel.ɪ.fənt/',
    'father': '/ˈfɑː.ðər/',
    'mother': '/ˈmʌð.ər/',
    'brother': '/ˈbrʌð.ər/',
    'sister': '/ˈsɪs.tər/',
    'family': '/ˈfæm.əl.i/',
    'school': '/skuːl/',
    'teacher': '/ˈtiː.tʃər/',
    'student': '/ˈstjuː.dənt/',
    'English': '/ˈɪŋ.ɡlɪʃ/',
    'book': '/bʊk/',
    'pencil': '/ˈpen.səl/',
    'water': '/ˈwɔː.tər/',
    'bread': '/bred/',
    'rice': '/raɪs/',
    'fish': '/fɪʃ/',
    'happy': '/ˈhæp.i/',
    'sad': '/sæd/',
    'big': '/bɪɡ/',
    'small': '/smɔːl/',
  };
  return commonDict[word.toLowerCase()] || `/${word.toLowerCase()}/`;
};

// Memory Aid Generator
const getMemoryAid = (word: string, definition: string) => {
  return {
    association: `想像一個 ${definition} 的畫面，標記上 "${word}"。`,
    story: `小明今天在森林裡遇到一隻 ${word} (${definition})。它看起來非常友善。`,
    structure: word.length > 5 ? `這個字由 ${word.length} 個字母組成，試著拆解發音：${word.split('').join('-')}。` : `這是一個基礎單字，注意它的核心發音。`
  };
};

export default function QuizGame({ category, mode, totalQuestions, onFinish, onBack }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [correctedOnFirstTry, setCorrectedOnFirstTry] = useState(0);
  const [score, setScore] = useState(0);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  
  const audioCorrect = useRef<HTMLAudioElement | null>(null);
  const audioWrong = useRef<HTMLAudioElement | null>(null);

  // Initialize Assets
  useEffect(() => {
    audioCorrect.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
    audioWrong.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
  }, []);

  // Initialize questions
  useEffect(() => {
    const shuffledWords = [...category.words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, Math.min(totalQuestions, shuffledWords.length));
    
    const generatedQuestions = selectedWords.map((wordObj, index) => {
      const isEngToChi = mode === 'eng-to-chi';
      const questionText = isEngToChi ? wordObj.word : wordObj.definition;
      const correctVal = isEngToChi ? wordObj.definition : wordObj.word;
      
      const distractors = category.words
        .filter(w => w.word !== wordObj.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => isEngToChi ? w.definition : w.word);
        
      const options = [correctVal, ...distractors].sort(() => Math.random() - 0.5);
      
      return {
        id: `q-${index}`,
        word: wordObj.word,
        definition: wordObj.definition,
        displayValue: questionText,
        correctAnswer: correctVal,
        options
      };
    });
    
    setQuestions(generatedQuestions);
    setScore(0);
    setCorrectedOnFirstTry(0);
    setCurrentQuestionIndex(0);
  }, [category, mode, totalQuestions]);

  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Auto-speak on new question
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length && !isAnswering) {
      speak(questions[currentQuestionIndex].word);
      setHasPlayedAudio(true);
    }
  }, [currentQuestionIndex, questions, isAnswering, speak]);

  const handleOptionSelect = (option: string) => {
    if (isAnswering) return;
    
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;
    
    setSelectedOption(option);
    setIsAnswering(true);
    
    if (isCorrect) {
      audioCorrect.current?.play();
      if (!currentQ.id.includes('retry')) {
        setCorrectedOnFirstTry(prev => prev + 1);
      }
      setScore(prev => prev + 1);
      
      // Auto-advance for correct answers
      setTimeout(() => {
        advance();
      }, 1000);
    } else {
      audioWrong.current?.play();
      setIsWrong(true);
      
      // Re-queue the wrong word
      const failedQuestion = {
        ...currentQ,
        id: `retry-${currentQ.word}-${Date.now()}`,
        options: [...currentQ.options].sort(() => Math.random() - 0.5) // Reshuffle options for retry
      };
      
      setQuestions(prev => [...prev, failedQuestion]);
    }
  };

  const advance = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswering(false);
      setIsWrong(false);
    } else {
      // Calculate final percentage based on first tries
      const finalScore = Math.round((correctedOnFirstTry / totalQuestions) * 100);
      onFinish(finalScore);
    }
  };

  if (questions.length === 0) return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
      <div className="tw-animate-spin tw-w-8 tw-h-8 tw-border-4 tw-border-primary tw-border-t-transparent tw-rounded-full"></div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];
  const memoryAid = getMemoryAid(currentQuestion.word, currentQuestion.definition);

  return (
    <div className="tw-bg-white tw-rounded-3xl tw-shadow-sm tw-p-6 md:tw-p-10 tw-border tw-border-gray-50 tw-relative overflow-hidden">
      {/* Progress Bar */}
      <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-2 tw-bg-gray-100">
        <motion.div 
          className="tw-h-full tw-bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
        <button 
          onClick={onBack}
          className="tw-flex tw-items-center tw-gap-1 tw-text-gray-400 hover:tw-text-gray-600 tw-transition-colors"
        >
          <ArrowLeft className="tw-w-4 tw-h-4" />
          <span className="tw-text-sm">返回</span>
        </button>
        <div className="tw-text-primary tw-font-bold">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="tw-font-bold tw-text-gray-900">
          Score: {score}
        </div>
      </div>

      <div className="tw-text-center tw-mb-8">
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-mb-2">
          <motion.h2 
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tw-text-5xl md:tw-text-6xl tw-font-black tw-text-gray-900 tw-tracking-tight"
          >
            {currentQuestion.displayValue}
          </motion.h2>
          <button 
            onClick={() => speak(currentQuestion.word)}
            className="tw-p-2 tw-rounded-full tw-bg-gray-50 tw-text-gray-400 hover:tw-bg-primary/10 hover:tw-text-primary tw-transition-all"
          >
            <Volume2 className="tw-w-6 tw-h-6" />
          </button>
        </div>
        
        <div className="tw-text-gray-400 tw-font-medium tw-text-lg tw-mb-2">
          {getPhonetic(currentQuestion.word)}
        </div>
        <p className="tw-text-gray-400">這個單字的意思是...</p>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQuestion.correctAnswer;
          const showResult = isAnswering;
          
          let buttonClass = "tw-w-full tw-p-5 tw-rounded-2xl tw-border-2 tw-text-lg tw-font-bold tw-transition-all ";
          
          if (!showResult) {
            buttonClass += "tw-bg-white tw-border-gray-100 tw-text-gray-700 hover:tw-border-primary hover:tw-bg-primary/5 hover:tw-scale-[1.01] active:tw-scale-[0.98]";
          } else {
            if (isCorrect) {
              buttonClass += "tw-bg-green-50 tw-border-green-500 tw-text-green-700";
            } else if (isSelected) {
              buttonClass += "tw-bg-red-50 tw-border-red-500 tw-text-red-700";
            } else {
              buttonClass += "tw-bg-gray-50 tw-border-gray-100 tw-text-gray-300";
            }
          }

          return (
            <motion.button
              key={`${currentQuestion.id}-${idx}`}
              animate={showResult && isSelected && !isCorrect ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              disabled={isAnswering}
              onClick={() => handleOptionSelect(option)}
              className={buttonClass}
            >
              <div className="tw-flex tw-justify-between tw-items-center">
                <span>{option}</span>
                {showResult && isCorrect && <CheckCircle2 className="tw-w-6 tw-h-6 tw-text-green-500" />}
                {showResult && isSelected && !isCorrect && <XCircle className="tw-w-6 tw-h-6 tw-text-red-500" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswering && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="tw-mt-8"
          >
            {isWrong && (
              <div className="tw-bg-gray-50 tw-rounded-2xl tw-p-6 tw-border tw-border-gray-100">
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-red-500 tw-font-bold tw-mb-4">
                  <XCircle className="tw-w-5 tw-h-5" />
                  <span>答錯了，正確答案是：{currentQuestion.correctAnswer}</span>
                </div>
                
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
                  <div className="tw-bg-white tw-p-4 tw-rounded-xl tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-blue-500 tw-font-bold tw-mb-2">
                      <ImageIcon className="tw-w-4 tw-h-4" /> 圖像連想
                    </div>
                    <p className="tw-text-sm tw-text-gray-600">{memoryAid.association}</p>
                  </div>
                  <div className="tw-bg-white tw-p-4 tw-rounded-xl tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-purple-500 tw-font-bold tw-mb-2">
                      <BookOpen className="tw-w-4 tw-h-4" /> 情境故事
                    </div>
                    <p className="tw-text-sm tw-text-gray-600">{memoryAid.story}</p>
                  </div>
                  <div className="tw-bg-white tw-p-4 tw-rounded-xl tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-orange-500 tw-font-bold tw-mb-2">
                      <Lightbulb className="tw-w-4 tw-h-4" /> 結構分析
                    </div>
                    <p className="tw-text-sm tw-text-gray-600">{memoryAid.structure}</p>
                  </div>
                </div>

                <div className="tw-mt-6 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-400 tw-text-sm">
                    <History className="tw-w-4 tw-h-4" />
                    <span>這題會排到最後讓你再練習一次</span>
                  </div>
                  <button
                    onClick={advance}
                    className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-900 tw-text-white tw-px-6 tw-py-3 tw-rounded-xl tw-font-bold hover:tw-bg-gray-800 tw-transition-colors"
                  >
                    進入下一題 <ChevronRight className="tw-w-5 tw-h-5" />
                  </button>
                </div>
              </div>
            )}
            {!isWrong && (
              <div className="tw-text-center tw-text-green-500 tw-font-bold tw-text-xl">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }}>太棒了！答對了</motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
