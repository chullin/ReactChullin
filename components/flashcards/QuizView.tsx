
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  Volume2, 
  Star,
  CheckCircle2,
  Clock,
  Brain,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button, Card, CardBody, Chip, Progress, Tooltip } from '@heroui/react';
import { useWordQuiz } from '@/hooks/useWordQuiz';
import { DifficultyCategory } from '@/data/wordData';
import { SRSRating } from '@/utils/srsAlgorithm';
import { getPinyin } from '@/utils/pinyinUtils';

interface QuizViewProps {
  category: DifficultyCategory;
  onBack: () => void;
}

export default function QuizView({ category, onBack }: QuizViewProps) {
  const { 
    currentWord, 
    getNextWord, 
    updateResult, 
    shortTermPool, 
    isReady,
    srsMap
  } = useWordQuiz(category);

  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 初始化第一個單字
  useEffect(() => {
    if (isReady && !currentWord) {
      getNextWord();
    }
  }, [isReady, currentWord, getNextWord]);

  const handleRating = (rating: SRSRating) => {
    updateResult(rating);
    setIsFlipped(false);
    // 延遲一點點再換題，讓動畫順暢
    setTimeout(() => {
      getNextWord();
    }, 200);
  };

  if (!isReady || !currentWord) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 font-bold">正在準備您的個人化練習...</p>
    </div>
  );

  const currentSrs = srsMap[currentWord.word];

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-2">
      {/* Top Stats */}
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100">
        <div className="flex items-center gap-4">
          <Button variant="light" size="sm" onPress={onBack} className="font-bold text-gray-400">退出</Button>
          <Divider orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-purple-500" />
            <span className="text-xs font-black text-gray-600">記憶池: {shortTermPool.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Chip size="sm" variant="flat" color="primary" className="font-black">
                {currentSrs?.state === 'new' ? '新單字' : '複習中'}
            </Chip>
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="relative h-[400px] md:h-[450px] perspective-[1500px]" onClick={() => !isFlipped && setIsFlipped(true)}>
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Front */}
          <Card className="absolute w-full h-full backface-hidden border-none shadow-xl bg-white rounded-[40px]">
            <CardBody className="flex flex-col items-center justify-center space-y-6">
              <span className="text-[10px] font-black tracking-[0.3em] text-gray-300 uppercase">Do you remember?</span>
              <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">{currentWord.word}</h2>
              <p className="text-xl text-blue-400 font-bold italic">{currentWord.phonetic}</p>
              
              <div className="absolute bottom-10 flex items-center gap-2 text-gray-200 text-[10px] font-black uppercase tracking-widest">
                <RotateCcw size={12} className="animate-spin-slow" />
                點擊翻面查看答案
              </div>
            </CardBody>
          </Card>

          {/* Back */}
          <Card 
            className="absolute w-full h-full backface-hidden border-none shadow-xl bg-white rounded-[40px]" 
            style={{ transform: 'rotateY(180deg)' }}
          >
            <CardBody className="flex flex-col items-center justify-center p-8 text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900">{currentWord.definition}</h2>
              <p className="text-gray-400 font-bold">{getPinyin(currentWord.definition)}</p>
              
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 max-w-sm">
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic">"{currentWord.sentence}"</p>
              </div>

              {currentWord.memory_tip && (
                <div className="flex items-center gap-2 text-purple-400">
                  <Brain size={14} />
                  <p className="text-[10px] font-bold">{currentWord.memory_tip}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* SRS Rating Controls */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4"
          >
            <Button 
              className="h-16 flex flex-col items-center justify-center gap-1 bg-red-50 text-red-600 border-2 border-red-100 hover:bg-red-100 rounded-3xl"
              onPress={() => handleRating(1)}
            >
              <span className="font-black text-lg leading-none">Again</span>
              <span className="text-[9px] font-bold opacity-70">完全忘記</span>
            </Button>
            
            <Button 
              className="h-16 flex flex-col items-center justify-center gap-1 bg-orange-50 text-orange-600 border-2 border-orange-100 hover:bg-orange-100 rounded-3xl"
              onPress={() => handleRating(2)}
            >
              <span className="font-black text-lg leading-none">Hard</span>
              <span className="text-[9px] font-bold opacity-70">勉強想起</span>
            </Button>
            
            <Button 
              className="h-16 flex flex-col items-center justify-center gap-1 bg-green-50 text-green-600 border-2 border-green-100 hover:bg-green-100 rounded-3xl"
              onPress={() => handleRating(3)}
            >
              <span className="font-black text-lg leading-none">Good</span>
              <span className="text-[9px] font-bold opacity-70">正確記得</span>
            </Button>
            
            <Button 
              className="h-16 flex flex-col items-center justify-center gap-1 bg-blue-50 text-blue-600 border-2 border-blue-100 hover:bg-blue-100 rounded-3xl"
              onPress={() => handleRating(4)}
            >
              <span className="font-black text-lg leading-none">Easy</span>
              <span className="text-[9px] font-bold opacity-70">太簡單了</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFlipped && (
        <div className="text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest pt-4 animate-pulse">
            翻面後選擇難度評分，演算法將為您安排複習
        </div>
      )}
    </div>
  );
}

const Divider = ({ orientation, className }: { orientation: 'vertical' | 'horizontal', className?: string }) => (
    <div className={`${orientation === 'vertical' ? 'w-[1px] h-full' : 'h-[1px] w-full'} bg-gray-200 ${className}`} />
);
