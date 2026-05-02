'use client';

import { useState, useEffect, useCallback } from 'react';
import { Word, DifficultyCategory } from '@/data/wordData';
import { QuizMode } from './QuizSetupView';
import { 
  Button, 
  Card, 
  CardBody, 
  Progress,
} from '@heroui/react';
import { 
  CheckCircle2, 
  XCircle, 
  X, 
  Trophy, 
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  word: Word;
  options: string[];
  correctAnswer: string;
};

type QuizGameProps = {
  category: DifficultyCategory;
  mode: QuizMode;
  totalQuestions: number;
  onFinish: (score: number) => void;
  onBack: () => void;
};

export default function QuizGame({ category, mode, totalQuestions, onFinish, onBack }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestions = useCallback(() => {
    const shuffled = [...category.words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, totalQuestions);

    const allAnswers = category.words.map(w =>
      mode === 'eng-to-chi' ? w.definition : w.word
    );

    const generatedQuestions: Question[] = selectedWords.map(word => {
      const correctAnswer = mode === 'eng-to-chi' ? word.definition : word.word;
      let distractors = allAnswers.filter(a => a !== correctAnswer);
      distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);
      return { word, options, correctAnswer };
    });

    setQuestions(generatedQuestions);
  }, [category, mode, totalQuestions]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const correct = answer === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      onFinish(score);
    }
  };

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const progressValue = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-3 px-3 py-2">
      
      {/* Top Bar: Score + Difficulty + Quit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Trophy className="text-blue-500" size={16} />
            <span className="text-sm font-bold text-gray-500">
              得分 <span className="text-primary font-black">{score}</span>/{totalQuestions}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-400">{category.title}</span>
          </div>
        </div>
        <Button
          variant="light"
          color="danger"
          size="sm"
          onPress={onBack}
          startContent={<X size={14} />}
          className="font-bold text-xs h-7 px-2"
        >
          放棄
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-gray-400">
          <span>第 {currentIndex + 1} 題</span>
          <span>共 {totalQuestions} 題</span>
        </div>
        <Progress
          aria-label="Quiz progress"
          value={progressValue}
          color="primary"
          size="sm"
          classNames={{
            indicator: "bg-gradient-to-r from-blue-400 to-blue-600",
          }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-3"
        >
          {/* Word / Question */}
          <Card className="border-none shadow-lg bg-white">
            <CardBody className="py-4 px-6 flex flex-col items-center text-center gap-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-gray-300 uppercase">
                {mode === 'eng-to-chi' ? '這個單字是什麼意思？' : '這個中文對應哪個英文？'}
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <h2
                  className={`font-black tracking-tight leading-tight break-all text-center ${
                    mode === 'eng-to-chi' ? 'text-primary' : 'text-indigo-600'
                  } ${
                    (mode === 'eng-to-chi' ? currentQuestion.word.word : currentQuestion.word.definition).length > 12
                      ? 'text-3xl sm:text-4xl'
                      : 'text-4xl sm:text-5xl'
                  }`}
                >
                  {mode === 'eng-to-chi' ? currentQuestion.word.word : currentQuestion.word.definition}
                </h2>
                {mode === 'eng-to-chi' && (
                  <button
                    onClick={() => playSound(currentQuestion.word.word)}
                    className="text-gray-300 hover:text-blue-400 transition-colors shrink-0"
                  >
                    <Volume2 size={20} />
                  </button>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map((option, idx) => {
              const isCorrectAnswer = option === currentQuestion.correctAnswer;
              const isUserSelection = option === selectedAnswer;

              let bgClass = 'bg-white border-2 border-gray-100 hover:border-primary hover:bg-blue-50';
              if (isAnswered) {
                if (isCorrectAnswer) bgClass = 'bg-success/10 border-2 border-success text-success';
                else if (isUserSelection) bgClass = 'bg-danger/10 border-2 border-danger text-danger';
                else bgClass = 'bg-gray-50 border-2 border-gray-100 text-gray-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`relative w-full rounded-2xl px-3 py-3 text-sm sm:text-base font-bold text-center transition-all leading-snug ${bgClass} ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-95'
                  }`}
                >
                  {option}
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2" size={16} />
                  )}
                  {isAnswered && isUserSelection && !isCorrectAnswer && (
                    <XCircle className="absolute right-2 top-1/2 -translate-y-1/2" size={16} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next Button (shown after answering) */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-bold min-w-0">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={18} className="text-success shrink-0" />
                      <span className="text-success">答對了！太棒了 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-danger shrink-0" />
                      <span className="text-danger truncate">
                        正解：{currentQuestion.correctAnswer}
                      </span>
                    </>
                  )}
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="font-black shrink-0"
                  onPress={handleNext}
                  endContent={<ChevronRight size={16} />}
                >
                  {currentIndex === totalQuestions - 1 ? '看結果' : '下一題'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint (before answering) */}
          {!isAnswered && (
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium px-1">
              <HelpCircle size={14} className="shrink-0" />
              <span>仔細觀察單字的詞性與語境，這將幫助您做出正確選擇。</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
