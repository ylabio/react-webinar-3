import React from 'react';
import {createRoot} from 'react-dom/client';
import {getId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: getId(), title: 'Название элемента'},
    {code: getId(), title: 'Некий объект'},
    {code: getId(), title: 'Заголовок'},
    {code: getId(), title: 'Очень длинное название элемента из семи слов'},
    {code: getId(), title: 'Запись'},
    {code: getId(), title: 'Шестая запись'},
    {code: getId(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
