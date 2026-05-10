'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Layers,
  Zap
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DevOpsEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      <div className="bg-gradient-to-br from-orange-700 via-amber-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">工程品質與 DevOps</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              測試金字塔：Unit、Integration、E2E<br />
              <span className="text-amber-200">什麼值得測？怎麼測才有效？</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              「寫測試很浪費時間」是初階工程師的想法。
              「不寫測試才是最浪費時間的」是走過大型專案的工程師的體悟。
              這篇帶你建立正確的測試心態與實作技巧。
            </p>
            <div className="flex items-center gap-6 text-amber-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Jest · RTL · Playwright · TDD · Test Pyramid</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「沒有測試的程式碼不是完成了，只是還不知道哪裡壞了。
                    測試的真正價值不是驗證現在能跑，而是保證未來修改時不會悄悄壞掉。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    測試不是讓你的程式碼沒有 bug——而是讓你有勇氣重構、有信心部署。
                    這篇從測試金字塔出發，教你分辨哪些地方該寫什麼層次的測試，
                    以及如何用 Jest + React Testing Library 寫出真正有價值的測試。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 測試金字塔 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">測試金字塔：三層測試的職責分工</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            測試金字塔描述了三種測試的理想比例：下層數量多但快，上層數量少但真實。
            顛倒金字塔（只寫 E2E）是常見反模式——慢、不穩定、難以定位問題。
          </p>

          {/* Pyramid visual */}
          <div className="bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
            <div className="flex flex-col items-center gap-2">
              {[
                { label: 'E2E 測試', sub: 'Playwright / Cypress', count: '少量（~10%）', width: 'w-48', color: 'bg-red-400 text-white', desc: '模擬真實使用者操作，從瀏覽器到資料庫的完整流程' },
                { label: 'Integration 測試', sub: 'Jest + Supertest / MSW', count: '中量（~30%）', width: 'w-72', color: 'bg-orange-400 text-white', desc: '測試多個模組組合後的行為（API 路由、DB 查詢）' },
                { label: 'Unit 測試', sub: 'Jest + RTL', count: '大量（~60%）', width: 'w-full max-w-md', color: 'bg-amber-400 text-white', desc: '測試單一函數或組件的邏輯，完全隔離外部依賴' },
              ].map((item, i) => (
                <div key={i} className={`${item.width} flex flex-col items-center`}>
                  <div className={`w-full ${item.color} rounded-xl px-4 py-3 text-center`}>
                    <p className="font-black text-sm">{item.label}</p>
                    <p className="text-xs opacity-80">{item.sub}</p>
                    <p className="text-xs font-bold mt-1 opacity-70">{item.count}</p>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1.5 px-2">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { label: '速度', pyramid: '慢 ← → 快', color: 'text-blue-600' },
                { label: '維護成本', pyramid: '高 ← → 低', color: 'text-red-600' },
                { label: '錯誤定位', pyramid: '模糊 ← → 精確', color: 'text-green-600' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="font-black text-gray-600">{item.label}</p>
                  <p className={`${item.color} font-bold`}>{item.pyramid}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Unit Test */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Unit Test：測試最小可測單元</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Unit Test 針對單一函數或組件，<strong>隔離所有外部依賴</strong>（DB、API、時間）。
            執行快（毫秒級），失敗時能精確定位問題在哪行。
          </p>

          <CodeBlock
            title="純函數的 Unit Test（Jest）"
            lang="typescript"
            code={`// utils/price.ts
export function calculateDiscount(price: number, discountRate: number): number {
    if (discountRate < 0 || discountRate > 1) throw new Error('Invalid rate');
    return Math.round(price * (1 - discountRate));
}

// utils/price.test.ts
import { calculateDiscount } from './price';

describe('calculateDiscount', () => {
    test('正常折扣計算', () => {
        expect(calculateDiscount(1000, 0.1)).toBe(900);   // 9 折
        expect(calculateDiscount(999, 0.2)).toBe(799);    // 8 折（四捨五入）
    });

    test('零折扣（不打折）', () => {
        expect(calculateDiscount(500, 0)).toBe(500);
    });

    test('全額折扣', () => {
        expect(calculateDiscount(500, 1)).toBe(0);
    });

    test('無效折扣率應拋出錯誤', () => {
        expect(() => calculateDiscount(1000, -0.1)).toThrow('Invalid rate');
        expect(() => calculateDiscount(1000, 1.5)).toThrow('Invalid rate');
    });
});`}
          />

          <CodeBlock
            title="React 組件 Unit Test（React Testing Library）"
            lang="typescript"
            code={`// components/Button.tsx
interface ButtonProps { label: string; onClick: () => void; disabled?: boolean; }
export function Button({ label, onClick, disabled }: ButtonProps) {
    return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    test('顯示正確的文字', () => {
        render(<Button label="送出" onClick={() => {}} />);
        expect(screen.getByText('送出')).toBeInTheDocument();
    });

    test('點擊時呼叫 onClick', () => {
        const mockClick = jest.fn();
        render(<Button label="送出" onClick={mockClick} />);
        fireEvent.click(screen.getByText('送出'));
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    test('disabled 時不觸發 onClick', () => {
        const mockClick = jest.fn();
        render(<Button label="送出" onClick={mockClick} disabled />);
        fireEvent.click(screen.getByText('送出'));
        expect(mockClick).not.toHaveBeenCalled();
    });
});`}
          />

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-black text-blue-800 mb-2 text-sm">RTL 的設計哲學：測試行為，不測實作</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              React Testing Library 刻意不提供選取 class 名稱、測試組件內部 state 的 API。
              它強迫你從「使用者視角」測試：<code>getByText</code>、<code>getByRole</code>、<code>getByLabelText</code>。
              這樣的測試在你重構實作細節時不會壞掉——只要行為沒變，測試就通過。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Mock */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Mock：隔離外部依賴的藝術</h2>
          <p className="text-gray-600 leading-relaxed">
            純函數的 Unit Test 很直觀，但實際的組件幾乎都需要呼叫 API、讀 localStorage、或依賴目前時間。
            如果測試真的打 API，測試就會慢、不穩定、依賴外部服務的狀態。
            <strong>Mock 是用「假的實作」替換真實依賴</strong>，讓測試快速、可預測、不依賴環境。
          </p>

          <CodeBlock
            title="Mock API 呼叫（Jest + MSW）"
            lang="typescript"
            code={`// ── 方法一：直接 mock fetch（簡單場景）────────────
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, name: 'Joseph' }),
});

// ── 方法二：MSW（Mock Service Worker，推薦）────────
// 優點：在 Node 環境（測試）和瀏覽器都能用，API 結構更真實

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
    http.get('/api/users/:id', ({ params }) => {
        return HttpResponse.json({ id: params.id, name: 'Joseph' });
    }),
    http.post('/api/users', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ id: 99, ...body }, { status: 201 });
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());  // 每個測試後重置，避免污染
afterAll(() => server.close());

test('載入使用者資料', async () => {
    render(<UserProfile userId={1} />);
    // 等待非同步內容出現
    const name = await screen.findByText('Joseph');
    expect(name).toBeInTheDocument();
});

test('API 錯誤時顯示錯誤訊息', async () => {
    // 暫時覆寫這個測試的 handler
    server.use(
        http.get('/api/users/:id', () => {
            return new HttpResponse(null, { status: 500 });
        }),
    );
    render(<UserProfile userId={1} />);
    await screen.findByText('載入失敗，請稍後再試');
});`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Integration Test */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Integration Test：測試模組的組合</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Integration Test 測試多個模組組合後的行為——例如 API 路由 + 資料庫查詢，
            或多個 React 組件的互動。比 Unit Test 慢，但能發現模組間的整合問題。
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
            <p className="font-black text-slate-800 mb-2 text-sm">Integration Test 的資料庫設置</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              Integration Test 通常需要連接一個真實但隔離的測試資料庫（而非 Mock DB），
              這樣才能發現真實的 SQL 錯誤、constraint violation、join 邏輯問題等。
            </p>
            <div className="space-y-1 text-xs font-mono text-gray-600 bg-slate-900 rounded p-3">
              <p className="text-gray-400"># .env.test — 測試環境用獨立的 DB</p>
              <p className="text-green-400">DATABASE_URL="postgresql://localhost/myapp_test"</p>
              <p className="text-gray-400 mt-2"># package.json 測試指令帶入 .env.test</p>
              <p className="text-green-400">"test": "dotenv -e .env.test -- jest"</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">CI 環境通常用 GitHub Actions 的 service containers（Docker PostgreSQL）提供乾淨的測試 DB。</p>
          </div>

          <CodeBlock
            title="API 路由 Integration Test（Next.js + Jest）"
            lang="typescript"
            code={`// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/users/route';

// 連接隔離的測試 DB（.env.test 設定）；每次測試前清空確保獨立性
beforeEach(async () => {
    await db.user.deleteMany();
});

describe('GET /api/users', () => {
    test('回傳使用者列表', async () => {
        // Arrange：建立測試資料
        await db.user.createMany({
            data: [
                { name: 'Alice', email: 'alice@test.com' },
                { name: 'Bob', email: 'bob@test.com' },
            ],
        });

        // Act
        const response = await GET(new Request('http://localhost/api/users'));
        const data = await response.json();

        // Assert
        expect(response.status).toBe(200);
        expect(data).toHaveLength(2);
        expect(data[0].name).toBe('Alice');
    });
});

describe('POST /api/users', () => {
    test('成功建立使用者', async () => {
        const request = new Request('http://localhost/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: 'Joseph', email: 'joseph@test.com' }),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.id).toBeDefined();
        expect(data.name).toBe('Joseph');

        // 確認 DB 真的有資料
        const userInDB = await db.user.findUnique({ where: { email: 'joseph@test.com' } });
        expect(userInDB).not.toBeNull();
    });

    test('email 重複應回傳 409', async () => {
        await db.user.create({ data: { name: 'A', email: 'dup@test.com' } });
        const request = new Request('http://localhost/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: 'B', email: 'dup@test.com' }),
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await POST(request);
        expect(response.status).toBe(409);
    });
});`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* E2E */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">E2E Test：模擬真實使用者</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            E2E（End-to-End）測試用真實瀏覽器操作真實的 App，測試從前端到後端的完整流程。
            最接近真實使用情境，但慢（秒級）且容易因網路或 UI 變動而失敗。
            <strong>只寫最關鍵的使用者旅程（Happy Path）</strong>。
          </p>

          <CodeBlock
            title="Playwright E2E 測試：登入流程"
            lang="typescript"
            code={`// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('登入流程', () => {
    test('正確帳密可以成功登入', async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-testid="email"]', 'joseph@example.com');
        await page.fill('[data-testid="password"]', 'correctpassword');
        await page.click('[data-testid="submit"]');

        // 登入成功後導向 dashboard
        await expect(page).toHaveURL('/dashboard');
        await expect(page.getByText('歡迎回來，Joseph')).toBeVisible();
    });

    test('錯誤密碼顯示錯誤訊息', async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-testid="email"]', 'joseph@example.com');
        await page.fill('[data-testid="password"]', 'wrongpassword');
        await page.click('[data-testid="submit"]');

        await expect(page.getByText('帳號或密碼錯誤')).toBeVisible();
        await expect(page).toHaveURL('/login');  // 留在登入頁
    });
});

test.describe('購物流程', () => {
    test('加入購物車並結帳', async ({ page }) => {
        // 先登入
        await page.goto('/login');
        await page.fill('[data-testid="email"]', 'test@example.com');
        // ...

        await page.goto('/products/1');
        await page.click('text=加入購物車');
        await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

        await page.click('text=結帳');
        await expect(page).toHaveURL('/checkout');
        // ...
    });
});`}
          />
        </section>

        <Divider className="opacity-30" />

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <p className="font-black text-amber-800 mb-1 text-sm">TDD（Test-Driven Development）簡單定位</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            TDD 是「先寫測試再寫功能」的開發節奏：<strong>紅（寫失敗的測試）→ 綠（寫最小可過的程式碼）→ 重構（清理）</strong>。
            它的核心價值不是測試覆蓋率，而是強迫你在實作前思清楚 API 介面與邊界條件。
            不是每個情境都適合 TDD，但它在「需求明確的純函數邏輯」上效果最好。
          </p>
        </div>

        {/* 反模式與最佳實踐 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" size={28} />
            <h2 className="text-2xl font-black text-gray-900">測試反模式與最佳實踐</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                bad: '測試實作細節',
                example: `// ❌ 測試內部 state（重構後馬上壞掉）
expect(component.state.isLoading).toBe(false);`,
                good: `// ✅ 測試使用者看到的結果
expect(screen.queryByText('載入中...')).not.toBeInTheDocument();`,
              },
              {
                bad: '不獨立的測試（順序依賴）',
                example: `// ❌ 測試 B 依賴測試 A 建立的資料
test('A', () => db.create(...));
test('B', () => { /* 假設 A 的資料還在 */ });`,
                good: `// ✅ 每個測試獨立設置自己需要的資料
beforeEach(async () => { await db.deleteMany(); });
test('B', async () => { await db.create(...); /* 自己的資料 */ });`,
              },
              {
                bad: '斷言太模糊',
                example: `// ❌ 只驗證有回應，不驗證內容
expect(response.status).toBe(200);`,
                good: `// ✅ 驗證具體的業務邏輯結果
expect(response.status).toBe(200);
expect(data.name).toBe('Joseph');
expect(data.email).toBe('joseph@test.com');`,
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-red-50 px-5 py-2 border-b border-red-100">
                  <p className="font-black text-red-700 text-sm">❌ 反模式：{item.bad}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-x divide-gray-100">
                  <div className="p-4">
                    <p className="text-xs font-black text-red-500 mb-2">不好的寫法</p>
                    <pre className="text-xs font-mono text-gray-600 whitespace-pre-wrap leading-relaxed">{item.example}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black text-green-600 mb-2">✅ 改善後</p>
                    <pre className="text-xs font-mono text-gray-600 whitespace-pre-wrap leading-relaxed">{item.good}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-orange-700 to-amber-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🏔️', text: '測試金字塔：Unit（多、快、精確）> Integration（中）> E2E（少、慢、真實）。不要顛倒金字塔只寫 E2E。' },
                { emoji: '⚡', text: 'Unit Test 用 Jest，測試純函數邏輯；React 組件用 RTL，測試使用者行為而非實作細節。' },
                { emoji: '🎭', text: 'Mock 隔離外部依賴：推薦 MSW（Mock Service Worker），比直接 mock fetch 更真實且可重用。' },
                { emoji: '🔗', text: 'Integration Test 測試多模組組合，通常連接真實（但隔離的）測試資料庫，每次測試前清空。' },
                { emoji: '🌐', text: 'E2E 只測最關鍵的 Happy Path（登入、購買、核心功能），用 Playwright 或 Cypress。' },
                { emoji: '🚫', text: '反模式：不測實作細節、不讓測試互相依賴、不用模糊的斷言。好的測試是重構時的安全網，不是負擔。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        <div className="flex justify-end">
          <Link href="/blog/devops/ep02-github-actions" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 w-full sm:w-1/2 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.02 — CI/CD with GitHub Actions</p>
            <p className="text-sm text-gray-500 mt-1">自動測試、自動部署，讓機器幫你把關</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Testing', 'Unit Test', 'Integration', 'E2E', 'Jest', 'RTL', 'Playwright', 'MSW', 'TDD', 'EP.01'].map(tag => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
