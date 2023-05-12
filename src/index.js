import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', selectedValue: 0, isSelected: false},
    {code: 2, title: 'Некий объект', selectedValue: 0, isSelected: false},
    {code: 3, title: 'Заголовок', selectedValue: 0, isSelected: false},
    {code: 4, title: 'Очень длинное название элемента из семи слов', selectedValue: 0, isSelected: false},
    {code: 5, title: 'Запись', selectedValue: 0, isSelected: false},
    {code: 6, title: 'Шестая запись', selectedValue: 0, isSelected: false},
    {code: 7, title: 'Седьмая запись', selectedValue: 0, isSelected: false},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
