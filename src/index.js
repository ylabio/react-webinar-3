import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement, prepareData } from './utils.js';
import App from './app.js';
import Store from './store.js';

const preparedData = prepareData([
  'Название элемента',
  'Некий объект',
  'Заголовок',
  'Очень длинное название элемента из семи слов',
  'Запись',
  'Шестая запись',
  'Седьмая запись'
])

const store = new Store({
  list: preparedData,
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
