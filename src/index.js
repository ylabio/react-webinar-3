import React from 'react';
import { createRoot } from 'react-dom/client';
import {createElement, generateUniqueId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateUniqueId(), title: 'Название элемента', selectCount: 0 },
    { code: generateUniqueId(), title: 'Некий объект', selectCount: 0 },
    { code: generateUniqueId(), title: 'Заголовок', selectCount: 0 },
    { code: generateUniqueId(), title: 'Очень длинное название элемента из семи слов', selectCount: 0 },
    { code: generateUniqueId(), title: 'Запись', selectCount: 0 },
    { code: generateUniqueId(), title: 'Шестая запись', selectCount: 0 },
    { code: generateUniqueId(), title: 'Седьмая запись', selectCount: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
