import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement, createateUniqueId } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: createateUniqueId(), title: 'Название элемента', countSelected: 0 },
    { code: createateUniqueId(), title: 'Некий объект', countSelected: 0 },
    { code: createateUniqueId(), title: 'Заголовок', countSelected: 0 },
    {
      code: createateUniqueId(),
      title: 'Очень длинное название элемента из семи слов',
      countSelected: 0,
    },
    { code: createateUniqueId(), title: 'Запись', countSelected: 0 },
    { code: createateUniqueId(), title: 'Шестая запись', countSelected: 0 },
    { code: createateUniqueId(), title: 'Седьмая запись', countSelected: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
