import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

function makeCounter() {
  let count = 1;
  return function () {
    return count++;
  };
}
let x = makeCounter();
//
let init = [
  { title: 'Название элемента', count: 0 },
  { title: 'Некий объект', count: 0 },
  { title: 'Заголовок', count: 0 },
  { title: 'Очень длинное название элемента из семи слов', count: 0 },
  { title: 'Запись', count: 0 },
  { title: 'Шестая запись', count: 0 },
  { title: 'Седьмая запись', count: 0 },
];
let list = init.map(item => ({ ...item, code: x() }));
const store = new Store({ list });

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
