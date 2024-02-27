import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', selectCount: 0, countForm: 'раз'},
    {code: 2, title: 'Некий объект', selectCount: 0, countForm: 'раз'},
    {code: 3, title: 'Заголовок', selectCount: 0, countForm: 'раз'},
    {
      code: 4,
      title: 'Очень длинное название элемента из семи слов',
      selectCount: 0,
      countForm: 'раз'
    },
    {code: 5, title: 'Запись', selectCount: 0, countForm: 'раз'},
    {code: 6, title: 'Шестая запись', selectCount: 0, countForm: 'раз'},
    {code: 7, title: 'Седьмая запись', selectCount: 0, countForm: 'раз'},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
