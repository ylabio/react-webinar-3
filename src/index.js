import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, GenerateId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: GenerateId(), title: 'Название элемента', selectionTotal: 0},
    {code: GenerateId(), title: 'Некий объект', selectionTotal: 0},
    {code: GenerateId(), title: 'Заголовок', selectionTotal: 0},
    {code: GenerateId(), title: 'Очень длинное название элемента из семи слов', selectionTotal: 0},
    {code: GenerateId(), title: 'Запись', selectionTotal: 0},
    {code: GenerateId(), title: 'Шестая запись', selectionTotal: 0},
    {code: GenerateId(), title: 'Седьмая запись', selectionTotal: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
