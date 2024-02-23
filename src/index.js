import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

import { getElementCode } from './utils.js';

const store = new Store({
  list: [
    {code: getElementCode(), title: 'Название элемента', selectCount: 0},
    {code: getElementCode(), title: 'Некий объект', selectCount: 0},
    {code: getElementCode(), title: 'Заголовок', selectCount: 0},
    {code: getElementCode(), title: 'Очень длинное название элемента из семи слов', selectCount: 0},
    {code: getElementCode(), title: 'Запись', selectCount: 0},
    {code: getElementCode(), title: 'Шестая запись', selectCount: 0},
    {code: getElementCode(), title: 'Седьмая запись', selectCount: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
