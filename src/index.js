import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', desc: '', counter: 0},
    {code: 2, title: 'Некий объект', desc: '', counter: 0},
    {code: 3, title: 'Заголовок', desc: '', counter: 0},
    {code: 4, title: 'Очень длинное название элемента из семи слов', desc: '', counter: 0},
    {code: 5, title: 'Запись', desc: '', counter: 0},
    {code: 6, title: 'Шестая запись', desc: '', counter: 0},
    {code: 7, title: 'Седьмая запись', desc: '', counter: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
