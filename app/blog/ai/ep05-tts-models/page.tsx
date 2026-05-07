import { Metadata } from 'next';
import PostContent from './PostContent';

export const metadata: Metadata = {
  title: '聲碼器演進與端到端 TTS：從 WaveNet 到 VITS | 陳憲億 Joseph Chen',
  description: '陳憲億（Joseph Chen）深入分析 Tacotron2、FastSpeech2、WaveNet、HiFi-GAN、VITS 五大模型的核心設計邏輯，探討 TTS 如何走向端到端架構。',
  keywords: ['陳憲億', 'Joseph Chen', 'TTS', '聲碼器', 'Vocoder', 'VITS', 'AI 語音'],
  authors: [{ name: '陳憲億 Joseph Chen' }],
};

export default function Page() {
  return <PostContent />;
}
