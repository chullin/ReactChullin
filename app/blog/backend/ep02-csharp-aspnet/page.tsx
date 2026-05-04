'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Server, Database, Globe, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const SectionHeader = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <h2 className="text-3xl font-black text-gray-900">{title}</h2>
  </div>
);

export default function BackendEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">後端語言系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              C# 與 ASP.NET 基礎<br />
              <span className="text-blue-200 text-3xl md:text-4xl">型別系統、LINQ 與 Web API 設計</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl font-medium">
              現代化企業開發的首選：從強型別語言特性，<br />
              到高性能 Web API 的建構藝術。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Server size={14} /> C# · ASP.NET Core</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「.NET 生態系在近年透過 .NET Core 完成了華麗轉身。它不僅效能極高，
                  且具備了現代後端開發所需的一切：依賴注入、Middleware、以及強大的 LINQ 查詢。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Type System */}
        <section>
          <SectionHeader icon={Layers} title="1. 強大且嚴謹的型別系統" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              面試必考：<strong>Value Types</strong> (值型別) 與 <strong>Reference Types</strong> (參考型別) 的差異。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-0 bg-blue-50">
                <CardBody className="p-6">
                  <p className="font-black text-blue-800 mb-2">Value Types</p>
                  <p className="text-sm text-blue-700">int, bool, struct。存放在 Stack。傳遞時是「複製值」。</p>
                </CardBody>
              </Card>
              <Card className="border-0 bg-indigo-50">
                <CardBody className="p-6">
                  <p className="font-black text-indigo-800 mb-2">Reference Types</p>
                  <p className="text-sm text-indigo-700">class, string, object。存放在 Heap。傳遞時是「複製位址」。</p>
                </CardBody>
              </Card>
            </div>
            <p className="text-gray-500 text-sm italic">
              💡 進階題：什麼是 Boxing 和 Unboxing？將值型別轉換為 object 稱為 Boxing，這會造成效能開銷。
            </p>
          </div>
        </section>

        {/* 2. LINQ */}
        <section>
          <SectionHeader icon={Database} title="2. LINQ：數據查詢的魔法" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Language Integrated Query (LINQ) 讓你可以用一種類似 SQL 的宣告式語法來操作集合資料。
            </p>
            <CodeBlock
              title="LINQ 示例"
              lang="csharp"
              code={`var activeUsers = users
    .Where(u => u.IsActive)
    .OrderBy(u => u.Name)
    .Select(u => new { u.Id, u.Name })
    .ToList();

// 這段代碼如果對應 Entity Framework，會被轉換為高效的 SQL。`}
            />
          </div>
        </section>

        {/* 3. ASP.NET Core Web API */}
        <section>
          <SectionHeader icon={Globe} title="3. ASP.NET Core Web API 設計" color="text-violet-600 bg-violet-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              現代 ASP.NET 開發核心環繞在三個關鍵字：<strong>Controller</strong>, <strong>Middleware</strong>, <strong>Dependency Injection</strong>。
            </p>
            
            <div className="space-y-4">
              <p className="font-bold text-gray-900">為什麼要用依賴注入 (DI)？</p>
              <p className="text-gray-600">
                DI 讓程式碼解耦，方便進行單元測試。在 .NET Core 中，這已經是內建且強制性的模式。
              </p>
              <CodeBlock
                title="Constructor Injection"
                lang="csharp"
                code={`public class UserController : ControllerBase {
    private readonly IUserService _userService;
    
    // 透過構造函數注入服務
    public UserController(IUserService userService) {
        _userService = userService;
    }
}`}
              />
            </div>
          </div>
        </section>

        {/* 面試題回顧 */}
        <section>
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              🚀 .NET 工程師面試常考
            </h2>
            <div className="space-y-6">
              {[
                { q: 'IEnumerable vs IQueryable？', a: 'IEnumerable 在記憶體中過濾 (適合 Linq to Object)；IQueryable 在資料庫中過濾 (適合 EF)。' },
                { q: '什麼是 Middleware？', a: '處理 HTTP 請求管道的組件，如：認證、紀錄、錯誤處理。' },
                { q: 'Task vs Thread？', a: 'Task 是抽象層，基於 Thread Pool，適合非同步操作 (Async/Await)；Thread 是底層作業系統資源。' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-black text-blue-200">Q: {item.q}</p>
                  <p className="text-white/90 font-medium">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/backend/ep01-c-basics" className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-slate-600 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-slate-800 transition-colors">EP.01 — C 語言面試必備</p>
            <p className="text-sm text-gray-500 mt-1">指標與記憶體管理</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.03 — Java Spring Boot</p>
            <p className="text-sm text-gray-400 mt-1">即將推出</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['C#', '.NET Core', 'ASP.NET', 'Web API', 'LINQ', 'Backend', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
