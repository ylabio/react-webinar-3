import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Некий объект' },
    { code: 2, title: 'Заголовок' },
    { code: 3, title: 'Очень длинное название элемента из семи слов' },
    { code: 4, title: 'Запись' },
    { code: 5, title: 'Пятая запись' },
    { code: 6, title: 'Шестая запись' },
    { code: 7, title: 'Седьмая запись' },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
