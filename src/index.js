import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название элемента', selectionCount : 0, selected: false },
    { code: 2, title: 'Некий объект', selectionCount: 0, selected: false },
    { code: 3, title: 'Заголовок', selectionCount: 0, selected: false },
    { code: 4, title: 'Очень длинное название элемента из семи слов', selectionCount: 0, selected: false },
    { code: 5, title: 'Запись', selectionCount: 0, selected: false },
    { code: 6, title: 'Шестая запись', selectionCount: 0, selected: false },
    { code: 7, title: 'Седьмая запись', selectionCount: 0, selected: false },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
