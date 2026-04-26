/**
 * 如何大量新增單字？
 * 1. 找到對應的難度物件 (例如 'elementary')。
 * 2. 在 'words' 陣列中貼入新單字物件：{ word: "英文", definition: "中文" }。
 * 3. 確保每個物件之間有逗號隔開。
 * 4. 存檔後重新整理網頁即可。
 */

import { elementaryAll1200 } from './elementary/elementaryAll1200';
import { toeic850Plus } from './toeic/toeic850Plus';

export type DifficultyLevel = 
  | 'elementary' 
  | 'junior' 
  | 'senior4500' 
  | 'senior7000' 
  | 'toeic_850_plus';

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
    ...elementaryAll1200
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
    ...toeic850Plus
  }
];
