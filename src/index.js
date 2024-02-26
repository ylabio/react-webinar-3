import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  lastCode: 7,
  selectedCode: -1,
  list: [
    {code: 1, selectedCount: 0, title: 'Название элемента'},
    {code: 2, selectedCount: 0, title: 'Некий объект'},
    {code: 3, selectedCount: 0, title: 'Заголовок'},
    {code: 4, selectedCount: 0, title: 'Очень длинное название элемента из семи слов'},
    {code: 5, selectedCount: 0, title: 'Запись'},
    {code: 6, selectedCount: 0, title: 'Шестая запись'},
    {code: 7, selectedCount: 0, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
