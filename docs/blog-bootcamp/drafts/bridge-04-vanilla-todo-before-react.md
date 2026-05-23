# 不用 React 做 Todo，然後你就懂痛點

## 這篇要解決的問題

很多 React 教學一開始會說：

> React 是一個用來建立使用者介面的 JavaScript Library。

這句話沒有錯，但對初學者沒什麼幫助。

比較好的學法是：先不用 React，自己用 HTML + JavaScript 做一個小功能。

等你親手做過一次，你就會開始懂：

> 原來 React 不是為了炫技，而是為了解決畫面越來越難管理的問題。

這篇我們先做一個最小 Todo List。

功能很簡單：

- 輸入待辦事項。
- 按下新增。
- 顯示清單。
- 可以刪除項目。
- 顯示目前總共有幾筆。

## 先做出可以動的版本

你可以把下面存成 `todo.html`，直接用瀏覽器打開。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Vanilla Todo</title>
  </head>
  <body>
    <h1>Todo List</h1>

    <input id="todoInput" placeholder="輸入待辦事項" />
    <button id="addButton">新增</button>

    <p>目前共有 <span id="count">0</span> 筆待辦</p>
    <ul id="todoList"></ul>

    <script>
      const todos = [];

      const input = document.querySelector('#todoInput');
      const addButton = document.querySelector('#addButton');
      const list = document.querySelector('#todoList');
      const count = document.querySelector('#count');

      function render() {
        list.innerHTML = '';

        todos.forEach((todo, index) => {
          const item = document.createElement('li');
          item.innerHTML = `
            <span>${todo}</span>
            <button onclick="deleteTodo(${index})">刪除</button>
          `;
          list.appendChild(item);
        });

        count.textContent = todos.length;
      }

      function addTodo() {
        const value = input.value.trim();
        if (value === '') return;

        todos.push(value);
        input.value = '';
        render();
      }

      function deleteTodo(index) {
        todos.splice(index, 1);
        render();
      }

      addButton.addEventListener('click', addTodo);
    </script>
  </body>
</html>
```

這個版本可以正常運作。

你輸入文字，按新增，畫面會出現項目；按刪除，項目會消失；數字也會更新。

看起來沒問題，對吧？

問題是：這只是最小版本。

## 這段程式其實有三件事混在一起

我們仔細看 `addTodo`：

```js
function addTodo() {
  const value = input.value.trim();
  if (value === '') return;

  todos.push(value);
  input.value = '';
  render();
}
```

它同時做了三件事：

1. 從畫面讀取輸入框的值。
2. 修改 `todos` 資料。
3. 手動呼叫 `render()` 更新畫面。

再看 `deleteTodo`：

```js
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}
```

它也是：

1. 修改資料。
2. 手動更新畫面。

目前只有兩個功能，所以還能接受。

但如果再加功能呢？

## 加功能後，痛點就出來了

假設你想加這些功能：

- 勾選完成。
- 只顯示未完成。
- 編輯項目文字。
- 儲存到 localStorage。
- 顯示「已完成 3 筆，未完成 2 筆」。
- 空清單時顯示提示文字。

你會開始到處想：

> 我改了資料後，要記得更新哪幾個 DOM？  
> 這裡是不是也要呼叫 `render()`？  
> 計數器有沒有更新？  
> 清單狀態和畫面會不會不同步？

這就是問題。

不是 JavaScript 做不到，而是當畫面越來越複雜，你會花很多力氣在「同步資料和畫面」。

## 最大痛點：資料和畫面需要手動同步

目前我們的資料在這裡：

```js
const todos = [];
```

畫面在這裡：

```html
<ul id="todoList"></ul>
<span id="count">0</span>
```

每次 `todos` 改變，你都要手動讓畫面跟著改。

如果忘記呼叫 `render()`，資料已經變了，但畫面不會變。

這種 bug 很煩，因為程式不一定會報錯，但使用者看到的畫面是錯的。

## React 的切入點

React 想解決的核心問題可以先簡化成一句話：

> 你負責描述資料長什麼樣子，React 負責讓畫面跟資料同步。

用 React 的思維，你不會一直想：

> 我要清空哪個 DOM？  
> 我要 append 哪個元素？  
> 我要改哪個 span 的 textContent？

你會改成想：

> 現在 `todos` 是什麼？  
> 如果 `todos` 有 3 筆，畫面應該長什麼樣子？  
> 如果 `todos` 變成 2 筆，React 會幫我更新畫面。

這就是 React 的第一個大價值。

## React 版本長什麼樣子

先不用急著完全看懂，先感受差異。

```jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (input.trim() === '') return;
    setTodos([...todos, input]);
    setInput('');
  }

  function deleteTodo(indexToDelete) {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div>
      <h1>Todo List</h1>

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="輸入待辦事項"
      />
      <button onClick={addTodo}>新增</button>

      <p>目前共有 {todos.length} 筆待辦</p>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            <span>{todo}</span>
            <button onClick={() => deleteTodo(index)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

你現在不用完全懂 `useState`、`map`、`key`。

只要先看懂一件事：

React 版本沒有 `document.querySelector`，也沒有 `list.innerHTML = ''`。

你描述：

```jsx
{todos.map(...)}
```

React 幫你把資料變成畫面。

## 用餐廳比喻理解

原生 DOM 操作像是你自己當店長、廚師、服務生、收銀員。

每次客人點餐，你都要：

- 記錄訂單。
- 通知廚房。
- 端菜。
- 更新看板。
- 算目前幾桌。

React 比較像你建立一套流程：

> 訂單資料一改，看板和出餐狀態就跟著同步。

你還是要設計資料怎麼變，但不用每次親手跑去改每一個畫面角落。

## 常見錯誤

### 錯誤 1：以為 React 是因為原生 JS 做不到

原生 JavaScript 做得到很多事。

React 的價值不是「能做原生 JS 做不到的事」，而是讓複雜 UI 更好維護。

### 錯誤 2：一開始就背 Hook

如果你還不知道手動 DOM 操作痛在哪裡，一開始背 `useState` 會很抽象。

先理解痛點，再學工具，會輕鬆很多。

### 錯誤 3：資料直接藏在畫面裡

不要把 DOM 當資料庫。

比較好的方向是：資料放在 JavaScript 狀態裡，畫面根據資料產生。

React 正是把這個方向變成日常寫法。

## 這篇學到什麼

- 原生 JavaScript 可以做互動網頁。
- 功能越多，手動同步資料和 DOM 越容易出錯。
- React 的核心價值是讓畫面跟資料同步變得更可控。
- React 不是從定義開始學，而是從痛點開始學。

## 下一篇該讀什麼

下一篇請讀：

**JSX 不是 HTML：React 畫面的語法**

因為 React 會用一種很像 HTML、但其實是 JavaScript 的語法描述畫面。那個語法就是 JSX。
