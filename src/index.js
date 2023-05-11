import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';
import {globalCodeGenerator} from './utils.js';

const store = new Store({
  list: [
    {code: globalCodeGenerator(), title: 'Название элемента'},
    {code: globalCodeGenerator(), title: 'Некий объект'},
    {code: globalCodeGenerator(), title: 'Заголовок'},
    {
      code: globalCodeGenerator(),
      title: 'Очень длинное название элемента из семи слов',
    },
    {code: globalCodeGenerator(), title: 'Запись'},
    {code: globalCodeGenerator(), title: 'Шестая запись'},
    {code: globalCodeGenerator(), title: 'Седьмая запись'},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
