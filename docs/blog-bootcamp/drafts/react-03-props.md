# Props：把資料交給元件

## 這篇要解決的問題

上一篇我們做了 `BlogCard` Component。

但有一個問題：

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
```

如果每張卡片都寫死成「DOM 是什麼」，那它只能顯示同一篇文章。

我們真正想要的是：

- 同一個卡片設計。
- 不同文章資料。
- 顯示不同標題、摘要、連結。

這就是 Props 要解決的問題。

## 先用生活比喻理解

Component 像一台飲料機。

Props 像你投入的設定：

- 飲料種類：紅茶、綠茶、拿鐵。
- 甜度：半糖、微糖、無糖。
- 冰塊：正常冰、少冰、去冰。

飲料機本身是同一台，但你給它不同設定，它就做出不同飲料。

React Component 也是：

> Component 是模板，Props 是外部傳進來的資料。

## 最小 Props 範例

```jsx
function Welcome(props) {
  return <h1>你好，{props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Joseph" />
      <Welcome name="Cary" />
      <Welcome name="Sibei" />
    </div>
  );
}
```

畫面會顯示：

```text
你好，Joseph
你好，Cary
你好，Sibei
```

同一個 `Welcome` Component，因為收到不同 `name`，所以顯示不同內容。

## 更常見的寫法：解構 Props

很多 React 程式會這樣寫：

```jsx
function Welcome({ name }) {
  return <h1>你好，{name}</h1>;
}
```

這叫做解構。

你可以先理解成：

> 從 props 裡直接拿出 name 來用。

所以這兩種寫法意思接近：

```jsx
function Welcome(props) {
  return <h1>你好，{props.name}</h1>;
}
```

```jsx
function Welcome({ name }) {
  return <h1>你好，{name}</h1>;
}
```

實務上第二種更常見。

## 把 BlogCard 改成可重用

原本寫死：

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
```

改成接收 Props：

```jsx
function BlogCard({ title, description, href }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={href}>閱讀文章</a>
    </article>
  );
}
```

使用時傳不同資料：

```jsx
function BlogPage() {
  return (
    <main>
      <BlogCard
        title="DOM 是什麼"
        description="JavaScript 如何改變畫面"
        href="/blog/dom"
      />

      <BlogCard
        title="Event 是什麼"
        description="點擊按鈕後發生什麼事"
        href="/blog/event"
      />
    </main>
  );
}
```

這樣就有彈性了。

## Props 可以傳什麼

Props 可以傳很多種資料。

### 字串

```jsx
<BlogCard title="JSX 不是 HTML" />
```

### 數字

數字要放在 `{}` 裡：

```jsx
<ArticleStats readMinutes={8} />
```

### 布林值

```jsx
<ArticleBadge isNew={true} />
```

也可以簡寫：

```jsx
<ArticleBadge isNew />
```

### 陣列或物件

```jsx
const post = {
  title: 'Component：把畫面拆成積木',
  href: '/blog/component',
};

<BlogCard post={post} />
```

### JSX

有些 UI library 會讓你傳 JSX，例如 icon：

```jsx
<Button icon={<ArrowRight />}>下一篇</Button>
```

## Props 是單向的

React 有一個很重要的觀念：

> Props 是父元件傳給子元件的資料。

像這樣：

```text
BlogPage
└── BlogCard
```

`BlogPage` 把 `title`、`description`、`href` 傳給 `BlogCard`。

資料方向是由上往下。

子元件不應該直接修改 Props。

## 不要修改 Props

錯誤示範：

```jsx
function BlogCard({ title }) {
  title = title.toUpperCase();
  return <h2>{title}</h2>;
}
```

比較好的做法：

```jsx
function BlogCard({ title }) {
  const displayTitle = title.toUpperCase();
  return <h2>{displayTitle}</h2>;
}
```

先記這個原則：

> Props 是別人交給你的資料，你可以拿來顯示或計算，但不要直接改它。

後面學 State 時，你會知道「元件自己會變的資料」應該放在哪裡。

## Props vs HTML attributes

你其實早就看過類似 Props 的東西。

HTML：

```html
<img src="avatar.png" alt="Joseph 的頭像" />
```

React Component：

```jsx
<Avatar src="avatar.png" alt="Joseph 的頭像" />
```

差別是：

- HTML attribute 是傳給瀏覽器原生元素。
- Props 是傳給你自己寫的 Component。

所以 Props 不神秘，它就是「傳資料」。

## 最小可運行範例

```jsx
function BlogCard({ title, description, readMinutes }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <small>閱讀時間：約 {readMinutes} 分鐘</small>
    </article>
  );
}

function App() {
  return (
    <main>
      <BlogCard
        title="JSX 不是 HTML"
        description="React 畫面的語法入門"
        readMinutes={6}
      />
      <BlogCard
        title="Component：把畫面拆成積木"
        description="學會拆分可重用 UI"
        readMinutes={8}
      />
    </main>
  );
}
```

這就是 Props 最核心的使用方式。

## 常見錯誤

### 錯誤 1：字串以外的值忘記加 `{}`

錯誤：

```jsx
<ArticleStats readMinutes="8" />
```

這會傳字串 `"8"`。

如果你要傳數字，應該寫：

```jsx
<ArticleStats readMinutes={8} />
```

### 錯誤 2：在子元件直接改 Props

Props 是父元件給你的資料，不要直接改。

需要改變的資料，後面會用 State 處理。

### 錯誤 3：Props 命名太模糊

例如：

```jsx
<BlogCard data={post} />
```

不是不能用，但如果 Component 很小，明確一點通常更好：

```jsx
<BlogCard title={post.title} description={post.description} />
```

## 這篇學到什麼

- Props 是父元件傳給子元件的資料。
- Component 是模板，Props 讓模板顯示不同內容。
- Props 可以傳字串、數字、布林、物件、陣列、JSX。
- Props 是單向資料流，不應該在子元件直接修改。
- HTML attributes 和 Props 概念很像，只是對象不同。

## 下一篇該讀什麼

下一篇請讀：

**State：讓畫面記住使用者做了什麼**

因為 Props 是外部傳進來的資料，但有些資料是元件自己管理、而且會隨著使用者操作改變。那就是 State。
