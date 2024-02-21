import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', clickedCount: 0 },
    {code: 2, title: 'Некий объект', clickedCount: 0 },
    {code: 3, title: 'Заголовок', clickedCount: 0 },
    {code: 4, title: 'Очень длинное название элемента из семи слов', clickedCount: 0 },
    {code: 5, title: 'Запись', clickedCount: 0 },
    {code: 6, title: 'Шестая запись', clickedCount: 0 },
    {code: 7, title: 'Седьмая запись', clickedCount: 0 },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
