'use client';

import { useState, useEffect, useCallback } from 'react';
import { Word, DifficultyCategory, wordData } from '@/data/wordData';
import { QuizMode } from './QuizSetupView';
import { 
  Button, 
  Card, 
  CardBody, 
  Progress, 
  Chip, 
  Divider,
  CardHeader,
  CardFooter
} from '@heroui/react';
import { 
  CheckCircle2, 
  XCircle, 
  X, 
  Trophy, 
  AlertCircle,
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
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Generate Questions
  const generateQuestions = useCallback(() => {
    // Shuffle the available words in the category
    const shuffled = [...category.words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, totalQuestions);

    // Get all possible answers in the category for distractors
    const allAnswers = category.words.map(w => 
      mode === 'eng-to-chi' ? w.chinese : w.english
    );

    const generatedQuestions: Question[] = selectedWords.map(word => {
      const correctAnswer = mode === 'eng-to-chi' ? word.chinese : word.english;
      
      // Filter out correct answer to get distractors
      let distractors = allAnswers.filter(a => a !== correctAnswer);
      distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
      
      const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);
      
      return {
        word,
        options,
        correctAnswer,
      };
    });

    setQuestions(generatedQuestions);
    setQuizStarted(true);
  }, [category, mode, totalQuestions]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Timer Effect
  useEffect(() => {
    if (quizStarted && !isAnswered) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizStarted, isAnswered]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const correct = answer === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
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

  // Audio Placeholder
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="text-blue-500" size={20} />
            <h3 className="font-bold text-gray-400">目前得分：<span className="text-primary">{score}</span> / {totalQuestions}</h3>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <TrendingUp size={16} /> 難度：{category.title}
          </p>
        </div>
        
        <Button 
          variant="light" 
          color="danger" 
          size="sm" 
          onPress={onBack}
          startContent={<X size={16} />}
          className="font-bold border-none"
        >
          放棄這場測驗
        </Button>
      </div>

      <Progress 
        aria-label="Quiz progress" 
        value={progressValue} 
        color="primary"
        size="md"
        className="shadow-sm"
        classNames={{
          indicator: "bg-gradient-to-r from-blue-400 to-blue-600",
        }}
      />

      {/* Main Game Interface */}
      <Card className="border-none shadow-2xl bg-white overflow-visible">
        <CardBody className="p-0 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-12 space-y-12"
            >
              {/* Question Section */}
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center bg-gray-50 text-gray-400 rounded-full px-4 py-1 text-sm font-bold border border-gray-100">
                  第 {currentIndex + 1} 題 / 共 {totalQuestions} 題
                </div>
                
                <div className="space-y-4">
                  <h2 className={`text-6xl font-black tracking-tight ${mode === 'eng-to-chi' ? 'text-primary' : 'text-indigo-600'}`}>
                    {mode === 'eng-to-chi' ? currentQuestion.word.english : currentQuestion.word.chinese}
                  </h2>
                  
                  {mode === 'eng-to-chi' && (
                    <Button
                      isIconOnly
                      size="lg"
                      variant="light"
                      color="primary"
                      onPress={() => playSound(currentQuestion.word.english)}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <Volume2 size={32} />
                    </Button>
                  )}
                  
                  {currentQuestion.word.phonetic && mode === 'eng-to-chi' && (
                    <p className="text-2xl text-gray-400 font-medium italic">
                      {currentQuestion.word.phonetic}
                    </p>
                  )}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrectAnswer = option === currentQuestion.correctAnswer;
                  const isUserSelection = option === selectedAnswer;
                  
                  let buttonColor: "primary" | "success" | "danger" | "default" = "default";
                  let buttonVariant: "solid" | "bordered" | "flat" | "ghost" = "bordered";
                  
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonColor = "success";
                      buttonVariant = "solid";
                    } else if (isUserSelection) {
                      buttonColor = "danger";
                      buttonVariant = "flat";
                    } else {
                      buttonColor = "default";
                      buttonVariant = "bordered";
                      buttonVariant = "flat";
                    }
                  }

                  return (
                    <Button
                      key={idx}
                      size="lg"
                      variant={isAnswered ? buttonVariant : "bordered"}
                      color={buttonColor}
                      className={`h-24 text-xl font-bold rounded-2xl transition-all border-2 ${
                        !isAnswered ? 'hover:border-primary hover:bg-blue-50' : ''
                      } ${!isAnswered && 'border-gray-100'}`}
                      onPress={() => handleAnswerSelect(option)}
                      isDisabled={isAnswered}
                    >
                      {option}
                      {isAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="absolute right-4" size={24} />
                      )}
                      {isAnswered && isUserSelection && !isCorrectAnswer && (
                        <XCircle className="absolute right-4" size={24} />
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Feedback & Actions */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-8 flex flex-col items-center gap-6"
                  >
                    <Divider />
                    <div className="flex flex-col items-center text-center gap-2">
                       {isCorrect ? (
                         <div className="bg-success/10 text-success px-4 py-2 rounded-xl flex items-center gap-2 font-bold mb-2 transition-all">
                           <CheckCircle2 size={24} />
                           答對了！太棒了
                         </div>
                       ) : (
                         <div className="bg-danger/10 text-danger px-4 py-2 rounded-xl flex items-center gap-2 font-bold mb-2 transition-all">
                           <XCircle size={24} />
                           喔不！再接再厲
                         </div>
                       )}
                       <p className="text-gray-500 font-medium">
                         單字例句：<span className="italic">"{currentQuestion.word.example}"</span>
                       </p>
                    </div>

                    <Button
                      color="primary"
                      size="lg"
                      className="px-12 text-xl font-black shadow-xl shadow-blue-500/20"
                      onPress={handleNext}
                      endContent={<ChevronRight size={24} />}
                    >
                      {currentIndex === totalQuestions - 1 ? '看總結結果' : '下一題'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </CardBody>
      </Card>

      {/* Hints Card */}
      {!isAnswered && (
        <Card className="bg-blue-50/30 border-none shadow-none">
          <CardBody className="p-4 flex flex-row items-center gap-4 text-sm text-blue-800">
            <HelpCircle size={20} className="text-blue-500 shrink-0" />
            <p className="font-medium italic">
              提示：仔細觀察單字的詞性與語境，這將幫助您做出正確選擇。
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
