# Event 是什麼：點擊按鈕後發生什麼事

## 這篇要解決的問題

React 裡你會一直看到這種寫法：

```jsx
<button onClick={handleClick}>點我</button>
```

但在學 React 的事件處理之前，你要先知道瀏覽器原本怎麼處理事件。

不然你會只記得：

> React 點擊用 `onClick`。

但你不會真的理解：

> 使用者點下去後，瀏覽器到底發生了什麼事？

這篇先用原生 JavaScript 把 Event 講清楚。

## 先用生活比喻理解

你可以把網頁想成一間店。

使用者進來後會做很多動作：

- 點按鈕。
- 在輸入框打字。
- 送出表單。
- 滑動頁面。
- 把滑鼠移到某張卡片上。

這些動作就像客人在店裡舉手、按服務鈴、拿起商品。

Event 就是瀏覽器說：

> 有事情發生了，要不要有人來處理？

而 JavaScript 的工作，就是安排一個處理函式：

> 如果發生 click，就執行這段程式。

## 最小可運行範例

```html
<button id="button">點我</button>

<script>
  const button = document.querySelector('#button');

  button.addEventListener('click', () => {
    alert('你點了按鈕');
  });
</script>
```

這段程式可以拆成三句話：

1. 找到按鈕。
2. 監聽按鈕的 `click` 事件。
3. 當 click 發生時，執行函式。

`addEventListener` 可以先記成：

> 當某件事發生時，請幫我執行這個函式。

## Event handler 是什麼

這個被執行的函式，通常叫做 event handler。

```js
function handleClick() {
  alert('你點了按鈕');
}

button.addEventListener('click', handleClick);
```

注意這裡是傳 `handleClick`，不是傳 `handleClick()`。

```js
button.addEventListener('click', handleClick);   // 正確
button.addEventListener('click', handleClick()); // 常見錯誤
```

差別是：

- `handleClick`：把函式交給瀏覽器，等 click 發生再執行。
- `handleClick()`：現在立刻執行函式，結果通常不是你要的。

這個觀念後面學 React `onClick={handleClick}` 也會用到。

## Event object：事件發生時的資訊

事件發生時，瀏覽器會把一包資訊交給你的 handler。

這包資訊通常叫 `event`。

```html
<input id="nameInput" placeholder="輸入你的名字" />
<p id="preview"></p>

<script>
  const input = document.querySelector('#nameInput');
  const preview = document.querySelector('#preview');

  input.addEventListener('input', (event) => {
    preview.textContent = `你輸入的是：${event.target.value}`;
  });
</script>
```

這裡的重點是：

```js
event.target.value
```

意思是：

> 這次事件發生在哪個元素上？那個元素現在的 value 是什麼？

所以輸入框每打一個字，畫面就能即時更新。

## 表單事件：submit

表單是前端非常常見的互動。

```html
<form id="form">
  <input id="email" placeholder="Email" />
  <button type="submit">送出</button>
</form>

<script>
  const form = document.querySelector('#form');
  const email = document.querySelector('#email');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert(`送出的 Email 是：${email.value}`);
  });
</script>
```

這裡有一個很重要的東西：

```js
event.preventDefault();
```

表單預設行為是送出後重新整理頁面。

但很多現代網頁不想整頁刷新，所以會先阻止預設行為，再用 JavaScript 自己處理資料。

這也是 React 表單會一直看到 `preventDefault` 的原因。

## 這和 React 有什麼關係

原生 JavaScript：

```js
button.addEventListener('click', handleClick);
```

React：

```jsx
<button onClick={handleClick}>點我</button>
```

兩者概念是一樣的：

> 當使用者做某件事，就執行某個函式。

只是 React 把事件綁定寫進 JSX 裡，讓 UI 和互動邏輯放在同一個元件中，比較容易閱讀與維護。

## 常見錯誤

### 錯誤 1：把 handler 立刻執行

```jsx
<button onClick={handleClick()}>點我</button>
```

這會在畫面渲染時就執行，不是點擊時才執行。

應該寫：

```jsx
<button onClick={handleClick}>點我</button>
```

### 錯誤 2：不知道 `event.target.value` 是什麼

輸入框的值通常從事件物件裡拿：

```js
event.target.value
```

先理解這件事，後面學 React controlled input 會順很多。

### 錯誤 3：忘記阻止表單預設刷新

如果你按 submit 後頁面突然刷新，通常就是忘了：

```js
event.preventDefault();
```

## 這篇學到什麼

- Event 是使用者或瀏覽器發生的動作。
- `addEventListener` 可以監聽事件。
- Event handler 是事件發生後要執行的函式。
- Event object 會提供事件相關資訊，例如 `event.target.value`。
- React 的 `onClick`、`onChange`、`onSubmit` 都是建立在這個觀念上。

## 下一篇該讀什麼

下一篇建議讀：

**不用 React 做 Todo，然後你就懂痛點**

因為 DOM 和 Event 都懂了之後，你就可以親手做一個原生 JavaScript Todo。

等你感受到手動管理 DOM 的麻煩，React 的價值就會變得非常自然。
