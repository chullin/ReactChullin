# Blog Bootcamp 補文進度紀錄

更新日期：2026-05-22

這份文件用來避免後續換新對話窗時遺漏脈絡。新對話只要先讀本檔，再接續 `目前進度` 的下一步即可。

## 核心目標

把現有技術部落格整理成「給 2026 初階軟體工程師的免費線上 Bootcamp」。

目前問題不是文章數不足，而是新手學習路線斷層：

- React Component 文章出現得太早。
- DOM、Event、SPA、JS 與 React 的關係沒有先鋪好。
- HTML/CSS 基礎文章偏面試速查，不像初學者課程。
- JavaScript 系列與 Web 開發系列彼此有關，但 UI 上沒有明確標示前置關係。

## 編輯原則

每篇補文都要遵守：

- 從痛點開始，不從定義開始。
- 用生活化比喻，但不要讓比喻蓋過技術本身。
- 每篇只解一個核心問題。
- 先給最小可運行範例，再補概念。
- 每篇都要有「為什麼需要」、「解決什麼問題」、「常見錯誤」、「下一篇該讀什麼」。
- 語氣像 YouTube 技術教學、Bootcamp 老師、帶新人工程師，不像官方文件。

## 建議新手路線

```text
Web Bootcamp
├── 01 網頁到底是怎麼跑起來的？
├── 02 DOM 是什麼：JavaScript 如何改變畫面
├── 03 Event 是什麼：點擊按鈕後發生什麼事
├── 04 不用 React 做 Todo，然後你就懂痛點
├── 05 JSX 不是 HTML：React 畫面的語法
├── 06 Component：把畫面拆成積木
├── 07 Props：把資料交給元件
├── 08 State：讓畫面記住使用者做了什麼
├── 09 React 事件處理
├── 10 List Rendering 與 key
├── 11 useEffect：處理畫面之外的事情
└── 12 Forms：從 HTML 表單到 React controlled form
```

## 目前進度

### 已建立草稿

- [x] `drafts/bridge-01-how-web-page-runs.md`
  - 主題：網頁到底是怎麼跑起來的？
  - 目的：補 HTML/CSS/JS/Browser 的整體地圖。
  - 建議位置：React 之前，Web 開發系列最前面。

- [x] `drafts/bridge-02-dom-basics.md`
  - 主題：DOM 是什麼？
  - 目的：讓讀者先知道 React 解決的是「手動操作畫面」的問題。
  - 建議位置：React 為什麼存在之前。

- [x] `drafts/bridge-03-event-basics.md`
  - 主題：Event 是什麼？
  - 目的：補上 onClick、onChange、表單互動的前置知識。
  - 建議位置：DOM 之後、React event handling 之前。

- [x] `drafts/bridge-04-vanilla-todo-before-react.md`
  - 主題：不用 React 做 Todo，然後你就懂痛點。
  - 目的：讓讀者先感受到手動同步資料與 DOM 的維護成本。
  - 建議位置：DOM / Event 之後、JSX 之前；可對接現有 `ep15-why-react`。

- [x] `drafts/react-01-jsx-not-html.md`
  - 主題：JSX 不是 HTML。
  - 目的：拆出 EP04 的 JSX 內容，讓讀者先懂 React 如何描述畫面。
  - 建議位置：React 入門第 1 篇。

- [x] `drafts/react-02-component.md`
  - 主題：Component：把畫面拆成積木。
  - 目的：拆出 EP04 的 Component 內容，聚焦可重用 UI。
  - 建議位置：JSX 之後、Props 之前。

- [x] `drafts/react-03-props.md`
  - 主題：Props：把資料交給元件。
  - 目的：讓讀者理解父傳子與同一個 Component 顯示不同資料。
  - 建議位置：Component 之後、State 之前。

### 下一批建議補文

- [ ] `react-04-state-usestate.md`
  - 從按鈕展開/收起講 State。

- [ ] `react-05-event-handling.md`
  - 從原生 Event 接到 React 的 `onClick`、`onChange`、`onSubmit`。

- [ ] `react-06-conditional-rendering.md`
  - 根據登入狀態、loading 狀態、空資料狀態決定畫面。

- [ ] `react-07-list-rendering-key.md`
  - 從 JavaScript `map` 接到 React list rendering 與 `key`。

- [ ] `react-08-useeffect-basics.md`
  - 從「畫面之外的事情」講資料請求、同步外部系統與 cleanup。

- [ ] `react-09-forms-controlled-input.md`
  - 從 HTML form 接到 React controlled input。

## 本輪新增紀錄（2026-05-22）

已完成 4 篇草稿：

1. `bridge-04-vanilla-todo-before-react.md`
2. `react-01-jsx-not-html.md`
3. `react-02-component.md`
4. `react-03-props.md`

下次若換新對話，請直接從 `react-04-state-usestate.md` 開始，不需要重寫前面文章。

## 現有文章重構方向

### `/app/blog/web-dev/ep04-react-component/page.tsx`

目前同時講 Component、JSX、Props、State、`use client`、TypeScript，對初學者太密。建議拆成：

1. JSX 不是 HTML
2. Component：畫面的積木
3. Props：元件的外部資料
4. State：元件自己的記憶

### `/app/blog/web-dev/ep15-why-react/page.tsx`

這篇其實是 React 入門最佳入口，應該移到 Component 前面。可改成新手路線第 4 篇，或保留原頁面但在 Blog 導覽中標示「React 前置必讀」。

### `/app/blog/web-dev/ep10-html-css/page.tsx`

目前偏面試速查。建議另補初學者版：

- HTML：頁面的骨架
- CSS：讓畫面排版與變漂亮
- Flexbox / Grid：實際排版案例

## 新對話接續 Prompt

下次開新對話時可直接貼：

```text
請先讀 `/Users/chullin/Desktop/ReactChullin/docs/blog-bootcamp/PROGRESS.md`。
我們正在把我的 Blog 補成「2026 初階軟體工程師免費線上 Bootcamp」。
請延續目前補文計畫，不要重新分析整個 repo。
請從 `目前進度` 的下一篇待辦開始寫，並每完成一篇就更新 PROGRESS.md。
草稿先放在 `/Users/chullin/Desktop/ReactChullin/docs/blog-bootcamp/drafts/`。
寫作風格：YouTube 技術教學、Bootcamp 老師、帶新人工程師。不要官方文件口吻。
```

## 上架前注意事項

- 不要直接覆蓋現有文章。
- 若要新增正式文章，先決定 URL 與 EP 編號策略。
- 若調整 `config/blog.tsx`，要同步確認 Blog 頁排序與系列數量。
- 目前工作區已有使用者修改：`app/blog/BlogClient.tsx`。除非任務需要，不要碰這個檔案。
