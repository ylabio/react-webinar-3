import React from 'react';
import {createRoot} from 'react-dom/client';
import { createElement, codeItems } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: codeItems(), title: 'Название элемента', count: 0},
    {code: codeItems(), title: 'Некий объект', count: 0},
    {code: codeItems(), title: 'Заголовок', count: 0},
    {code: codeItems(), title: 'Очень длинное название элемента из семи слов', count: 0},
    {code: codeItems(), title: 'Запись', count: 0},
    {code: codeItems(), title: 'Шестая запись', count: 0},
    {code: codeItems(), title: 'Седьмая запись', count: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
