'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Zap,
  BookOpen,
  FlaskConical,
  Terminal,
  Code2,
  MousePointerClick,
  Globe,
  BarChart3,
  Settings,
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

export default function WebDevEP26() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-green-800 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.26</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">React 實戰系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              React 測試實戰：<br />
              <span className="text-emerald-300">Vitest + Testing Library</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-2xl">
              unit test、user-event 互動、mock API、coverage — 讓你的元件可測試、可維護、讓 CI 不再擋你路
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 17 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Vitest · Testing Library · MSW</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Section 1: 為什麼要寫測試 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 1：為什麼要寫測試（以及為什麼大家都不寫）
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            先承認現實。大多數工程師不寫測試，因為三個非常合理的理由：
          </p>

          <Card className="mb-6 border border-red-200 bg-red-50">
            <CardBody className="p-6">
              <ol className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span><strong>感覺很費時間</strong> — 「我直接跑起來看一下不就好了？」</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span><strong>不知道要測什麼</strong> — 測元件的 className？還是測業務邏輯？邊界在哪？</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span><strong>測試本身很難維護</strong> — 改了一個 prop 名稱，20 個測試全部失敗</span>
                </li>
              </ol>
            </CardBody>
          </Card>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            這些都是真實的痛點，但有個更殘酷的真相：
            <strong className="text-slate-800"> 你其實每次改完 code 都在「手動測試」——只是你的手動測試每次都要重做一次。</strong>
          </p>

          <Card className="mb-6 border border-emerald-200 bg-emerald-50">
            <CardBody className="p-6">
              <p className="text-slate-700 text-lg font-medium mb-2">核心洞察</p>
              <p className="text-slate-600 leading-relaxed">
                寫測試是把「手動測試」的步驟自動化。你打開瀏覽器、點幾下、確認畫面——這些步驟可以寫成程式碼，
                讓電腦幫你每次 commit 前都執行一遍。
              </p>
            </CardBody>
          </Card>

          <p className="text-slate-600 text-lg mb-4 leading-relaxed">
            不寫測試的代價，在專案成長後才會真正浮現：
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-5">
                <AlertTriangle size={20} className="text-orange-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">蝴蝶效應</p>
                <p className="text-slate-600 text-sm">修了一個 bug，結果壞了三個功能。等 QA 或用戶回報才發現。</p>
              </CardBody>
            </Card>
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-5">
                <AlertTriangle size={20} className="text-orange-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">重構恐懼症</p>
                <p className="text-slate-600 text-sm">不敢重構，因為不知道會不會壞。技術債越堆越高。</p>
              </CardBody>
            </Card>
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-5">
                <AlertTriangle size={20} className="text-orange-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">新人地雷區</p>
                <p className="text-slate-600 text-sm">新人不敢改舊程式碼，只能用複製貼上繞過去。</p>
              </CardBody>
            </Card>
          </div>

          <p className="text-slate-600 leading-relaxed">
            有了測試之後，重構變得安全，新人可以放心修改，CI 自動幫你把關——這才是測試真正的價值。
          </p>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 2: 測試工具選擇 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 2：測試工具選擇
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            2026 年 React 測試的最佳組合，四個工具各司其職：
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-yellow-500" />
                  <p className="font-bold text-slate-800">Vitest</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  比 Jest 快 10x，零配置，原生 ESM 支援。Vite 生態系的測試框架，
                  在 Next.js 專案中也可以獨立使用。
                </p>
              </CardBody>
            </Card>
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical size={18} className="text-purple-500" />
                  <p className="font-bold text-slate-800">@testing-library/react</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  模擬用戶行為，不測實作細節。核心哲學：「像用戶一樣使用元件，而不是測試 state 的值」。
                </p>
              </CardBody>
            </Card>
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MousePointerClick size={18} className="text-green-500" />
                  <p className="font-bold text-slate-800">@testing-library/user-event</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  比 <code className="bg-slate-100 px-1 rounded text-xs">fireEvent</code> 更真實的事件模擬。
                  模擬完整的瀏覽器事件序列，包含 focus、keydown、input、keyup 等。
                </p>
              </CardBody>
            </Card>
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={18} className="text-cyan-500" />
                  <p className="font-bold text-slate-800">msw (Mock Service Worker)</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  攔截 fetch 請求，在 Node 環境中模擬 API。測試 API 整合，
                  不需要真實 server，也不需要 jest.mock。
                </p>
              </CardBody>
            </Card>
          </div>

          <p className="text-slate-700 font-semibold mb-3">安裝所有依賴：</p>
          <CodeBlock language="bash">
{` npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom msw `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">vitest.config.ts — 測試框架設定：</p>
          <CodeBlock language="typescript">
{` import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',     // 模擬瀏覽器 DOM 環境
    globals: true,            // 不需要手動 import describe/test/expect
    setupFiles: ['./src/test/setup.ts'],
  },
}); `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">src/test/setup.ts — 全域 setup：</p>
          <CodeBlock language="typescript">
{` import '@testing-library/jest-dom';
// 讓 expect() 可以使用 .toBeInTheDocument()、.toBeDisabled() 等 DOM matchers `}
</CodeBlock>

          <Card className="mt-6 border border-amber-200 bg-amber-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>為什麼不用 Jest？</strong> Vitest 和 Jest API 幾乎完全相同（所以遷移成本極低），
                但 Vitest 利用 Vite 的 HMR 機制，watch mode 下只重跑受影響的測試，
                大型專案中速度差異非常明顯。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 3: 第一個測試 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 3：第一個測試 — 渲染測試
            </h2>
          </div>

          <Card className="mb-6 border border-emerald-200 bg-emerald-50">
            <CardBody className="p-5">
              <p className="text-slate-700 font-semibold mb-1">Testing Library 的核心哲學</p>
              <p className="text-slate-600 leading-relaxed">
                像用戶一樣測試，而不是測試實作細節。
                不要測 state 的值、不要測 CSS class name——測「用戶看到什麼」、「用戶可以做什麼」。
              </p>
            </CardBody>
          </Card>

          <p className="text-slate-700 font-semibold mb-3">UserCard 元件與對應測試：</p>
          <CodeBlock language="tsx">
{` // components/UserCard.tsx
type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.isAdmin && <span>管理員</span>}
    </div>
  );
}

export default UserCard; `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">UserCard.test.tsx：</p>
          <CodeBlock language="tsx">
{` // components/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

const mockUser = {
  id: '1',
  name: 'Joseph Chen',
  email: 'joseph@example.com',
  isAdmin: false,
};

describe('UserCard', () => {
  test('顯示用戶名稱和 Email', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Joseph Chen')).toBeInTheDocument();
    expect(screen.getByText('joseph@example.com')).toBeInTheDocument();
  });

  test('管理員標籤只在 isAdmin 時顯示', () => {
    render(<UserCard user={{ ...mockUser, isAdmin: true }} />);
    expect(screen.getByText('管理員')).toBeInTheDocument();
  });

  test('非管理員不顯示管理員標籤', () => {
    render(<UserCard user={mockUser} />);
    // queryByText 找不到時回傳 null，不會拋錯
    expect(screen.queryByText('管理員')).not.toBeInTheDocument();
  });
}); `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-4 mt-8">常用 Query 速查表：</p>
          <Card className="border border-slate-200">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Query</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">用途</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">找不到時</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono text-emerald-700 bg-emerald-50">getBy*</td>
                      <td className="px-4 py-3 text-slate-600">找單一元素（確定存在）</td>
                      <td className="px-4 py-3 text-red-600">拋出錯誤</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono text-blue-700 bg-blue-50">queryBy*</td>
                      <td className="px-4 py-3 text-slate-600">找單一元素（可能不存在）</td>
                      <td className="px-4 py-3 text-slate-500">回傳 null</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono text-purple-700 bg-purple-50">findBy*</td>
                      <td className="px-4 py-3 text-slate-600">等待非同步出現</td>
                      <td className="px-4 py-3 text-red-600">拋出錯誤</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-orange-700 bg-orange-50">getAllBy*</td>
                      <td className="px-4 py-3 text-slate-600">找多個元素</td>
                      <td className="px-4 py-3 text-red-600">拋出錯誤</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <p className="text-slate-600 mt-4 text-sm leading-relaxed">
            常見搭配：<code className="bg-slate-100 px-1 rounded">getByText</code>、
            <code className="bg-slate-100 px-1 rounded">getByRole</code>、
            <code className="bg-slate-100 px-1 rounded">getByPlaceholderText</code>、
            <code className="bg-slate-100 px-1 rounded">getByTestId</code>。
            優先使用 <code className="bg-slate-100 px-1 rounded">getByRole</code>，最接近無障礙語義。
          </p>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 4: 互動測試 userEvent */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <MousePointerClick size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 4：互動測試 — userEvent
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            <code className="bg-slate-100 px-2 py-0.5 rounded">userEvent</code> 比
            <code className="bg-slate-100 px-2 py-0.5 rounded">fireEvent</code> 更真實：
            它會觸發完整的事件序列（hover → focus → keydown → input → keyup → blur），
            更貼近真實瀏覽器行為，也更容易發現潛在問題。
          </p>

          <p className="text-slate-700 font-semibold mb-3">Counter 元件與互動測試：</p>
          <CodeBlock language="tsx">
{` // components/Counter.tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)} disabled={count === 0}>
        -1
      </button>
    </div>
  );
}

export default Counter; `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">Counter.test.tsx — 點擊與狀態驗證：</p>
          <CodeBlock language="tsx">
{` // components/Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('點擊 +1 按鈕增加計數', async () => {
    // 必須呼叫 userEvent.setup() 初始化
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText('+1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await user.click(screen.getByText('+1'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  test('count 為 0 時 -1 按鈕 disabled', () => {
    render(<Counter />);
    // 不需要互動，直接驗證初始狀態
    expect(screen.getByText('-1')).toBeDisabled();
  });

  test('點擊一次 +1 後 -1 按鈕解除 disabled', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText('+1'));
    expect(screen.getByText('-1')).not.toBeDisabled();
  });
}); `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">表單輸入測試 — user.type() 模擬鍵盤輸入：</p>
          <CodeBlock language="tsx">
{` // components/LoginForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('輸入資料並送出表單', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // user.type 模擬逐鍵輸入（包含 focus、keystroke 事件）
    await user.type(
      screen.getByPlaceholderText('Email'),
      'test@example.com'
    );
    await user.type(
      screen.getByPlaceholderText('密碼'),
      'password123'
    );

    // 使用 getByRole 找按鈕，更接近無障礙語義
    await user.click(screen.getByRole('button', { name: '登入' }));

    expect(screen.getByText('登入成功')).toBeInTheDocument();
  });

  test('密碼不足 8 字元顯示錯誤提示', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('密碼'), '123');
    await user.click(screen.getByRole('button', { name: '登入' }));

    expect(screen.getByText('密碼至少需要 8 個字元')).toBeInTheDocument();
  });

  test('清除輸入框', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');

    // 清除再重新輸入
    await user.clear(emailInput);
    await user.type(emailInput, 'new@example.com');

    expect(emailInput).toHaveValue('new@example.com');
  });
}); `}
</CodeBlock>

          <Card className="mt-6 border border-violet-200 bg-violet-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>userEvent vs fireEvent：</strong> 如果你用 <code className="bg-slate-200 px-1 rounded text-xs">fireEvent.click()</code>，
                它只觸發 click 事件。真實的點擊還包含 pointerover、pointerenter、mouseover、mouseenter、
                pointermove、mousemove、pointerdown、mousedown、focus、pointerup、mouseup、click。
                userEvent 會完整模擬這個序列，讓測試更可靠。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 5: Mock API - msw */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 5：Mock API — msw
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            測試「有 API 請求的元件」是最常見的需求。msw 的做法不是 mock 函數，
            而是在 Node 層攔截真實的 fetch 請求，讓元件完全不需要知道自己在被測試。
          </p>

          <p className="text-slate-700 font-semibold mb-3">src/test/handlers.ts — 定義 API mock：</p>
          <CodeBlock language="typescript">
{` // src/test/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /api/users — 回傳用戶列表
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Joseph Chen' },
      { id: '2', name: 'Jane Doe' },
    ]);
  }),

  // POST /api/login — 模擬登入，支援成功與失敗情境
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json() as {
      email: string;
      password: string;
    };

    if (password === 'wrong') {
      return HttpResponse.json(
        { error: '密碼錯誤' },
        { status: 401 }
      );
    }

    return HttpResponse.json({ token: 'fake-jwt-token' });
  }),

  // DELETE /api/users/:id
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ deleted: id });
  }),
]; `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">src/test/setup.ts — 啟動 msw server：</p>
          <CodeBlock language="typescript">
{` // src/test/setup.ts
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 在 Node 環境啟動 msw（不是 Service Worker 模式）
const server = setupServer(...handlers);

// 每個測試檔執行前啟動 server
beforeAll(() => server.listen());

// 每個 test 後重置 handler（避免測試間互相影響）
afterEach(() => server.resetHandlers());

// 所有測試結束後關閉 server
afterAll(() => server.close());

export { server }; `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">UserList.test.tsx — 測試 API 呼叫：</p>
          <CodeBlock language="typescript">
{` // components/UserList.test.tsx
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../test/setup';
import UserList from './UserList';

describe('UserList', () => {
  test('成功載入並顯示用戶列表', async () => {
    render(<UserList />);

    // 剛渲染時顯示 loading 狀態
    expect(screen.getByText('載入中...')).toBeInTheDocument();

    // findBy* 會等待非同步資料出現（預設超時 1000ms）
    const josephElement = await screen.findByText('Joseph Chen');
    expect(josephElement).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('API 失敗時顯示錯誤訊息', async () => {
    // 在這個 test 中暫時覆蓋 handler
    // afterEach 會自動還原，不影響其他測試
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json(
          { error: 'Server Error' },
          { status: 500 }
        );
      })
    );

    render(<UserList />);
    expect(await screen.findByText('載入失敗，請重試')).toBeInTheDocument();
  });

  test('點擊刪除後用戶從列表消失', async () => {
    const user = userEvent.setup();
    render(<UserList />);

    await screen.findByText('Joseph Chen');

    // 找到對應的刪除按鈕並點擊
    const deleteButtons = screen.getAllByRole('button', { name: '刪除' });
    await user.click(deleteButtons[0]);

    // 刪除後 Joseph Chen 應該消失
    expect(screen.queryByText('Joseph Chen')).not.toBeInTheDocument();
  });
}); `}
</CodeBlock>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 6: Custom Hook 測試 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 6：Custom Hook 的測試
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Hook 不能直接呼叫，需要用
            <code className="bg-slate-100 px-2 py-0.5 rounded mx-1">renderHook</code>
            包裝在一個虛擬元件中執行。
            修改 Hook 狀態的操作需要用
            <code className="bg-slate-100 px-2 py-0.5 rounded mx-1">act()</code>
            包裝，確保 React 的 re-render 完成後再驗證結果。
          </p>

          <p className="text-slate-700 font-semibold mb-3">useCounter Hook 測試：</p>
          <CodeBlock language="typescript">
{` // hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter 初始值為 0', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('increment 增加計數', () => {
  const { result } = renderHook(() => useCounter());

  // 修改 hook 狀態必須用 act 包裝
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('decrement 不低於 0', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);
});

test('reset 回到初始值', () => {
  const { result } = renderHook(() => useCounter(10));

  act(() => {
    result.current.increment();
    result.current.increment();
  });

  expect(result.current.count).toBe(12);

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
}); `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">useLocalStorage Hook 測試 — 需要 mock localStorage：</p>
          <CodeBlock language="typescript">
{` // hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

// 每個測試前清空 localStorage
beforeEach(() => {
  localStorage.clear();
});

test('useLocalStorage 無預存值時使用 defaultValue', () => {
  const { result } = renderHook(() => useLocalStorage('theme', 'light'));
  expect(result.current[0]).toBe('light');
});

test('useLocalStorage 從 localStorage 讀取已存在的值', () => {
  // 先設定初始值（注意：值需要是 JSON 字串）
  localStorage.setItem('theme', JSON.stringify('dark'));

  const { result } = renderHook(() => useLocalStorage('theme', 'light'));
  expect(result.current[0]).toBe('dark');
});

test('setValue 更新值並同步到 localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('lang', 'zh'));

  act(() => {
    result.current[1]('en');
  });

  expect(result.current[0]).toBe('en');
  expect(JSON.parse(localStorage.getItem('lang')!)).toBe('en');
});

test('帶有 initializer 的 hook 應傳入初始值', () => {
  const { result } = renderHook(() => useCounter(5));
  expect(result.current.count).toBe(5);
}); `}
</CodeBlock>

          <Card className="mt-6 border border-teal-200 bg-teal-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>什麼時候用 renderHook vs render？</strong>{' '}
                如果 Hook 的邏輯可以獨立測試（不依賴 UI），用 <code className="bg-slate-200 px-1 rounded text-xs">renderHook</code>。
                如果你想測試「Hook 和 UI 的整合行為」，直接 <code className="bg-slate-200 px-1 rounded text-xs">render</code>
                一個使用該 Hook 的元件就好。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 7: Coverage 與 CI */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 7：Coverage 與 CI 整合
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Coverage 報告告訴你哪些程式碼「被測試跑到過」。
            它是輔助工具，不是目標——100% coverage 不等於沒有 bug。
          </p>

          <p className="text-slate-700 font-semibold mb-3">常用指令：</p>
          <CodeBlock language="bash">
{` # 啟動 watch mode（開發時使用）
npx vitest

# 執行一次並產生 coverage 報告（需要安裝 @vitest/coverage-v8）
npx vitest --coverage

# CI 模式：執行一次，不進 watch mode，失敗時回傳非零 exit code
npx vitest run

# 只跑符合條件的測試
npx vitest run --reporter=verbose UserCard `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">package.json scripts 建議配置：</p>
          <CodeBlock language="json">
{` {
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
} `}
</CodeBlock>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-5 text-center">
                <p className="text-3xl font-black text-red-500 mb-1">&lt; 60%</p>
                <p className="font-semibold text-slate-700 mb-1">危險</p>
                <p className="text-slate-600 text-sm">核心業務邏輯可能完全沒有測試保護</p>
              </CardBody>
            </Card>
            <Card className="border border-emerald-200 bg-emerald-50">
              <CardBody className="p-5 text-center">
                <p className="text-3xl font-black text-emerald-600 mb-1">80%</p>
                <p className="font-semibold text-slate-700 mb-1">合理目標</p>
                <p className="text-slate-600 text-sm">重要路徑有測試，非核心 UI 可以跳過</p>
              </CardBody>
            </Card>
            <Card className="border border-amber-200 bg-amber-50">
              <CardBody className="p-5 text-center">
                <p className="text-3xl font-black text-amber-600 mb-1">100%</p>
                <p className="font-semibold text-slate-700 mb-1">不是目標</p>
                <p className="text-slate-600 text-sm">維護成本可能超過帶來的安全感</p>
              </CardBody>
            </Card>
          </div>

          <Card className="mb-6 border border-slate-200 bg-slate-50">
            <CardBody className="p-5">
              <p className="font-semibold text-slate-800 mb-3">Coverage 的優先順序</p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span><strong>一定要測：</strong>業務邏輯（計算、驗證、狀態機）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span><strong>一定要測：</strong>邊界條件（空值、最大值、異常輸入）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span><strong>一定要測：</strong>錯誤處理路徑（API 失敗、網路斷線）</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                  <span><strong>可以跳過：</strong>純展示元件、第三方函式庫的行為</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-slate-700 font-semibold mb-3">GitHub Actions CI 整合 — 只需加 3 行：</p>
          <CodeBlock language="yaml">
{` # .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      # 加入這三行，測試失敗時 CI 自動擋住 merge
      - name: Run tests
        run: npm run test:run

      # 選配：上傳 coverage 報告到 Codecov
      - name: Upload coverage
        uses: codecov/codecov-action@v4 `}
</CodeBlock>

          <Card className="mt-6 border border-emerald-200 bg-emerald-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>CI 的真正價值：</strong>
                不是「測試本身」，而是「強制執行」。
                沒有 CI，測試可以被跳過；有了 CI，每個 PR 在 merge 前都必須通過測試。
                這是讓測試文化在團隊中落地的關鍵機制。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Tags */}
        <motion.div {...fadeInUp}>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {['Vitest', 'Testing Library', 'MSW', 'Unit Test', 'React Testing', 'CI/CD'].map(tag => (
              <Chip key={tag} size="sm" variant="flat" className="bg-emerald-100 text-emerald-800">
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* Navigation */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep25-usereducer">
              <Card className="border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-semibold text-slate-800">EP.25 useReducer</p>
                  <p className="text-slate-500 text-sm mt-1">管理複雜狀態的正確方式</p>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep01-modern-web">
              <Card className="border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2 justify-end">
                    <span>系列完整循環</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-semibold text-slate-800 text-right">EP.01 現代網頁開發</p>
                  <p className="text-slate-500 text-sm mt-1 text-right">從這裡重新開始</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
