import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  lastId: 6,
  selectedIDs: -1,
  list: [
    {id: 0, code: 1, selectedCount: 0, title: 'Название элемента'},
    {id: 1, code: 2, selectedCount: 0, title: 'Некий объект'},
    {id: 2, code: 3, selectedCount: 0, title: 'Заголовок'},
    {id: 3, code: 4, selectedCount: 0, title: 'Очень длинное название элемента из семи слов'},
    {id: 4, code: 5, selectedCount: 0, title: 'Запись'},
    {id: 5, code: 6, selectedCount: 0, title: 'Шестая запись'},
    {id: 6, code: 7, selectedCount: 0, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
