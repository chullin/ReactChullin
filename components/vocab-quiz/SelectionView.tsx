'use client';

import { wordData, DifficultyCategory } from '@/data/wordData';
import { 
  Baby, 
  School, 
  BookOpen, 
  Trophy, 
  Briefcase, 
  TrendingUp, 
  Crown,
  Users,
  Utensils,
  Trees,
  MapPin,
  Activity,
  Sparkles,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Baby: Baby,
  School: School,
  BookOpen: BookOpen,
  Trophy: Trophy,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  Crown: Crown,
  Users: Users,
  Utensils: Utensils,
  Trees: Trees,
  MapPin: MapPin,
  Activity: Activity,
  Sparkles: Sparkles,
  Clock: Clock,
};

type SelectionViewProps = {
  onSelect: (category: DifficultyCategory) => void;
};

export default function SelectionView({ onSelect }: SelectionViewProps) {
  return (
    <div className="tw-text-center">
      <h1 className="tw-text-3xl tw-font-bold tw-mb-2">英文單字測驗</h1>
      <p className="tw-text-gray-500 tw-mb-8">請選擇難度開始挑戰！</p>
      
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
        {wordData.map((category, index) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BookOpen;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(category)}
              className="tw-flex tw-flex-col tw-items-center tw-p-6 tw-bg-white tw-border tw-border-gray-100 tw-rounded-2xl tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-text-left tw-w-full"
            >
              <div className={`tw-p-3 tw-rounded-xl tw-mb-4 ${category.color} tw-bg-opacity-10`}>
                <IconComponent className={`tw-w-8 tw-h-8 ${category.color.replace('tw-bg-', 'tw-text-')}`} />
              </div>
              <h3 className="tw-text-xl tw-font-bold tw-mb-2">{category.title}</h3>
              <p className="tw-text-sm tw-text-gray-500 tw-text-center">{category.description}</p>
              <div className="tw-mt-4 tw-px-3 tw-py-1 tw-bg-gray-100 tw-rounded-full tw-text-xs tw-text-gray-600">
                {category.words.length} 個單字
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
