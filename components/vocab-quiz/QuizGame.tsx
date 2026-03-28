'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word, DifficultyCategory } from '@/data/wordData';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  id: number;
  word: string;
  correctAnswer: string;
  options: string[];
}

type QuizGameProps = {
  category: DifficultyCategory;
  onFinish: (score: number) => void;
  onBack: () => void;
};

export default function QuizGame({ category, onFinish, onBack }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize questions
  useEffect(() => {
    // Shuffle words from category
    const shuffledWords = [...category.words].sort(() => Math.random() - 0.5);
    // Take 10 or all if less than 10
    const selectedWords = shuffledWords.slice(0, 10);
    
    // Create question objects
    const generatedQuestions = selectedWords.map((wordObj, index) => {
      // Get 3 distractors from same category (not the current word)
      const distractors = category.words
        .filter(w => w.word !== wordObj.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.definition);
        
      // Combine and shuffle options
      const options = [wordObj.definition, ...distractors].sort(() => Math.random() - 0.5);
      
      return {
        id: index,
        word: wordObj.word,
        correctAnswer: wordObj.definition,
        options
      };
    });
    
    setQuestions(generatedQuestions);
  }, [category]);

  const handleOptionSelect = (option: string) => {
    if (isAnswering) return;
    
    setSelectedOption(option);
    setIsAnswering(true);
    
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    // Wait for feedback period
    const delay = isCorrect ? 1000 : 1500;
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswering(false);
      } else {
        onFinish(isCorrect ? score + 10 : score);
      }
    }, delay);
  };

  if (questions.length === 0) return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
      <div className="tw-animate-spin tw-w-8 tw-h-8 tw-border-4 tw-border-primary tw-border-t-transparent tw-rounded-full"></div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];

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

      <div className="tw-text-center tw-mb-12">
        <motion.h2 
          key={currentQuestion.word}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="tw-text-5xl md:tw-text-6xl tw-font-black tw-text-gray-900 tw-tracking-tight tw-mb-4"
        >
          {currentQuestion.word}
        </motion.h2>
        <p className="tw-text-gray-400 tw-text-lg">這個單字的意思是...</p>
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
              key={idx}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`tw-mt-8 tw-text-center tw-font-bold tw-text-xl ${selectedOption === currentQuestion.correctAnswer ? 'tw-text-green-500' : 'tw-text-red-500'}`}
          >
            {selectedOption === currentQuestion.correctAnswer ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }}>Correct!</motion.div>
            ) : (
              <div>Oops! 正確答案是：{currentQuestion.correctAnswer}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
