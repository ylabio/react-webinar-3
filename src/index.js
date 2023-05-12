import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import { generateCode } from './store.js';

const store = new Store({
  list: [
    { code: generateCode(), title: 'Название элемента', timesSelected: 0 },
    { code: generateCode(), title: 'Некий объект', timesSelected: 0 },
    { code: generateCode(), title: 'Заголовок', timesSelected: 0 },
    {
      code: generateCode(),
      title: 'Очень длинное название элемента из семи слов',
      timesSelected: 0,
    },
    { code: generateCode(), title: 'Запись', timesSelected: 0 },
    { code: generateCode(), title: 'Шестая запись', timesSelected: 0 },
    { code: generateCode(), title: 'Седьмая запись', timesSelected: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
