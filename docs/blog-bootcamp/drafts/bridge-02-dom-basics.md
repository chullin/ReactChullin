# DOM 是什麼：JavaScript 如何改變畫面

## 這篇要解決的問題

你可能看過這種 JavaScript：

```js
document.querySelector('#title').textContent = 'Hello React';
```

然後心裡想：

> `document` 是什麼？  
> `querySelector` 是什麼？  
> 為什麼改 `textContent`，畫面就變了？

這篇要補的就是 React 前最重要的觀念之一：

**JavaScript 不是直接改 HTML 檔案，而是在操作瀏覽器建立出來的 DOM。**

## 先用生活比喻理解

HTML 檔案像一份建築設計圖。

瀏覽器拿到設計圖後，會真的在畫面上蓋出一棟房子。

DOM 就是瀏覽器蓋出來的那棟房子的「可操作模型」。

你用 JavaScript 做的事，不是拿橡皮擦去改設計圖，而是直接去操作這棟房子的東西：

- 換標題文字。
- 新增一個按鈕。
- 移除一張卡片。
- 幫某個區塊加上 class。

## DOM 是什麼

DOM 全名是 Document Object Model。

不用急著背全名，你先記這句就好：

> DOM 是瀏覽器把 HTML 轉成 JavaScript 可以操作的物件結構。

例如這段 HTML：

```html
<body>
  <h1 id="title">我的部落格</h1>
  <p>歡迎來到這裡</p>
</body>
```

瀏覽器會把它變成類似這樣的樹：

```text
document
└── body
    ├── h1#title
    └── p
```

所以 JavaScript 才能說：

```js
const title = document.querySelector('#title');
title.textContent = '新的標題';
```

意思是：

1. 從整份文件裡找到 `id="title"` 的元素。
2. 把它的文字改掉。

## 最小可運行範例

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">原本的標題</h1>
    <button id="button">改標題</button>

    <script>
      const title = document.querySelector('#title');
      const button = document.querySelector('#button');

      button.addEventListener('click', () => {
        title.textContent = '標題被 JavaScript 改掉了';
      });
    </script>
  </body>
</html>
```

這個例子有三個步驟：

1. HTML 先放一個標題和按鈕。
2. JavaScript 找到它們。
3. 使用者點按鈕後，JavaScript 改 DOM，畫面跟著變。

## 新增元素：不只改文字

JavaScript 也可以新增畫面上的元素。

```html
<ul id="list"></ul>
<button id="addButton">新增項目</button>

<script>
  const list = document.querySelector('#list');
  const addButton = document.querySelector('#addButton');

  addButton.addEventListener('click', () => {
    const item = document.createElement('li');
    item.textContent = '新的項目';
    list.appendChild(item);
  });
</script>
```

這就是很多互動網頁的基本模式：

1. 使用者做一件事。
2. JavaScript 更新資料或建立元素。
3. DOM 被改變。
4. 畫面變了。

## 問題開始出現：畫面越複雜，DOM 越難管

如果只是改一個標題，DOM 操作很簡單。

但如果你要做一個 Todo List 呢？

你會需要：

- 新增一筆 Todo。
- 勾選完成。
- 刪除 Todo。
- 顯示總數。
- 篩選未完成。
- 儲存到 localStorage。

每一次資料改變，你都要記得手動更新對應 DOM。

這時候問題就來了：

> 資料在哪裡？  
> 畫面在哪裡？  
> 哪些 DOM 要更新？  
> 我有沒有忘記更新某個數字？

這就是 React 要解決的痛點。

## React 和 DOM 的關係

你可以先這樣理解：

傳統 JavaScript 的思考方式：

> 我要找到哪個 DOM，然後怎麼改它？

React 的思考方式：

> 我的資料現在長什麼樣子？畫面就應該長什麼樣子。

也就是說，React 讓你少想「我要操作哪個元素」，多想「資料狀態是什麼」。

這個轉換非常重要。

## 常見錯誤

### 錯誤 1：以為 DOM 就是 HTML 檔案

HTML 是你寫的原始檔。

DOM 是瀏覽器讀完 HTML 後建立出來、可以被 JavaScript 操作的物件模型。

### 錯誤 2：每次都用 `innerHTML`

`innerHTML` 很方便，但容易讓程式碼變亂，也可能帶來安全風險。

初學可以知道它存在，但正式寫互動功能時，要更小心資料來源。

### 錯誤 3：資料和畫面混在一起

很多新手會讓資料散落在 DOM 裡，例如從畫面文字反推目前狀態。

比較好的做法是：

> 資料放在 JavaScript 裡，畫面只是資料的呈現。

這個想法正是 React 的基礎。

## 這篇學到什麼

- DOM 是瀏覽器把 HTML 轉成可操作的物件結構。
- JavaScript 可以透過 DOM 改變畫面。
- 小功能用 DOM 操作很直覺，功能變大後會變難維護。
- React 的核心價值，是讓你用「資料狀態」管理畫面，而不是到處手動改 DOM。

## 下一篇該讀什麼

下一篇請讀：

**Event 是什麼：點擊按鈕後發生什麼事**

因為只知道 DOM 還不夠。真正的互動來自使用者的動作，而使用者的動作在瀏覽器裡叫做 Event。
