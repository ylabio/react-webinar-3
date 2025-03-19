import React from 'react';
import { createRoot } from 'react-dom/client';
import {createElement, generateUniqueId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateUniqueId(), title: 'Название элемента' },
    { code: generateUniqueId(), title: 'Некий объект' },
    { code: generateUniqueId(), title: 'Заголовок' },
    { code: generateUniqueId(), title: 'Очень длинное название элемента из семи слов' },
    { code: generateUniqueId(), title: 'Запись' },
    { code: generateUniqueId(), title: 'Шестая запись' },
    { code: generateUniqueId(), title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
