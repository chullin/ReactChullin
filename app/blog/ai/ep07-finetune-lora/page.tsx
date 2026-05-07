import { Metadata } from 'next';
import PostContent from './PostContent';

export const metadata: Metadata = {
  title: 'LLM 微調技術詳解：Adapter, LoRA 與 QLoRA | 陳憲億 Joseph Chen',
  description: '由陳憲億（Joseph Chen）撰寫，深入淺出解析 PEFT 技術，包括 Adapter、LoRA 與 QLoRA 的原理與實作，教你如何在消費級 GPU 上微調大模型。',
  keywords: ['陳憲億', 'Joseph Chen', 'LLM', 'LoRA', 'QLoRA', 'PEFT', '微調', 'AI'],
  authors: [{ name: '陳憲億 Joseph Chen' }],
};

export default function Page() {
  return <PostContent />;
}
