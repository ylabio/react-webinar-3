import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import 'theme.css';

const store = new Store({
  list: [
    { title: 'Название товара', price: 100.0 },
    { title: 'Книга про React', price: 770 },
    { title: 'Конфета', price: 33 },
    { title: 'Трактор', price: 7955320 },
    { title: 'Телефон iPhone XIXV', price: 120000 },
    { title: 'Карандаши цветные', price: 111 },
    { title: 'Товар сюрприз', price: 0 },
  ],
  cartList: []
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
