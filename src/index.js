import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название элемента', price: 100 },
    { code: 2, title: 'Некий объект', price: 770 },
    { code: 3, title: 'Заголовок', price: 23 },
    { code: 4, title: 'Очень длинное название элемента из семи слов', price: 7955320 },
    { code: 5, title: 'Запись', price: 120000 },
    { code: 6, title: 'Шестая запись', price: 111 },
    { code: 7, title: 'Седьмая запись', price: 1 },
  ],
  shoppingCart: [],
  sum: 0,
  quantity: 0,
  isOpen: false,
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
