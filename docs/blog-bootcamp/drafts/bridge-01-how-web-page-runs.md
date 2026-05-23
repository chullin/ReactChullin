# 網頁到底是怎麼跑起來的？從瀏覽器打開網頁那一秒開始

## 這篇要解決的問題

很多人一開始學前端，會直接被丟進 React、Next.js、Tailwind、Vercel。

結果腦袋裡會變成這樣：

> 我知道要輸入 `npm run dev`，但我不知道它到底在跑什麼。  
> 我知道畫面會出現，但不知道瀏覽器到底拿到了什麼。  
> 我知道 React 很重要，但不知道它跟 HTML、CSS、JavaScript 的關係。

這篇先不碰 React。你只需要先搞懂一件事：

**一個網頁，從你輸入網址到畫面出現，中間到底發生了什麼？**

## 先用生活比喻理解

你可以把瀏覽器想成一間餐廳的客人。

你輸入網址，就像客人跟服務生說：

> 我想要這份餐點。

伺服器就像廚房。它收到請求後，會把做好的東西送回來。

送回來的通常不是一個神祕的 App，而是幾種檔案：

- HTML：告訴瀏覽器頁面上有哪些東西。
- CSS：告訴瀏覽器這些東西長什麼樣子。
- JavaScript：告訴瀏覽器這些東西可以怎麼互動。

瀏覽器的工作就是把這些檔案組合起來，變成你看到的畫面。

## 三個主角：HTML、CSS、JavaScript

### HTML：頁面的骨架

HTML 負責「內容與結構」。

```html
<h1>Joseph 的技術部落格</h1>
<p>這裡記錄我的前端、AI、系統設計學習筆記。</p>
<button>開始閱讀</button>
```

這段只是在說：

- 這裡有一個標題。
- 這裡有一段文字。
- 這裡有一個按鈕。

它還沒有漂亮的樣式，也還不會互動。

### CSS：頁面的外觀

CSS 負責「長相與排版」。

```css
h1 {
  color: #2563eb;
  font-size: 40px;
}

button {
  padding: 12px 20px;
  border-radius: 8px;
}
```

CSS 會回答這些問題：

- 標題多大？
- 按鈕什麼顏色？
- 內容要排成一欄還是兩欄？
- 手機版要不要換排列方式？

### JavaScript：頁面的互動

JavaScript 負責「使用者做了某件事之後，頁面要怎麼反應」。

```html
<button id="startButton">開始閱讀</button>

<script>
  const button = document.querySelector('#startButton');

  button.addEventListener('click', () => {
    alert('歡迎來到 Joseph 的部落格！');
  });
</script>
```

這段的意思是：

> 找到按鈕。當使用者點它時，跳出提示訊息。

這就是互動。

## 瀏覽器實際做了什麼

當瀏覽器拿到 HTML、CSS、JavaScript 後，它大概會做這幾件事：

1. 讀 HTML，建立頁面的結構。
2. 讀 CSS，計算每個元素的樣式。
3. 把結構和樣式合在一起，畫出畫面。
4. 執行 JavaScript，讓頁面可以互動。

所以你看到的網頁，不是一張圖片，而是一棵可以被 JavaScript 操作的「頁面結構樹」。

這棵樹就是下一篇會講的 DOM。

## 最小可運行範例

你可以把下面內容存成 `index.html`，直接用瀏覽器打開。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>第一個互動網頁</title>
    <style>
      body {
        font-family: sans-serif;
        padding: 40px;
      }

      button {
        padding: 10px 16px;
        border: 0;
        border-radius: 8px;
        background: #2563eb;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>我的第一個網頁</h1>
    <p id="message">按下按鈕看看會發生什麼事。</p>
    <button id="button">點我</button>

    <script>
      const button = document.querySelector('#button');
      const message = document.querySelector('#message');

      button.addEventListener('click', () => {
        message.textContent = '畫面被 JavaScript 改變了！';
      });
    </script>
  </body>
</html>
```

你已經做出一個最小的互動網頁了。

React、Next.js、Tailwind 再怎麼現代，底層也離不開這三件事。

## 常見錯誤

### 錯誤 1：以為 React 取代了 HTML/CSS/JS

React 沒有取代它們。

React 是建立在 JavaScript 上，用更好的方式管理畫面。你最後仍然是在瀏覽器裡產生 HTML、套用 CSS、執行 JavaScript。

### 錯誤 2：一開始就背框架名詞

如果你還不知道 HTML、CSS、JavaScript 的分工，一開始就學 React 很容易卡住。

你會看得懂語法，但不知道它為什麼存在。

### 錯誤 3：只會跟著指令跑

`npm run dev` 很方便，但它只是幫你啟動開發伺服器。

你真正要建立的心智模型是：

> 瀏覽器拿到檔案，解析檔案，畫出畫面，執行互動。

## 這篇學到什麼

- HTML 負責結構。
- CSS 負責外觀。
- JavaScript 負責互動。
- 瀏覽器會把這三者組合成畫面。
- React 不是憑空出現，它是為了解決「用 JavaScript 管理複雜畫面」的問題。

## 下一篇該讀什麼

下一篇請讀：

**DOM 是什麼：JavaScript 如何改變畫面**

因為在懂 React 之前，你要先知道傳統 JavaScript 是怎麼操作畫面的。只有先看過麻煩在哪裡，後面才會真的懂：

> 原來 React 是為了解決這個問題。
