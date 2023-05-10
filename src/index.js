import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import { createElement, nextId } from './utils.js';

const list = [
  {code: 1, title: 'Название элемента'},
  {code: 2, title: 'Некий объект'},
  {code: 3, title: 'Заголовок'},
  {code: 4, title: 'Очень длинное название элемента из семи слов'},
  {code: 5, title: 'Запись'},
  {code: 6, title: 'Шестая запись'},
  {code: 7, title: 'Седьмая запись'},
];

// может здесь это не очень, но счетчику так или иначе гдето надо задать текущее значение, или вызвать n раз
for (let i = 0; i < list.length; i++)
  list[i].code = nextId();

const store = new Store({
  list
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
