'use client';

import FlashcardApp from '@/components/flashcards/FlashcardApp';
import { 
  Chip, 
  Card, 
  CardBody 
} from '@heroui/react';
import { motion } from 'framer-motion';
import { Sparkles, Target } from 'lucide-react';

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Chip 
              variant="flat" 
              color="primary" 
              size="lg" 
              className="font-black uppercase tracking-widest px-6 mb-6"
              startContent={<Sparkles size={18} />}
            >
              Daily Learning
            </Chip>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-4">
              每日單字卡
            </h1>
            <p className="text-gray-500 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
              設定您的每日目標，透過記憶卡翻板與發音系統，每天穩定且無壓力地累積單字量。
            </p>
          </motion.div>
        </div>

        <FlashcardApp />
        
        <div className="flex justify-center gap-8 py-8 text-gray-400">
          <div className="flex items-center gap-2">
            <Target size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Spaced Repetition</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Pronunciation AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
