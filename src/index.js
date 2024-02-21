import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', selectedTimes : 0},
    {code: 2, title: 'Некий объект', selectedTimes : 0},
    {code: 3, title: 'Заголовок', selectedTimes : 0},
    {code: 4, title: 'Очень длинное название элемента из семи слов', selectedTimes : 0},
    {code: 5, title: 'Запись', selectedTimes : 0},
    {code: 6, title: 'Шестая запись', selectedTimes : 0},
    {code: 7, title: 'Седьмая запись', selectedTimes : 0},
  ],
  selectedItemCode: undefined
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
