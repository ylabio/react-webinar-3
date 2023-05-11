import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {getCurrentIndex} from './utils.js';

const store = new Store({
  list: [
    {code: getCurrentIndex(), title: 'Название элемента', clicked: 0},
    {code: getCurrentIndex(), title: 'Некий объект', clicked: 0},
    {code: getCurrentIndex(), title: 'Заголовок', clicked: 0},
    {code: getCurrentIndex(), title: 'Очень длинное название элемента из семи слов', clicked: 0},
    {code: getCurrentIndex(), title: 'Запись', clicked: 0},
    {code: getCurrentIndex(), title: 'Шестая запись', clicked: 0},
    {code: getCurrentIndex(), title: 'Седьмая запись', clicked: 0},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
