'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  title?: string;
  lang?: string;
  language?: string; // For compatibility
}

const CodeBlock = ({ code, title, lang, language }: CodeBlockProps) => {
  const displayLang = lang || language || 'bash';
  return (
    <div className="rounded-2xl overflow-hidden my-8 shadow-2xl border border-gray-800/50 group">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-5 py-3 border-b border-white/5 transition-colors group-hover:bg-[#252525]">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-sm shadow-red-900/20" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-sm shadow-yellow-900/20" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-sm shadow-green-900/20" />
        </div>
        <div className="flex items-center gap-2">
           <span className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase">{title ?? displayLang}</span>
        </div>
      </div>
      <div className="bg-[#1e1e1e] overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={displayLang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.7',
            background: 'transparent',
            fontFamily: '"Fira Code", "Fira Mono", monospace',
          }}
          codeTagProps={{
            style: {
              background: 'transparent',
            }
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
