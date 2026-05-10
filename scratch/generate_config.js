const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync('scratch/blog_posts.json', 'utf-8'));

const seriesConfig = [
  {
    id: 'leetcode',
    label: 'LeetCode 系列',
    icon: 'Code2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    chipColor: 'primary',
    description: '從 HashMap 到 Bit Manipulation，22 個主題帶你系統性建立演算法思維。',
  },
  {
    id: 'web-dev',
    label: 'Web 開發系列',
    icon: 'Globe',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    chipColor: 'secondary',
    description: '從零建立 React + Next.js 作品集，到 Git、Docker、HTML/CSS 工程師必備工具。',
  },
  {
    id: 'js',
    label: 'JavaScript 系列',
    icon: 'Hash',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    chipColor: 'warning',
    description: 'Closure、Event Loop、Promise — JavaScript 面試最常考的核心概念深度解析。',
  },
  {
    id: 'network',
    label: '網路協定系列',
    icon: 'Globe',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    chipColor: 'primary',
    description: '從 TCP/IP 三向交握到 HTTP/3，深入理解現代網路傳輸的底層機制與安全防線。',
  },
  {
    id: 'devops',
    label: 'DevOps & 雲端系列',
    icon: 'RefreshCcw',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    chipColor: 'success',
    description: 'CI/CD、DevSecOps、基礎設施即程式碼 (IaC)，打造自動化且安全的開發流程。',
  },
  {
    id: 'system-design',
    label: '系統設計系列',
    icon: 'Layers',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    chipColor: 'danger',
    description: '高併發、負載平衡、快取策略、資料庫設計 — 打造可擴展的大型系統架構。',
  },
  {
    id: 'database',
    label: '資料庫系列',
    icon: 'Database',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: '從 SQL 優化、Index 原理到 NoSQL 與分散式事務，全面掌握資料儲存技術。',
  },
  {
    id: 'ai',
    label: 'AI 離線部署',
    icon: 'Bot',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    chipColor: 'secondary',
    description: '在隔離網路環境部署本地 LLM — Ollama、Dify、Transformer TTS 完整實戰。',
  },
  {
    id: 'embedded',
    label: '嵌入式與系統',
    icon: 'Cpu',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    chipColor: 'default',
    description: 'Linux、Shell Script、嵌入式通訊協定 — 軟體工程師必備的系統底層知識。',
  },
  {
    id: 'python',
    label: 'Python 系列',
    icon: 'Terminal',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    chipColor: 'success',
    description: 'OpenCV 自動化、PyTorch 入門、Tkinter GUI — Python 在工作中的實際應用。',
  },
  {
    id: 'lang',
    label: '後端語言',
    icon: 'Braces',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: 'C 語言與 C# / ASP.NET — 軟體工程師面試必備的後端語言核心概念。',
  },
  {
    id: 'general',
    label: '一般文章',
    icon: 'BookOpen',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    chipColor: 'default',
    description: '作品集建置心得、技術隨筆，以及那些不屬於任何系列卻值得記錄的事。',
  }
];

const results = seriesConfig.map(s => {
  const seriesPosts = posts
    .filter(p => p.seriesId === s.id)
    .sort((a, b) => {
      // Sort by EP number descending
      const epA = parseInt(a.ep.replace('EP.', '') || '0');
      const epB = parseInt(b.ep.replace('EP.', '') || '0');
      if (epA !== epB) return epB - epA;
      return a.title.localeCompare(b.title);
    })
    .map(p => ({
      title: p.title,
      subtitle: p.subtitle,
      date: p.date,
      author: 'Joseph Chen',
      href: p.href,
      isExternal: false,
      ep: p.ep || undefined
    }));

  return {
    ...s,
    posts: seriesPosts
  };
});

// Construct the TS file
let output = `import { Code2, Bot, Terminal, Globe, Hash, BookOpen, Cpu, Braces, RefreshCcw, Layers, Database } from 'lucide-react';

export type Post = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  href: string;
  isExternal: boolean;
  ep?: string;
};

export type Series = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  chipColor: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  description: string;
  posts: Post[];
  comingSoon?: string[];
};

export const series: Series[] = [
`;

results.forEach(s => {
  output += `  {
    id: '${s.id}',
    label: '${s.label}',
    icon: <${s.icon} size={22} />,
    color: '${s.color}',
    bgColor: '${s.bgColor}',
    chipColor: '${s.chipColor}',
    description: '${s.description.replace(/'/g, "\\'")}',
    posts: ${JSON.stringify(s.posts, null, 6).replace(/"([^"]+)":/g, '$1:')},
  },
`;
});

output += `];\n`;

fs.writeFileSync('config/blog.tsx', output);
