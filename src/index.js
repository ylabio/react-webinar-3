import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', selectedCounter: 0, selected: false},
    {code: 2, title: 'Некий объект', selectedCounter: 0, selected: false},
    {code: 3, title: 'Заголовок', selectedCounter: 0, selected: false},
    {code: 4, title: 'Очень длинное название элемента из семи слов', selectedCounter: 0, selected: false},
    {code: 5, title: 'Запись', selectedCounter: 0, selected: false},
    {code: 6, title: 'Шестая запись', selectedCounter: 0, selected: false},
    {code: 7, title: 'Седьмая запись', selectedCounter: 0, selected: false},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
