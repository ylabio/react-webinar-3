import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';
import { generatedId } from './utils.js';

const store = new Store({
  list: [
    { code: generatedId(), title: 'Название элемента', selectedCounter : 0 },
    { code: generatedId(), title: 'Некий объект', selectedCounter : 0 },
    { code: generatedId(), title: 'Заголовок' , selectedCounter : 0 },
    { code: generatedId(), title: 'Очень длинное название элемента из семи слов' , selectedCounter : 0},
    { code: generatedId(), title: 'Запись' , selectedCounter : 0 },
    { code: generatedId(), title: 'Шестая запись' , selectedCounter : 0 },
    { code: generatedId(), title: 'Седьмая запись' , selectedCounter : 0},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
