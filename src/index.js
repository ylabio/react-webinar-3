import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';

const store = new Store({
  list: [
    { code: 1, title: 'Название элемента', selectionCount: 0 },
    { code: 2, title: 'Некий объект', selectionCount: 0 },
    { code: 3, title: 'Заголовок', selectionCount: 0 },
    {
      code: 4,
      title: 'Очень длинное название элемента из семи слов',
      selectionCount: 0,
    },
    { code: 5, title: 'Запись', selectionCount: 0 },
    { code: 6, title: 'Шестая запись', selectionCount: 0 },
    { code: 7, title: 'Седьмая запись', selectionCount: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
