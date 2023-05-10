import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, generateId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {id: generateId(), code: 1, title: 'Название элемента'},
    {id: generateId(), code: 2, title: 'Некий объект'},
    {id: generateId(), code: 3, title: 'Заголовок'},
    {id: generateId(), code: 4, title: 'Очень длинное название элемента из семи слов'},
    {id: generateId(), code: 5, title: 'Запись'},
    {id: generateId(), code: 6, title: 'Шестая запись'},
    {id: generateId(), code: 7, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
