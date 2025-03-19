import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';
import { generatedId } from './utils.js';

const store = new Store({
  list: [
    { code: generatedId(), title: 'Название элемента' },
    { code: generatedId(), title: 'Некий объект' },
    { code: generatedId(), title: 'Заголовок' },
    { code: generatedId(), title: 'Очень длинное название элемента из семи слов' },
    { code: generatedId(), title: 'Запись' },
    { code: generatedId(), title: 'Шестая запись' },
    { code: generatedId(), title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
