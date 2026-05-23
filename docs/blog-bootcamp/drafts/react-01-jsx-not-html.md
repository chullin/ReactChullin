# JSX 不是 HTML：React 畫面的語法

## 這篇要解決的問題

你第一次看到 React，通常會看到這種程式碼：

```jsx
function ProfileCard() {
  return (
    <div className="card">
      <h2>Joseph</h2>
      <p>Software Engineer</p>
    </div>
  );
}
```

它看起來很像 HTML。

但奇怪的是，它又寫在 JavaScript 函式裡。

所以新手很容易困惑：

> 這到底是 HTML，還是 JavaScript？  
> 為什麼是 `className`，不是 `class`？  
> 為什麼可以在裡面寫 `{name}`？  
> 為什麼 `img` 要寫成 `<img />`？

這篇只解一件事：

**JSX 是 React 用來描述畫面的語法。它長得像 HTML，但本質上是 JavaScript。**

## 先用生活比喻理解

你可以把 JSX 想成「工程師和 React 溝通用的畫面草稿」。

你不是直接拿 HTML 交給瀏覽器。

你是在跟 React 說：

> 當資料是這樣時，畫面請長這樣。

React 再把這份描述轉成瀏覽器看得懂的 DOM。

## JSX 最小範例

```jsx
function Welcome() {
  return <h1>Hello React</h1>;
}
```

這表示：

> `Welcome` 這個元件會回傳一個標題。

如果你想回傳多個元素，要用一個外層包住：

```jsx
function Welcome() {
  return (
    <div>
      <h1>Hello React</h1>
      <p>Welcome to my blog.</p>
    </div>
  );
}
```

也可以用 Fragment，不多包一層真正的 `div`：

```jsx
function Welcome() {
  return (
    <>
      <h1>Hello React</h1>
      <p>Welcome to my blog.</p>
    </>
  );
}
```

## JSX 和 HTML 最容易搞混的地方

### 1. `class` 要寫成 `className`

HTML：

```html
<div class="card">內容</div>
```

JSX：

```jsx
<div className="card">內容</div>
```

原因是 `class` 在 JavaScript 裡是保留字。

你不需要背太多歷史，只要記得：

> 在 React 裡要加 CSS class，用 `className`。

### 2. `for` 要寫成 `htmlFor`

HTML：

```html
<label for="email">Email</label>
<input id="email" />
```

JSX：

```jsx
<label htmlFor="email">Email</label>
<input id="email" />
```

因為 `for` 也是 JavaScript 保留字。

### 3. 自閉合標籤要補 `/`

HTML 有時可以這樣寫：

```html
<img src="avatar.png">
```

JSX 要寫：

```jsx
<img src="avatar.png" alt="avatar" />
```

常見自閉合標籤包含：

- `<img />`
- `<input />`
- `<br />`

## JSX 裡放 JavaScript：使用大括號

JSX 真正好用的地方，是你可以把 JavaScript 資料放進畫面。

```jsx
function ProfileCard() {
  const name = 'Joseph';
  const role = 'Software Engineer';

  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

大括號 `{}` 可以先理解成：

> 這裡我要切回 JavaScript 模式。

所以你可以放變數：

```jsx
<h1>{title}</h1>
```

也可以放計算結果：

```jsx
<p>總共有 {posts.length} 篇文章</p>
```

也可以放條件判斷：

```jsx
<p>{isLoggedIn ? '歡迎回來' : '請先登入'}</p>
```

## 最小可運行範例

```jsx
function BlogCard() {
  const title = 'DOM 是什麼';
  const readMinutes = 8;
  const isNew = true;

  return (
    <article className="card">
      <h2>{title}</h2>
      <p>閱讀時間：約 {readMinutes} 分鐘</p>
      {isNew && <span>新文章</span>}
    </article>
  );
}
```

這裡有三個 JSX 重點：

1. 用 `className` 套樣式。
2. 用 `{title}` 顯示變數。
3. 用 `{isNew && ...}` 決定要不要顯示標籤。

## JSX 裡不能直接寫的東西

### 不能直接寫 `if`

這樣不行：

```jsx
return (
  <div>
    {if (isNew) {
      <span>新文章</span>
    }}
  </div>
);
```

你可以改用三元運算子：

```jsx
return (
  <div>
    {isNew ? <span>新文章</span> : null}
  </div>
);
```

或 `&&`：

```jsx
return (
  <div>
    {isNew && <span>新文章</span>}
  </div>
);
```

### 不能回傳兩個平行元素

這樣不行：

```jsx
return (
  <h1>標題</h1>
  <p>內容</p>
);
```

要用外層包住：

```jsx
return (
  <>
    <h1>標題</h1>
    <p>內容</p>
  </>
);
```

## 和原生 DOM 的差異

上一篇你看過原生 JavaScript 需要這樣改畫面：

```js
const title = document.querySelector('#title');
title.textContent = '新的標題';
```

React 裡你比較常寫：

```jsx
function Title() {
  const title = '新的標題';
  return <h1>{title}</h1>;
}
```

差別是：

- 原生 DOM：找到畫面元素，手動改它。
- React JSX：描述資料應該如何呈現在畫面。

這是 React 心智模型的開始。

## 常見錯誤

### 錯誤 1：把 JSX 當成 HTML

JSX 長得像 HTML，但它不是 HTML。

所以你會看到 `className`、`htmlFor`、`{}` 這些 JavaScript 味道很重的語法。

### 錯誤 2：忘記用單一根元素包住

React 元件回傳的 JSX 需要有一個最外層。

如果不想多一個 `div`，就用 `<>...</>`。

### 錯誤 3：在 JSX 裡塞太多邏輯

JSX 是描述畫面的地方，不適合塞太複雜的計算。

如果邏輯開始變長，先在 `return` 前面算好，再放進 JSX。

## 這篇學到什麼

- JSX 是 React 描述畫面的語法。
- JSX 長得像 HTML，但本質上是 JavaScript。
- `class` 要寫成 `className`。
- `{}` 可以在 JSX 裡切回 JavaScript。
- JSX 通常要回傳單一根元素。

## 下一篇該讀什麼

下一篇請讀：

**Component：把畫面拆成積木**

因為 JSX 只是描述一小段畫面。真正讓 React 變好維護的關鍵，是把畫面拆成一個個 Component。
