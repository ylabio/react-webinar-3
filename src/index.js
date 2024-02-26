import App from './app.js';
import React from 'react';
import Store from './store.js';
import { createRoot } from 'react-dom/client';
import { generateUniqueCode } from './utils.js';

const store = new Store({
  list: [
    { code: generateUniqueCode(), title: 'Название элемента' },
    { code: generateUniqueCode(), title: 'Некий объект' },
    { code: generateUniqueCode(), title: 'Заголовок' },
    { code: generateUniqueCode(), title: 'Очень длинное название элемента из семи слов' },
    { code: generateUniqueCode(), title: 'Запись' },
    { code: generateUniqueCode(), title: 'Шестая запись' },
    { code: generateUniqueCode(), title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
