/**
 * 如何大量新增單字？
 * 1. 找到對應的難度物件 (例如 'elementary')。
 * 2. 在 'words' 陣列中貼入新單字物件：{ word: "英文", definition: "中文" }。
 * 3. 確保每個物件之間有逗號隔開。
 * 4. 存檔後重新整理網頁即可。
 */

import { elementaryPart1 } from './elementary/elementary1';
import { elementaryPart2 } from './elementary/elementary2';
import { elementaryPart3 } from './elementary/elementary3';
import { elementaryPart4 } from './elementary/elementary4';
import { elementaryPart5 } from './elementary/elementary5';
import { elementaryPart6 } from './elementary/elementary6';
import { elementaryPart7 } from './elementary/elementary7';
import { elementaryPart8 } from './elementary/elementary8';

export type DifficultyLevel = 
  | 'elementary' 
  | 'junior' 
  | 'senior4500' 
  | 'senior7000' 
  | 'toeic_brown' 
  | 'toeic_green' 
  | 'toeic_blue';

export interface Word {
  word: string;
  definition: string;
}

export interface DifficultyCategory {
  id: DifficultyLevel;
  title: string;
  description: string;
  icon: string;
  color: string;
  words: Word[];
}

export const wordData: DifficultyCategory[] = [
  {
    id: 'elementary',
    title: '簡單 (國小)',
    description: '基礎生活單字，適合初學者（含 800+ 單字）。',
    icon: 'Baby',
    color: 'tw-bg-blue-500',
    words: [
      ...elementaryPart1.words,
      ...elementaryPart2.words,
      ...elementaryPart3.words,
      ...elementaryPart4.words,
      ...elementaryPart5.words,
      ...elementaryPart6.words,
      ...elementaryPart7.words,
      ...elementaryPart8.words,
    ]
  },
  {
    id: 'junior',
    title: '中等 (國中)',
    description: '核心常用單字，涵蓋日常對話。',
    icon: 'School',
    color: 'tw-bg-green-500',
    words: [
      { word: "available", definition: "可用的" },
      { word: "believe", definition: "相信" },
      { word: "challenge", definition: "挑戰" },
      { word: "discover", definition: "發現" },
      { word: "excellent", definition: "優秀的" },
    ]
  },
  {
    id: 'senior4500',
    title: '高等 (高中 4500)',
    description: '升學必備單字，進階閱讀基礎。',
    icon: 'BookOpen',
    color: 'tw-bg-yellow-500',
    words: [
      { word: "abandon", definition: "放棄" },
      { word: "benefit", definition: "利益" },
      { word: "capacity", definition: "容量" },
      { word: "democracy", definition: "民主" },
      { word: "efficiency", definition: "效率" },
    ]
  },
  {
    id: 'senior7000',
    title: '特級 (高中 7000)',
    description: '高難度學術單字，挑戰滿分。',
    icon: 'Trophy',
    color: 'tw-bg-red-500',
    words: [
      { word: "ambiguous", definition: "含糊的" },
      { word: "benevolent", definition: "仁慈的" },
      { word: "catastrophe", definition: "大災難" },
      { word: "deteriorate", definition: "惡化" },
      { word: "eloquent", definition: "口才流利的" },
    ]
  },
  {
    id: 'toeic_brown',
    title: '多益-棕色 (456分)',
    description: '商務基本溝通，職場入門。',
    icon: 'Briefcase',
    color: 'tw-bg-[#a52a2a]',
    words: [
      { word: "appointment", definition: "預約" },
      { word: "confirm", definition: "確認" },
      { word: "delivery", definition: "遞送" },
      { word: "feedback", definition: "回饋" },
      { word: "invoice", definition: "發票" },
    ]
  },
  {
    id: 'toeic_green',
    title: '多益-綠色 (725分)',
    description: '流利職場交流，專業應對。',
    icon: 'TrendingUp',
    color: 'tw-bg-[#008000]',
    words: [
      { word: "agenda", definition: "議程" },
      { word: "budget", definition: "預算" },
      { word: "compliance", definition: "合規" },
      { word: "delegate", definition: "委派" },
      { word: "expansion", definition: "擴張" },
    ]
  },
  {
    id: 'toeic_blue',
    title: '多益-藍色 (855分)',
    description: '高階商務談判，卓越領導。',
    icon: 'Crown',
    color: 'tw-bg-[#0000ff]',
    words: [
      { word: "acquisition", definition: "收購" },
      { word: "benchmark", definition: "基準" },
      { word: "consolidate", definition: "鞏固" },
      { word: "dividend", definition: "股息" },
      { word: "innovation", definition: "創新" },
    ]
  }
];
