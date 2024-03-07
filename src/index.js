import React from 'react';
import {createRoot} from 'react-dom/client';
import {generateCode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: generateCode(), title: 'Название товара', price: 100.0, count: 1},
    {code: generateCode(), title: 'Книга про React', price: 770, count: 1},
    {code: generateCode(), title: 'Конфета', price: 33, count: 1},
    {code: generateCode(), title: 'Трактор', price: 7955320, count: 1},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000, count: 1},
    {code: generateCode(), title: 'Карандаши цветные', price: 111, count: 1},
    {code: generateCode(), title: 'Товар сюрприз', price: 0, count: 1},
  ],
  orders: [],
  totalPrice: 'пусто',
  countOrders: ''
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
