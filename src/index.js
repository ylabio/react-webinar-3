import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement, generateID } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: generateID(), title: 'Название элемента'},
    {code: generateID(), title: 'Некий объект'},
    {code: generateID(), title: 'Заголовок'},
    {code: generateID(), title: 'Очень длинное название элемента из семи слов'},
    {code: generateID(), title: 'Запись'},
    {code: generateID(), title: 'Шестая запись'},
    {code: generateID(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
