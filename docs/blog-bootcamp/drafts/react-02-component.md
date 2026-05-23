# Component：把畫面拆成積木

## 這篇要解決的問題

假設你正在做一個部落格網站。

首頁有文章卡片：

```html
<article>
  <h2>DOM 是什麼</h2>
  <p>JavaScript 如何改變畫面</p>
  <a href="/blog/dom">閱讀文章</a>
</article>
```

看起來很簡單。

但如果你有 30 篇文章，每一張卡片都要長一樣，只是標題、摘要、連結不同，你會怎麼做？

如果直接複製貼上 30 次，之後設計要改，你就要改 30 個地方。

這就是 Component 要解決的問題。

## 先用生活比喻理解

Component 就像樂高積木。

你不會每次蓋房子都重新發明一個窗戶。

你會先做出「窗戶積木」、「門積木」、「牆壁積木」，然後拿來組合。

React 的 Component 也是一樣：

- Navbar 是一個 Component。
- Button 是一個 Component。
- BlogCard 是一個 Component。
- Footer 是一個 Component。

你先把 UI 拆成小積木，再組成完整頁面。

## 最小 Component

在 React 裡，Component 通常就是一個回傳 JSX 的 JavaScript 函式。

```jsx
function MyButton() {
  return <button>點我</button>;
}
```

使用它的時候，像 HTML tag 一樣：

```jsx
function App() {
  return (
    <div>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  );
}
```

你寫一次 `MyButton`，就可以用很多次。

## Component 名稱要大寫

React 有一個很重要的規則：

> Component 名稱要大寫開頭。

正確：

```jsx
function MyButton() {
  return <button>點我</button>;
}
```

錯誤：

```jsx
function myButton() {
  return <button>點我</button>;
}
```

原因是 React 用大小寫判斷：

- 小寫：瀏覽器原生元素，例如 `div`、`button`、`h1`。
- 大寫：你自己定義的 Component，例如 `MyButton`、`Navbar`、`BlogCard`。

## 從重複 HTML 到 Component

先看沒有 Component 的寫法：

```jsx
function BlogPage() {
  return (
    <main>
      <article>
        <h2>DOM 是什麼</h2>
        <p>JavaScript 如何改變畫面</p>
        <a href="/blog/dom">閱讀文章</a>
      </article>

      <article>
        <h2>Event 是什麼</h2>
        <p>點擊按鈕後發生什麼事</p>
        <a href="/blog/event">閱讀文章</a>
      </article>
    </main>
  );
}
```

你會發現兩張卡片結構幾乎一樣。

所以我們可以先抽成 Component：

```jsx
function BlogCard() {
  return (
    <article>
      <h2>DOM 是什麼</h2>
      <p>JavaScript 如何改變畫面</p>
      <a href="/blog/dom">閱讀文章</a>
    </article>
  );
}

function BlogPage() {
  return (
    <main>
      <BlogCard />
      <BlogCard />
    </main>
  );
}
```

這樣確實拆出積木了。

但現在兩張卡片內容都一樣。

下一篇會用 Props 解決「同一個 Component 顯示不同資料」的問題。

## Component 可以組合 Component

Component 不只可以放 HTML，也可以放其他 Component。

```jsx
function Header() {
  return <header>Joseph Blog</header>;
}

function Footer() {
  return <footer>© 2026 Joseph Chen</footer>;
}

function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogCard />
        <BlogCard />
      </main>
      <Footer />
    </>
  );
}
```

這就是 React 很重要的能力：

> 用小 Component 組成大 Component，再組成整個頁面。

## 如何判斷要不要拆 Component

初學者常會問：

> 我到底什麼時候要拆？

先用三個簡單判斷：

### 1. 同樣 UI 出現很多次

例如文章卡片、按鈕、標籤、列表項目。

這種很適合拆。

### 2. 這段 JSX 開始太長

如果一個頁面裡塞滿很多區塊，讀起來很吃力，可以拆成 Header、Hero、PostList、Footer。

### 3. 這個區塊有明確責任

例如 SearchBox 負責搜尋輸入，UserAvatar 負責顯示頭像。

責任清楚，就適合拆。

## 但也不要太早拆

Component 不是拆越細越好。

如果你把一個簡單標題也拆成：

```jsx
function TitleText() {
  return <h1>標題</h1>;
}
```

但它只用一次，也沒有特殊邏輯，那可能只是增加閱讀成本。

比較好的節奏是：

> 先寫出來，看到重複或變長，再拆。

## 最小可運行範例

```jsx
function Header() {
  return <h1>Joseph 的前端 Bootcamp</h1>;
}

function BlogCard() {
  return (
    <article>
      <h2>JSX 不是 HTML</h2>
      <p>React 畫面的語法入門</p>
      <button>閱讀文章</button>
    </article>
  );
}

function App() {
  return (
    <main>
      <Header />
      <BlogCard />
      <BlogCard />
    </main>
  );
}
```

這段已經有三層概念：

- `Header` 是一個 Component。
- `BlogCard` 是一個 Component。
- `App` 把它們組合起來。

## 常見錯誤

### 錯誤 1：Component 小寫開頭

```jsx
function blogCard() {
  return <article>...</article>;
}
```

請改成：

```jsx
function BlogCard() {
  return <article>...</article>;
}
```

### 錯誤 2：Component 做太多事

如果一個 Component 同時處理導覽列、文章列表、搜尋、頁尾，就會很難維護。

可以慢慢拆成有明確責任的小元件。

### 錯誤 3：拆太碎

如果一個 Component 只用一次，也沒有讓程式更清楚，就不用急著拆。

拆 Component 是為了讓程式更好讀，不是為了看起來很專業。

## 這篇學到什麼

- Component 是 React 裡可重用的 UI 積木。
- Component 通常是回傳 JSX 的 JavaScript 函式。
- Component 名稱要大寫開頭。
- Component 可以組合其他 Component。
- 看到重複 UI、太長的 JSX、清楚的責任時，可以考慮拆。

## 下一篇該讀什麼

下一篇請讀：

**Props：把資料交給元件**

因為 Component 解決了「重複結構」的問題，但還沒解決「同一張卡片要顯示不同內容」的問題。
