import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {generateUniqueId} from "./utils";

const store = new Store({
  list: [
    {code: generateUniqueId(), title: 'Название элемента', clickCount: 0},
    {code: generateUniqueId(), title: 'Некий объект', clickCount: 0},
    {code: generateUniqueId(), title: 'Заголовок', clickCount: 0},
    {code: generateUniqueId(), title: 'Очень длинное название элемента из семи слов', clickCount: 0},
    {code: generateUniqueId(), title: 'Запись', clickCount: 0},
    {code: generateUniqueId(), title: 'Шестая запись', clickCount: 0},
    {code: generateUniqueId(), title: 'Седьмая запись', clickCount: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
