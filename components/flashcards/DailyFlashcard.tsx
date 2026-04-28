'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Settings2, 
  CheckCircle2, 
  Volume2,
  RotateCcw,
  Trophy,
  Target,
  Hash,
  Sparkles,
  Book,
  Brain,
  Quote,
  Layers,
  Mic2
} from 'lucide-react';
import { DifficultyCategory } from '@/data/wordData';
import { getPinyin } from '@/utils/pinyinUtils';
import { 
  getStarredWords, 
  toggleStarredWord, 
  getDailySettings,
  updateDailySettings,
  getDailyProgress,
  updateDailyProgress
} from '@/utils/vocabStorage';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Progress, 
  Chip, 
  Divider, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure,
  Slider
} from '@heroui/react';

interface DailyFlashcardProps {
  category: DifficultyCategory;
  onBack: () => void;
}

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

export default function DailyFlashcard({ category, onBack }: DailyFlashcardProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [starredWords, setStarredWords] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(10);
  const [completedToday, setCompletedToday] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setStarredWords(getStarredWords());
    const progress = getDailyProgress(category.id);
    const settings = getDailySettings();
    setDailyGoal(settings.wordsPerDay);
    setCurrentIndex(progress.currentIndex);
    setCompletedToday(progress.completedToday);
    setMounted(true);
  }, [category.id]);

  const currentWord = category.words[currentIndex % category.words.length];
  const isStarred = starredWords.includes(currentWord?.word || '');
  const reachedDailyGoal = completedToday >= dailyGoal && dailyGoal > 0;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const nextIdx = (currentIndex + 1) % category.words.length;
      setCurrentIndex(nextIdx);
      if (typeof window !== 'undefined') {
        const p = getDailyProgress(category.id);
        if (p.completedToday < dailyGoal || dailyGoal === 0) {
          updateDailyProgress(category.id, 1);
          setCompletedToday(p.completedToday + 1);
        } else {
            updateDailyProgress(category.id, 1);
        }
      }
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const prevIdx = (currentIndex - 1 + category.words.length) % category.words.length;
      setCurrentIndex(prevIdx);
    }, 150);
  };

  const handleToggleStar = (e: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    const currentlyStarred = toggleStarredWord(currentWord.word);
    setStarredWords(currentlyStarred ? [...starredWords, currentWord.word] : starredWords.filter(w => w !== currentWord.word));
  };

  const speak = useCallback((e: any, text: string, isChinese: boolean = false) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isChinese ? 'zh-TW' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  if (!mounted || !currentWord) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-4 flex-1">
          <Button
            variant="light"
            color="default"
            onPress={onBack}
            startContent={<ArrowLeft size={18} />}
            className="font-bold text-gray-500 hover:text-primary transition-colors px-0"
          >
            返回選擇等級
          </Button>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <Target className="text-primary" size={20} />
                <h3 className="font-black text-gray-900 leading-none">今日學習目標</h3>
              </div>
              <p className="text-xs font-black text-gray-400 tracking-widest uppercase">
                {completedToday} / {dailyGoal || '∞'} 字
              </p>
            </div>
            <Progress 
              value={(completedToday / dailyGoal) * 100} 
              color={reachedDailyGoal ? "success" : "primary"}
              className="h-3 shadow-inner bg-gray-100"
              radius="full"
              isStriped
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="flat"
            onPress={onOpen}
            radius="full"
            className="bg-white shadow-sm border border-gray-100 hover:bg-gray-50 w-12 h-12"
          >
            <Settings2 size={24} className="text-gray-400" />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {reachedDailyGoal && dailyGoal > 0 && completedToday === dailyGoal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="px-2"
          >
            <Card className="bg-success-50 border-2 border-success-200 shadow-none">
              <CardBody className="p-4 flex flex-row items-center gap-4 text-success-800">
                <div className="bg-success text-white p-2 rounded-xl">
                  <Trophy size={20} />
                </div>
                <p className="font-black text-sm">
                  達標啦！您已完成今天的單字進度！可以選擇休息或是繼續往下背。
                </p>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Flashcard Container */}
      <div className="relative w-full h-[500px] perspective-[1500px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Front (English) */}
          <Card className="absolute w-full h-full backface-hidden border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white rounded-[40px] overflow-hidden">
            <CardBody className="p-10 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-start">
                <div className="bg-blue-50 text-blue-500 font-black px-4 py-2 rounded-2xl text-sm border border-blue-100/50">
                   #{currentIndex + 1}
                </div>
                
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  onPress={handleToggleStar}
                  className="group/star"
                >
                  <Star 
                    className={`w-10 h-10 transition-all duration-300 ${isStarred ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-100 group-hover/star:text-gray-300'}`} 
                  />
                </Button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full">
                <div className="text-center space-y-4">
                  <div className="flex flex-col items-center gap-3">
                    {currentWord.pos && (
                      <div className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-gray-200">
                        {currentWord.pos}
                      </div>
                    )}
                    <motion.h2 
                      layoutId={`word-${currentWord.word}`}
                      className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter"
                    >
                      {currentWord.word}
                    </motion.h2>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-2xl text-blue-400 font-bold italic tracking-wide">
                      {currentWord.phonetic || getPhonetic(currentWord.word)}
                    </p>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      radius="full"
                      onPress={(e) => speak(e, currentWord.word)}
                      className="text-blue-200 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Volume2 size={20} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-6 pb-4">
                <div className="flex items-center gap-3 text-gray-200 font-black text-[10px] uppercase tracking-[0.3em] bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100/50">
                  <RotateCcw size={12} className="animate-spin-slow" />
                  Tap to Reveal
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Back (Chinese) */}
          <Card 
            className="absolute w-full h-full backface-hidden border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white rounded-[40px] overflow-hidden" 
            style={{ transform: 'rotateY(180deg)' }}
          >
            <CardBody className="p-10 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-start">
                <Chip variant="flat" color="secondary" className="font-black px-4 h-9 border border-purple-100/50" size="md">解答 Answer</Chip>
                
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  onPress={handleToggleStar}
                >
                  <Star className={`w-8 h-8 ${isStarred ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-100'}`} />
                </Button>
              </div>

              <div className="w-full flex flex-col items-center justify-center flex-1 space-y-8 py-6">
                <div className="text-center space-y-3">
                  <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
                    {currentWord.definition}
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-xl text-gray-400 font-bold">
                      {getPinyin(currentWord.definition) || '...'}
                    </p>
                    {currentWord.homophonic && (
                      <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-black border border-amber-100">
                        諧音: {currentWord.homophonic}
                      </div>
                    )}
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      radius="full"
                      onPress={(e) => speak(e, currentWord.definition, true)}
                      className="text-purple-200 hover:text-purple-500 hover:bg-purple-50 transition-colors"
                    >
                      <Volume2 size={20} />
                    </Button>
                  </div>
                </div>

                {/* Info Grid - Modern Stacked Layout */}
                <div className="w-full max-w-lg space-y-4 px-4">
                  {currentWord.sentence && (
                    <div className="bg-blue-50/30 p-5 rounded-[2rem] border border-blue-100/50 space-y-2 group/sentence hover:bg-blue-50/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500 text-white p-1.5 rounded-lg">
                          <Quote size={12} fill="currentColor" />
                        </div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Example Sentence</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed italic group-hover/sentence:text-blue-900 transition-colors">
                          "{currentWord.sentence}"
                        </p>
                        {currentWord.translate && (
                          <p className="text-xs md:text-sm font-bold text-gray-400 border-t border-blue-100/30 pt-2">
                            {currentWord.translate}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentWord.memory_tip && (
                      <div className="bg-purple-50/30 p-5 rounded-[2rem] border border-purple-100/50 space-y-2 hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-500 text-white p-1.5 rounded-lg">
                            <Brain size={12} />
                          </div>
                          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Memory Tip</p>
                        </div>
                        <p className="text-xs font-bold text-purple-900 leading-relaxed">
                          {currentWord.memory_tip}
                        </p>
                      </div>
                    )}

                    {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                      <div className="bg-emerald-50/30 p-5 rounded-[2rem] border border-emerald-100/50 space-y-2 hover:bg-emerald-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-500 text-white p-1.5 rounded-lg">
                            <Layers size={12} />
                          </div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Synonyms</p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {currentWord.synonyms.map(syn => (
                            <span key={syn} className="px-2 py-0.5 bg-white border border-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black shadow-sm">
                              {syn}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-4 pb-4">
                <div className="flex items-center gap-3 text-gray-200 font-black text-[10px] uppercase tracking-[0.3em] bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100/50">
                  <RotateCcw size={12} className="animate-spin-slow" />
                  Tap to Flip
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6">
        <Button
          isIconOnly
          size="lg"
          variant="flat"
          radius="full"
          isDisabled={currentIndex === 0}
          onPress={handlePrev}
          className="w-16 h-16 bg-white border border-gray-100 shadow-sm"
        >
          <ArrowLeft size={28} className={currentIndex === 0 ? 'text-gray-200' : 'text-gray-400'} />
        </Button>
        
        <Button
          color="primary"
          size="lg"
          radius="full"
          onPress={handleNext}
          className="px-12 py-8 text-2xl font-black shadow-xl shadow-blue-500/20"
          endContent={<ArrowRight size={28} />}
        >
          下一個
        </Button>
      </div>

      {/* Settings Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-blur-md",
          base: "border-[#292f46] bg-white text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-900 font-black">每日學習設定</ModalHeader>
              <ModalBody className="py-10">
                <div className="space-y-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-yellow-500" size={18} />
                        <span className="text-sm font-black text-gray-600">每日單字目標</span>
                      </div>
                      <Chip color="primary" variant="flat" className="font-black">{dailyGoal} 字</Chip>
                    </div>
                    
                    <Slider 
                      step={5} 
                      maxValue={100} 
                      minValue={5} 
                      value={dailyGoal}
                      onChange={(val) => {
                        setDailyGoal(val as number);
                        updateDailySettings({ wordsPerDay: val as number });
                      }}
                      color="primary"
                      size="lg"
                      showSteps={true}
                      marks={[
                        { value: 10, label: "10" },
                        { value: 20, label: "20" },
                        { value: 50, label: "50" },
                        { value: 100, label: "100" },
                      ]}
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-[2rem] space-y-2">
                    <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Progress Data</p>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-bold text-blue-900">今日已完成</span>
                       <span className="text-xl font-black text-blue-600">{completedToday} 字</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="font-black w-full" onPress={onClose}>
                   確認並儲存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
