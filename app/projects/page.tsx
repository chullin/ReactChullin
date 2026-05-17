import { Metadata } from 'next';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: '專案作品 精選實戰 | 陳憲億 Joseph Chen',
  description: '陳憲億（Joseph Chen）的精選專案作品，涵蓋自動化測試系統、語音合成 (TTS) 與嵌入式系統實作、AI 溝通輔具 (Voice Conversion)、低功耗聲控裝置 (KWS/VAD) 與 IoT 應用，展現將複雜理論轉化為實際商用解決方案的開發能力。',
  keywords: [
    'Joseph Chen',
    '陳憲億',
    '專案作品',
    'Projects Portfolio',
    'Automated Testing',
    'Transformer TTS',
    'Voice Conversion',
    'VAD',
    'KWS',
    'LoRa',
    'Arduino',
    'Embedded Systems'
  ],
  alternates: {
    canonical: 'https://chullin.tw/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
