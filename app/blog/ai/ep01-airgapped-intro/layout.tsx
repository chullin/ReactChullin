import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 離線部署系列 EP.01：架構簡介與環境整備',
  description: '探討在無網路環境下（Air-gapped）部署 AI 模型的技術挑戰與解決方案。第一篇：基礎架構與硬體評估。',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep01-airgapped-intro',
  },
  openGraph: {
    title: 'AI 離線部署系列 EP.01：架構簡介與環境整備',
    description: '探討在無網路環境下（Air-gapped）部署 AI 模型的技術挑戰與解決方案。',
    type: 'article',
    publishedTime: '2024-03-20T00:00:00.000Z',
    authors: ['陳憲億 Joseph Chen'],
    images: ['/assets/blog/ai-ep01.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
