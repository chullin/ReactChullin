'use client';

import SitePageHeading from '@/components/SitePageHeading';
import FlashcardApp from '@/components/flashcards/FlashcardApp';
import { Sparkles, Target } from 'lucide-react';

export default function FlashcardsPage() {
  return (
    <div className="site-page">
      <div className="site-container space-y-10">
        <SitePageHeading
          eyebrow="Daily Learning"
          title="每日單字卡"
          description="設定您的每日目標，透過記憶卡翻板與發音系統，每天穩定且無壓力地累積單字量。"
        />

        <FlashcardApp />
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 py-8 text-gray-400">
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
