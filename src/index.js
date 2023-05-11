import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: Math.floor(Math.random() * 1000), title: 'Название элемента', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Некий объект', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Заголовок', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Очень длинное название элемента из семи слов', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Запись', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Шестая запись', selectedValue: 0, isSelected: false},
    {code: Math.floor(Math.random() * 1000), title: 'Седьмая запись', selectedValue: 0, isSelected: false},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
