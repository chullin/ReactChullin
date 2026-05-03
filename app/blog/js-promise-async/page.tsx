'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, ArrowLeft, ArrowRight, Code2, Lightbulb, AlertTriangle, CheckCircle, GitBranch, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title, lang = 'js' }: { code: string; title?: string; lang?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? lang}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip' | 'error'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip: 'bg-green-50 border-green-100 text-green-800',
    error: 'bg-red-50 border-red-100 text-red-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅', error: '❌' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">{icon}</div>
    <h2 className="text-2xl font-black text-gray-800">{children}</h2>
  </div>
);

const CompareBlock = ({ bad, good, badLabel, goodLabel, note }: {
  bad: string; good: string; badLabel?: string; goodLabel?: string; note?: string;
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl overflow-hidden">
        <div className="bg-red-800 px-4 py-2">
          <span className="text-red-200 text-xs font-mono font-bold">{badLabel ?? '❌ 有問題'}</span>
        </div>
        <pre className="bg-red-950 text-red-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">{bad}</pre>
      </div>
      <div className="rounded-xl overflow-hidden">
        <div className="bg-green-800 px-4 py-2">
          <span className="text-green-200 text-xs font-mono font-bold">{goodLabel ?? '✅ 正確做法'}</span>
        </div>
        <pre className="bg-green-950 text-green-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">{good}</pre>
      </div>
    </div>
    {note && <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{note}</p>}
  </div>
);

export default function JSPromiseAsyncPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 35% 45%, rgba(251,191,36,0.7) 0%, transparent 50%), radial-gradient(circle at 65% 60%, rgba(234,179,8,0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                JavaScript 深度
              </Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                非同步 JS
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Promise vs async/await<br />
              <span className="text-amber-300">非同步 JS 的現代寫法</span>
            </h1>
            <p className="text-yellow-200 text-lg font-medium max-w-2xl mx-auto">
              從 Callback Hell 到 Promise 鏈，再到 async/await，<br />
              徹底搞懂現代非同步 JavaScript 的寫法與陷阱
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs"><Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>JavaScript 深度系列</span>
                <span>·</span>
                <Clock size={12} />
                <span>5 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>1.2k views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="warning">Promise</Chip>
            <Chip size="sm" variant="flat" color="warning">async/await</Chip>
            <Chip size="sm" variant="flat" color="warning">非同步</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* 一、非同步的起點：Callback */}
        <section className="space-y-6">
          <SectionTitle icon={<GitBranch size={18} />}>一、非同步的起點：Callback 與 Callback Hell</SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            JS 最早的非同步寫法是<strong>回呼函式（Callback）</strong>——把「完成後要做的事」作為參數傳進去，
            讓非同步操作完成後呼叫它。但連續的非同步操作會讓 callback 一層套一層，變成難以維護的「Callback Hell」。
          </p>

          <CodeBlock
            title="callback-hell.js — 地獄長這樣"
            code={`// 情境：登入 → 取得使用者資料 → 取得訂單 → 取得商品詳情
login(user, (err, session) => {
  if (err) return handleError(err);

  fetchUser(session.userId, (err, user) => {
    if (err) return handleError(err);

    fetchOrders(user.id, (err, orders) => {
      if (err) return handleError(err);

      fetchProductDetail(orders[0].productId, (err, product) => {
        if (err) return handleError(err);

        console.log(product); // 終於拿到資料了…
        // 往右縮排了 4 層，再多幾個操作就失控了
      });
    });
  });
});`}
          />

          <Callout type="warn">
            Callback Hell 的三大問題：<br />
            <strong>1. 可讀性差</strong>：越來越深的縮排讓程式碼難以閱讀。<br />
            <strong>2. 錯誤處理重複</strong>：每一層都要檢查 err。<br />
            <strong>3. 難以維護</strong>：邏輯順序和視覺順序不一致，修改容易出錯。
          </Callout>
        </section>

        {/* 二、Promise */}
        <section className="space-y-6">
          <SectionTitle icon={<Code2 size={18} />}>二、Promise：承諾「這個值未來會到」</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            Promise 代表一個<strong>尚未完成但最終會完成（或失敗）的操作</strong>。
            它有三種狀態，且狀態只能單向轉換：
          </p>

          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                {[
                  { state: 'Pending', color: 'bg-gray-100 text-gray-600', desc: '等待中，初始狀態' },
                  { arrow: '→ fulfilled（成功）', color: 'text-green-500' },
                  { state: 'Settled', color: 'bg-green-100 text-green-700', desc: '已 resolve，有結果值' },
                ].map((item, i) =>
                  'arrow' in item ? (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className={`text-xs font-bold ${item.color}`}>resolve(value)</span>
                      <div className={`hidden sm:block h-0.5 w-16 ${i === 1 ? 'bg-green-300' : 'bg-red-300'}`} />
                      <div className={`sm:hidden w-0.5 h-6 ${i === 1 ? 'bg-green-300' : 'bg-red-300'}`} />
                    </div>
                  ) : (
                    <div key={i} className={`rounded-2xl px-5 py-3 text-center ${item.color}`}>
                      <p className="font-black text-base">{item.state}</p>
                      <p className="text-xs mt-0.5">{item.desc}</p>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
                <div className="bg-gray-100 text-gray-600 rounded-2xl px-5 py-3 text-center">
                  <p className="font-black text-base">Pending</p>
                  <p className="text-xs mt-0.5">等待中</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-red-500">reject(error)</span>
                  <div className="hidden sm:block h-0.5 w-16 bg-red-300" />
                  <div className="sm:hidden w-0.5 h-4 bg-red-300" />
                </div>
                <div className="bg-red-100 text-red-700 rounded-2xl px-5 py-3 text-center">
                  <p className="font-black text-base">Rejected</p>
                  <p className="text-xs mt-0.5">已失敗，有錯誤</p>
                </div>
              </div>
              <Callout type="info">
                Promise 一旦 settle（resolve 或 reject），狀態就<strong>永遠不變</strong>。
                再次呼叫 resolve 或 reject 都不會有任何效果。
              </Callout>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800">Promise 的基本寫法</h3>

          <CodeBlock
            title="promise-basic.js"
            code={`// 建立 Promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: 'Joseph' }); // 成功，傳入結果值
    } else {
      reject(new Error('Failed')); // 失敗，傳入 Error
    }
  }, 1000);
});

// 消費 Promise
fetchData
  .then((result) => {
    console.log(result.data); // 'Joseph'
    return result.data.toUpperCase(); // 可以在 then 裡 return 值，傳遞給下一個 then
  })
  .then((upper) => {
    console.log(upper); // 'JOSEPH'
  })
  .catch((err) => {
    console.error(err); // 統一處理任何 then 中的錯誤
  })
  .finally(() => {
    console.log('無論成功失敗都會執行'); // 清理工作
  });`}
          />

          <h3 className="text-xl font-black text-gray-800">用 Promise 解決 Callback Hell</h3>

          <CodeBlock
            title="promise-chain.js — 鏈式取代巢狀"
            code={`// 同樣的流程，用 Promise 鏈寫
login(user)
  .then((session) => fetchUser(session.userId))
  .then((user) => fetchOrders(user.id))
  .then((orders) => fetchProductDetail(orders[0].productId))
  .then((product) => {
    console.log(product); // 清晰的線性流程
  })
  .catch((err) => {
    handleError(err); // 一個 catch 處理所有錯誤
  });`}
          />

          <h3 className="text-xl font-black text-gray-800">Promise 的靜態方法</h3>

          <div className="space-y-4">
            {[
              {
                method: 'Promise.all()',
                badge: '全部成功才算成功',
                badgeColor: 'bg-blue-100 text-blue-700',
                desc: '並行執行多個 Promise，全部 resolve 才 resolve，任一 reject 就立刻 reject。',
                code: `// 並行發出多個請求，等全部完成
const [user, orders, notifications] = await Promise.all([
  fetchUser(id),
  fetchOrders(id),
  fetchNotifications(id),
]);
// 比依序等快：總時間 = 最慢的那個，而非全部加總`,
              },
              {
                method: 'Promise.allSettled()',
                badge: '全部完成後回報',
                badgeColor: 'bg-purple-100 text-purple-700',
                desc: '等所有 Promise 都 settle（無論成功失敗），回傳每個的狀態和結果。適合「失敗也要繼續」的場景。',
                code: `const results = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'), // 就算這個失敗，也不影響其他的
  fetch('/api/c'),
]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  if (r.status === 'rejected') console.log(r.reason);
});`,
              },
              {
                method: 'Promise.race()',
                badge: '最快的那個',
                badgeColor: 'bg-red-100 text-red-700',
                desc: '回傳第一個 settle 的結果，常用於超時控制。',
                code: `// 5 秒內沒回應就超時
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

const result = await Promise.race([
  fetch('/api/data'),
  timeout,
]);`,
              },
            ].map((item) => (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-sm border border-gray-100">
                  <CardBody className="p-5 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <code className="font-mono font-black text-gray-800">{item.method}</code>
                      <Chip size="sm" className={`${item.badgeColor} font-bold text-xs`}>{item.badge}</Chip>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    <CodeBlock title={item.method} code={item.code} />
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 三、async/await */}
        <section className="space-y-6">
          <SectionTitle icon={<Lightbulb size={18} />}>三、async/await：讓非同步看起來像同步</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">async/await</code> 是 ES2017 引入的語法糖，
            底層仍是 Promise，但讓非同步程式碼的寫法和讀起來的感覺像同步一樣直觀。
          </p>

          <CodeBlock
            title="async-await-basic.js"
            code={`// async 函式永遠回傳一個 Promise
async function loadUser(id) {
  // await 暫停函式，等 Promise resolve，拿到結果
  const user = await fetchUser(id);
  const orders = await fetchOrders(user.id);

  return { user, orders }; // 等同於 Promise.resolve({ user, orders })
}

// 呼叫 async 函式
loadUser(123)
  .then(({ user, orders }) => console.log(user, orders))
  .catch(console.error);

// 或者在另一個 async 函式裡用 await
async function main() {
  try {
    const { user, orders } = await loadUser(123);
    console.log(user, orders);
  } catch (err) {
    console.error(err);
  }
}`}
          />

          <h3 className="text-xl font-black text-gray-800">async/await vs Promise.then 對照</h3>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div>
                <div className="bg-gray-800 px-4 py-2.5">
                  <span className="text-gray-300 text-xs font-mono font-bold">Promise.then 寫法</span>
                </div>
                <pre className="bg-gray-900 text-blue-300 font-mono text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre">{`function loadData(id) {
  return fetchUser(id)
    .then(user => {
      return fetchOrders(user.id)
        .then(orders => ({
          user,
          orders,
        }));
    })
    .catch(err => {
      console.error(err);
    });
}`}</pre>
              </div>
              <div>
                <div className="bg-gray-800 px-4 py-2.5">
                  <span className="text-green-300 text-xs font-mono font-bold">async/await 寫法</span>
                </div>
                <pre className="bg-gray-900 text-green-300 font-mono text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre">{`async function loadData(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(
      user.id
    );
    return { user, orders };
  } catch (err) {
    console.error(err);
  }
}`}</pre>
              </div>
            </div>
          </div>

          <Callout type="tip">
            async/await 讓程式碼的邏輯流程更清晰，特別是有條件分支、迴圈、多個依賴步驟的場景。
            但它們本質上等價，選擇哪種看個人偏好和團隊風格。
          </Callout>
        </section>

        <Divider />

        {/* 四、常見陷阱 */}
        <section className="space-y-8">
          <SectionTitle icon={<AlertTriangle size={18} />}>四、async/await 最常見的陷阱</SectionTitle>

          {/* 陷阱 1 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #1</Chip>
                <h4 className="font-black text-gray-800">在迴圈裡 await，變成依序執行</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                用 <code className="font-mono">for...of</code> 迴圈 + <code className="font-mono">await</code> 是依序執行的——
                等第一個完成才執行第二個，總時間是全部加總。
                如果每個任務互相獨立，應該並行執行。
              </p>
              <CompareBlock
                badLabel="❌ 依序執行（慢）"
                goodLabel="✅ 並行執行（快）"
                bad={`// 假設每個 fetch 需要 1 秒
// 這樣總共要等 3 秒
async function sequential(ids) {
  const results = [];
  for (const id of ids) {
    const data = await fetch(id); // 等這個完成才繼續
    results.push(data);
  }
  return results;
}`}
                good={`// 同時發出三個請求，等最慢的那個
// 總共只要 1 秒（最慢的那個）
async function parallel(ids) {
  const promises = ids.map(id => fetch(id));
  const results = await Promise.all(promises);
  return results;
}`}
                note="獨立的非同步任務應該用 Promise.all 並行執行。只有當後面的任務依賴前面的結果時，才需要 await 依序執行。"
              />
            </CardBody>
          </Card>

          {/* 陷阱 2 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #2</Chip>
                <h4 className="font-black text-gray-800">忘記 await 導致拿到 Promise 物件而非值</h4>
              </div>
              <CompareBlock
                badLabel="❌ 忘記 await"
                goodLabel="✅ 加上 await"
                bad={`async function getUser() {
  return fetchUser(1); // Promise，不是 User
}

async function main() {
  const user = getUser(); // 又忘了 await
  console.log(user.name); // undefined！
  // user 是 Promise 物件，不是 user 資料
}`}
                good={`async function getUser() {
  return await fetchUser(1); // User 物件
}

async function main() {
  const user = await getUser(); // 等待解析
  console.log(user.name); // 'Joseph' ✅
}`}
                note="async 函式的回傳值是 Promise，呼叫時也需要 await。一個常見 bug 是呼叫 async 函式忘記 await，拿到的是 Promise 物件而不是實際的值。"
              />
            </CardBody>
          </Card>

          {/* 陷阱 3 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #3</Chip>
                <h4 className="font-black text-gray-800">未處理的 Promise rejection</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                如果 Promise reject 了卻沒有 <code className="font-mono">.catch()</code> 或 <code className="font-mono">try/catch</code>，
                在 Node.js 中可能導致程式崩潰（現代版本），在瀏覽器中會產生 UnhandledPromiseRejection 警告。
              </p>
              <CompareBlock
                badLabel="❌ 未處理的 rejection"
                goodLabel="✅ 妥善處理錯誤"
                bad={`// 如果 fetchData reject，沒有任何處理
async function main() {
  const data = await fetchData(); // 可能 throw
  console.log(data);
}
main(); // UnhandledPromiseRejection！`}
                good={`async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error('Error:', err.message);
    // 可以 fallback、retry 或顯示錯誤訊息
  }
}
main();`}
                note="每個 async 函式的呼叫處都應該有 try/catch，或者在呼叫時加 .catch()。Promise.all 只要有一個 reject 就整個失敗，考慮用 Promise.allSettled 代替。"
              />
            </CardBody>
          </Card>

          {/* 陷阱 4 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #4</Chip>
                <h4 className="font-black text-gray-800">async 函式不能用在 forEach</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                <code className="font-mono">Array.forEach</code> 不會等待 async callback，
                所有 callback 會幾乎同時啟動，但 forEach 本身不等待它們完成就結束了。
              </p>
              <CompareBlock
                badLabel="❌ forEach + async（不等待）"
                goodLabel="✅ for...of 或 Promise.all"
                bad={`async function processAll(items) {
  // forEach 不等待 async callback！
  items.forEach(async (item) => {
    await processItem(item);
  });
  // 這行在所有 processItem 完成前就執行了
  console.log('全部完成');
}`}
                good={`// 依序執行：for...of + await
async function processAll(items) {
  for (const item of items) {
    await processItem(item);
  }
  console.log('全部完成');
}

// 並行執行：Promise.all
async function processAllParallel(items) {
  await Promise.all(items.map(processItem));
  console.log('全部完成');
}`}
                note="forEach 不支援非同步等待。需要依序處理就用 for...of，需要並行處理就用 Promise.all + .map()。"
              />
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 五、核心重點 */}
        <section className="space-y-5">
          <SectionTitle icon={<CheckCircle size={18} />}>五、核心重點整理</SectionTitle>

          <Card className="shadow-sm border border-amber-100 bg-amber-50/30">
            <CardBody className="p-6 space-y-3">
              {[
                { key: 'Callback Hell', val: '深層巢狀讓程式碼難以閱讀和維護，是 Promise 出現的動機' },
                { key: 'Promise 狀態', val: 'Pending → Fulfilled 或 Rejected，狀態不可逆' },
                { key: '.then() 鏈', val: '每個 then 回傳新 Promise，可以傳遞值；.catch() 統一處理錯誤' },
                { key: 'Promise.all', val: '並行執行，全部成功才成功；任一失敗就失敗' },
                { key: 'Promise.allSettled', val: '並行執行，等全部 settle，不管成敗都繼續' },
                { key: 'async 函式', val: '永遠回傳 Promise，函式體內可以用 await' },
                { key: 'await', val: '暫停 async 函式，等 Promise resolve，拿到結果值' },
                { key: 'forEach + async', val: '不等待，改用 for...of（依序）或 Promise.all（並行）' },
                { key: '忘記 await', val: '拿到 Promise 物件而非值，是最常見的 async bug' },
              ].map((r) => (
                <div key={r.key} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <code className="font-mono text-sm font-black text-amber-700 w-32 shrink-0 mt-0.5">{r.key}</code>
                  <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.val}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog/js-event-loop">
            <Button variant="flat" startContent={<ArrowLeft size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              Event Loop 圖解
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="flat" endContent={<ArrowRight size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              所有文章
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
