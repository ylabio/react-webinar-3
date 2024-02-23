import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 300, title: 'Название элемента' },
    { code: 159, title: 'Некий объект' },
    { code: 407, title: 'Заголовок' },
    { code: 812, title: 'Очень длинное название элемента из семи слов' },
    { code: 546, title: 'Запись' },
    { code: 678, title: 'Шестая запись' },
    { code: 235, title: 'Седьмая запись' },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
