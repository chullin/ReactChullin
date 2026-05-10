'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Wifi,
  WifiOff,
  Bell,
  Download,
  Shield,
  Layers,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function WebDevEP33() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-teal-700 via-emerald-700 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.33</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Progressive Web App（PWA）<br />
              <span className="text-emerald-200">完整指南</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              Service Worker、Web App Manifest、Push Notification、Offline First — 讓網頁擁有原生 App 的體驗
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> PWA · Service Worker · Manifest · Offline</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：什麼是 PWA ───────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Globe className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：什麼是 PWA，為什麼要學？
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Progressive Web App（PWA）是一套讓網頁具備原生 App 體驗的技術標準，由 Google 在 2016 年提出。它不是一個框架，而是一系列 Web 標準的組合：Service Worker、Web App Manifest、Cache API、Push API 等。核心概念是「漸進增強」——在支援的瀏覽器中提供完整體驗，在不支援的環境中仍能正常運作。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    title: 'Reliable（可靠）',
                    desc: '離線可用。透過 Service Worker + Cache API，即使在網路不穩或完全離線的情況下，核心功能仍能運作。用戶不會看到瀏覽器的「無法連線」恐龍頁面。',
                    icon: '🛡️',
                    color: 'teal',
                  },
                  {
                    title: 'Fast（快速）',
                    desc: '快速載入。預先快取關鍵資源（CSS、字體、核心 JS），讓回訪者幾乎瞬間看到頁面。即使在 3G 網路下，體驗也遠優於傳統網頁。',
                    icon: '⚡',
                    color: 'emerald',
                  },
                  {
                    title: 'Engaging（吸引人）',
                    desc: '可安裝到主畫面 + Push Notification。用戶可以像使用 App 一樣使用你的網站，沒有瀏覽器的網址列干擾，還能接收即時推播通知。',
                    icon: '📲',
                    color: 'green',
                  },
                ].map(({ title, desc, icon, color }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{icon}</span>
                      <p className={`font-bold text-${color}-800 text-sm`}>{title}</p>
                    </div>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-4">Web vs Native App 的差距正在快速縮小</h3>

              <div className="space-y-3 mb-6">
                {[
                  { year: '2016', event: 'PWA 概念提出，Service Worker 規範在 Chrome 首先實作' },
                  { year: '2018', event: 'iOS 11.3 開始支援 Service Worker，PWA 終於可以跨平台' },
                  { year: '2021', event: 'Web Share API、File System Access API 讓網頁能做更多 Native 才能做的事' },
                  { year: '2023', event: 'Web Push API 全面支援（包含 iOS 16.4+），通知功能補齊最後一塊拼圖' },
                  { year: '2024', event: 'Project Fugu — Google 持續推進 Web 能力：藍牙、NFC、USB、攝影機控制等' },
                ].map(({ year, event }) => (
                  <div key={year} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">{year}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{event}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-emerald-800 text-sm font-medium mb-1">PWA 的真實商業效益</p>
                    <ul className="text-emerald-700 text-xs space-y-1 leading-relaxed">
                      <li>• Twitter Lite（PWA）：工作階段時間增加 65%、推文增加 75%、跳出率降低 20%</li>
                      <li>• Flipkart：App 安裝轉換率提升 70%，工作階段時長增加 3 倍</li>
                      <li>• Starbucks PWA：用戶訂單數量是 Native App 的 2 倍</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：Web App Manifest ──────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Smartphone className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：Web App Manifest — 讓網頁可安裝
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Web App Manifest 是一個 JSON 檔案，告訴瀏覽器你的網頁應該如何以「App 模式」呈現——包含名稱、圖示、啟動畫面顏色、顯示模式等。有了這個檔案，用戶才能將你的網站「加入主畫面」，讓它看起來和行為都像一個真正的 App。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">完整的 manifest.json</h3>
              <CodeBlock language="json">{`{
  "name": "My Awesome App",
  "short_name": "AwesomeApp",
  "description": "A Progressive Web App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}`}</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  {
                    field: 'display',
                    options: ['standalone — 全螢幕，無瀏覽器 UI（最像 Native App）', 'fullscreen — 完全全螢幕，連狀態列都隱藏', 'minimal-ui — 保留最少的瀏覽器 UI（返回鍵）', 'browser — 普通瀏覽器模式（等同沒有 PWA）'],
                    color: 'teal',
                  },
                  {
                    field: 'purpose（icon）',
                    options: ['any — 一般用途圖示', 'maskable — Android 可適應性圖示（會被裁切成圓形）', 'monochrome — 單色圖示，用於特殊情境', '建議：提供 "maskable any" 以兼顧所有場景'],
                    color: 'emerald',
                  },
                ].map(({ field, options, color }) => (
                  <div key={field} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`font-bold text-${color}-800 text-sm mb-2`}>{field} 選項說明</p>
                    <ul className={`text-${color}-700 text-xs space-y-1.5 leading-relaxed`}>
                      {options.map((opt) => (
                        <li key={opt}>• {opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">在 Next.js 中設定 Manifest</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Next.js 13+ 支援透過 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">app/manifest.ts</code> 以程式碼方式產生 manifest，或者使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">next-pwa</code> 套件自動處理整個 PWA 配置流程。
              </p>
              <CodeBlock language="typescript">{`// app/manifest.ts（Next.js 13+ 原生支援）
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My Awesome App',
    short_name: 'AwesomeApp',
    description: 'A Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">使用 next-pwa 套件（自動化方案）</h3>
              <CodeBlock language="javascript">{`// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // your next.js config
});`}</CodeBlock>

              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <p className="text-amber-800 text-sm leading-relaxed">
                    開發環境（development）中建議停用 PWA（<code className="bg-amber-100 px-1 rounded font-mono">disable: true</code>），否則 Service Worker 的快取行為會干擾開發時的即時更新，造成改了程式碼卻看不到變化的困惑。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：Service Worker 核心原理 ──────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：Service Worker 核心原理
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Service Worker 是 PWA 的核心技術，本質上是一個在瀏覽器背景執行的 JavaScript Worker，獨立於主執行緒之外。它充當瀏覽器與網路之間的代理人（Proxy），能夠攔截所有網路請求、管理快取、接收推播通知，甚至在沒有網路連線時繼續運作。
              </p>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mb-6 font-mono text-sm text-center">
                <p className="text-slate-400 mb-3 text-xs">Service Worker 的角色</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs">User Request</span>
                  <span className="text-slate-400">↓</span>
                  <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs">[Service Worker]</span>
                  <span className="text-slate-400 text-xs">← 可以攔截所有網路請求</span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                  <span className="text-slate-400">↓</span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                  <span className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs">Cache Storage</span>
                  <span className="text-slate-400">/</span>
                  <span className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs">Network</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { phase: 'Install 階段', desc: '第一次載入時觸發，預先快取靜態資源（CSS、字體、離線頁面）', color: 'blue' },
                  { phase: 'Activate 階段', desc: '舊版 Service Worker 被新版取代時觸發，用來清除舊快取', color: 'purple' },
                  { phase: 'Fetch 階段', desc: '每次網路請求都會觸發，這裡決定要用快取還是去網路取資料', color: 'emerald' },
                ].map(({ phase, desc, color }) => (
                  <div key={phase} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`font-bold text-${color}-800 text-sm mb-1`}>{phase}</p>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">Service Worker 完整生命週期實作</h3>
              <CodeBlock language="javascript">{`// public/sw.js

const CACHE_NAME = 'v1';
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/styles/main.css',
  '/fonts/inter.woff2',
];

// 1. Install 階段：預快取靜態資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // 立即激活新 SW
});

// 2. Activate 階段：清除舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim(); // 立即控制所有 clients
});

// 3. Fetch 階段：攔截請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Cache First 策略
        return cached;
      }

      return fetch(event.request).then((response) => {
        // 動態快取
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // 網路失敗，回傳 offline 頁面
        return caches.match('/offline.html');
      });
    })
  );
});`}</CodeBlock>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-blue-800 text-sm font-medium mb-1">為什麼要 response.clone()？</p>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      Response 是一個只能讀取一次的 Stream。如果你直接把 <code className="bg-blue-100 px-1 rounded font-mono">response</code> 存入快取再回傳，回傳的就是空的。<code className="bg-blue-100 px-1 rounded font-mono">response.clone()</code> 複製一份給快取存，原本的 <code className="bg-blue-100 px-1 rounded font-mono">response</code> 繼續回傳給瀏覽器。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：快取策略選擇 ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Layers className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：快取策略選擇
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Service Worker 的靈活之處在於你能根據不同的資源類型選擇最適合的快取策略。沒有萬能的策略——靜態資源、API 請求、動態內容各有最佳解。選錯策略可能讓用戶看到過期資料，或是失去離線能力。
              </p>

              <div className="space-y-6">
                {/* Cache First */}
                <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">Cache First</span>
                    <span className="text-green-700 text-xs">適合：字體、圖片、靜態 CSS/JS</span>
                  </div>
                  <p className="text-green-700 text-xs mb-3 leading-relaxed">
                    先查快取，有就直接回傳，沒有才去網路取。適合幾乎不會更新的資源，速度最快，但要注意快取失效策略，否則用戶可能永遠看到舊版資源。
                  </p>
                  <CodeBlock language="javascript">{`// 先查快取，沒有才去網路
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? fetch(request);
}`}</CodeBlock>
                </div>

                {/* Network First */}
                <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Network First</span>
                    <span className="text-blue-700 text-xs">適合：API 請求、即時資料</span>
                  </div>
                  <p className="text-blue-700 text-xs mb-3 leading-relaxed">
                    先去網路，成功則更新快取並回傳最新資料；失敗（離線）才用快取。確保資料即時性，但在網路不穩時可能較慢。
                  </p>
                  <CodeBlock language="javascript">{`// 先去網路，失敗才用快取
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}`}</CodeBlock>
                </div>

                {/* Stale While Revalidate */}
                <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded">Stale While Revalidate</span>
                    <span className="text-purple-700 text-xs">適合：新聞、部落格、頻繁更新但允許稍舊</span>
                  </div>
                  <p className="text-purple-700 text-xs mb-3 leading-relaxed">
                    立刻回傳快取（速度快），同時在背景更新快取。下次請求就能看到最新版本。這是「速度優先，允許一次稍舊」的最佳折衷方案。
                  </p>
                  <CodeBlock language="javascript">{`// 先用快取（快），同時後台更新
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    cache.put(request, response.clone());
    return response;
  });

  return cached ?? fetchPromise;
}`}</CodeBlock>
                </div>

                {/* Network Only */}
                <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded">Network Only</span>
                    <span className="text-orange-700 text-xs">適合：支付流程、表單送出、敏感操作</span>
                  </div>
                  <p className="text-orange-700 text-xs leading-relaxed">
                    完全不快取，每次都向網路請求。用於不能使用舊資料的場景：支付、轉帳、刪除資料等。如果沒有網路就讓請求失敗，配合 UI 提示用戶。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：Push Notification 實作 ───────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Bell className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：Push Notification 實作
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Web Push Notification 讓你在用戶沒有打開你的網站時，仍能傳送通知給他們——就像 Native App 一樣。這需要三個角色配合：用戶的瀏覽器、你的後端伺服器、以及瀏覽器廠商的 Push Service（如 Firebase Cloud Messaging）。
              </p>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 mb-6 font-mono text-xs text-slate-300">
                <p className="text-slate-400 mb-2 text-xs">Push Notification 流程</p>
                <p>1. 用戶在瀏覽器授權通知 → 取得 PushSubscription</p>
                <p>2. 前端將 PushSubscription 傳給你的後端儲存</p>
                <p>3. 後端透過 web-push 程式庫，呼叫瀏覽器廠商的 Push Server</p>
                <p>4. Push Server 將通知推送到用戶的瀏覽器</p>
                <p>5. 瀏覽器的 Service Worker 接收到 push 事件，顯示通知</p>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">前端：請求權限與訂閱</h3>
              <CodeBlock language="javascript">{`// 1. 請求通知權限
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// 2. 訂閱 Push Service
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true, // 必須要有可見通知（iOS 要求）
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
  });

  // 3. 傳送 subscription 到後端儲存
  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });

  return subscription;
}

// 4. Service Worker 接收推播
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    self.registration.showNotification(data.title ?? 'New Message', {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: { url: data.url },
      actions: [
        { action: 'open', title: '查看' },
        { action: 'dismiss', title: '關閉' },
      ],
    })
  );
});

// 5. 點擊通知
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">後端發送 Push（Next.js API Route）</h3>
              <CodeBlock language="typescript">{`// app/api/push/send/route.ts
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  const { subscription, title, body, url } = await request.json();

  await webpush.sendNotification(
    subscription,
    JSON.stringify({ title, body, url })
  );

  return Response.json({ success: true });
}`}</CodeBlock>

              <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-teal-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-teal-800 text-sm font-medium mb-1">VAPID 金鑰生成</p>
                    <p className="text-teal-700 text-xs leading-relaxed">
                      VAPID（Voluntary Application Server Identification）是 Web Push 的身份驗證機制。執行 <code className="bg-teal-100 px-1 rounded font-mono">npx web-push generate-vapid-keys</code> 一次性生成公私鑰對，公鑰放前端，私鑰只放後端環境變數。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：Offline-First UX ──────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <WifiOff className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：Offline-First 使用者體驗設計
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Offline-First 不只是技術實作，更是一種設計哲學：假設網路隨時可能中斷，在設計每個功能時就考慮離線狀態下的使用者體驗。優秀的 PWA 在離線時不只顯示錯誤訊息，而是繼續讓用戶完成工作，等到上線再自動同步。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">在 React 中偵測離線狀態</h3>
              <CodeBlock language="tsx">{`// hooks/useOnlineStatus.ts
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// components/OfflineBanner.tsx
export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black text-center py-2 text-sm font-medium">
      目前處於離線模式，部分功能可能無法使用
    </div>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Background Sync — 離線儲存，上線後自動同步</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Background Sync API 讓你能在網路中斷時，將用戶的操作（例如送出表單）先暫存在 IndexedDB，等到裝置重新連線後，Service Worker 會自動在背景完成這些操作——即使用戶已經關閉了頁面。
              </p>
              <CodeBlock language="javascript">{`// 在 fetch 失敗時，透過 Background Sync 排程
async function submitFormWithSync(formData) {
  try {
    return await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  } catch {
    // 儲存到 IndexedDB
    await saveToIndexedDB('pendingForms', formData);

    // 註冊 Background Sync
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('sync-forms');
  }
}

// Service Worker 中處理 sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncPendingForms());
  }
});`}</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  {
                    title: '離線 UX 原則',
                    items: [
                      '讓用戶知道目前處於離線狀態（顯示 Banner）',
                      '已載入的內容繼續可以瀏覽',
                      '用戶的操作不丟失（暫存 + 同步）',
                      '上線後給予成功/失敗的反饋',
                    ],
                    color: 'emerald',
                    icon: '✅',
                  },
                  {
                    title: '常見錯誤',
                    items: [
                      '離線時只顯示空白頁面或報錯',
                      '用戶不知道是否操作成功',
                      '快取了敏感的個人資料在裝置上',
                      '沒有提供「清除本機資料」的選項',
                    ],
                    color: 'red',
                    icon: '❌',
                  },
                ].map(({ title, items, color, icon }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`font-bold text-${color}-800 text-sm mb-3`}>{icon} {title}</p>
                    <ul className={`text-${color}-700 text-xs space-y-1.5 leading-relaxed`}>
                      {items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 7：Next.js PWA Checklist ────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Download className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 7：在 Next.js 中實作 PWA — 完整 Checklist
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">next-pwa</code> 搭配 Workbox 是目前在 Next.js 中實作 PWA 最常見的方案。Workbox 是 Google 出的 Service Worker 工具庫，封裝了各種快取策略，讓你不需要手寫複雜的 Service Worker 邏輯。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">完整 next-pwa + Workbox 配置</h3>
              <CodeBlock language="javascript">{`// next.config.mjs
import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\/api\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
      },
    },
  ],
});

export default config({
  // your Next.js config
});`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-4 mt-8">PWA 上線 Checklist</h3>

              <div className="space-y-3">
                {[
                  { item: 'manifest.json 正確填寫（name、short_name、icons、display）', ok: true },
                  { item: 'HTTPS 環境（Service Worker 只在安全環境運作，localhost 除外）', ok: true },
                  { item: '提供所有必要的 icon 尺寸（192×192、512×512）', ok: true },
                  { item: 'maskable icon 準備完畢（Android 適應性圖示，確保圓形裁切後不會裁到重要區域）', ok: true },
                  { item: 'offline.html fallback 頁面（網路完全中斷時顯示）', ok: true },
                  { item: 'Lighthouse PWA 稽核分數 ≥ 90（Chrome DevTools → Lighthouse → PWA）', ok: true },
                  { item: 'Service Worker 在 Chrome DevTools → Application → Service Workers 中正確顯示', ok: true },
                  { item: '測試「Airplane Mode」下的離線體驗', ok: true },
                  { item: 'iOS Safari 的特殊設定（apple-touch-icon、apple-mobile-web-app-capable）', ok: true },
                ].map(({ item, ok }) => (
                  <div key={item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className={`text-lg shrink-0 ${ok ? 'text-green-500' : 'text-gray-300'}`}>✅</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-700 text-sm font-medium mb-2">iOS 特殊配置（在 app/layout.tsx 的 head 中加入）</p>
                <CodeBlock language="html">{`<!-- iOS 主畫面圖示 -->
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

<!-- iOS Splash Screen（啟動畫面） -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="My App" />`}</CodeBlock>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['PWA', 'Service Worker', 'Manifest', 'Offline First', 'Push Notification', 'Cache API', 'Background Sync'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-emerald-100 text-emerald-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep32-web-performance">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-emerald-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-emerald-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.32 Web 效能優化</p>
                      <p className="text-xs text-gray-400">Core Web Vitals、Lighthouse 實戰</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep34-nextjs-middleware">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-emerald-400">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.34 Next.js Middleware</p>
                      <p className="text-xs text-gray-400">Edge Runtime、A/B Testing、Rate Limiting</p>
                    </div>
                    <ArrowRight className="text-emerald-500 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
