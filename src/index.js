import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils.js';
import App from './app.js';
import MainStore from './store/products-store.js';
import CartStore from './store/cart-store.js';

const state = {
  store: new MainStore({
    list: [
      { code: generateCode(), title: 'Название товара', price: 100.0 },
      { code: generateCode(), title: 'Книга про React', price: 770 },
      { code: generateCode(), title: 'Конфета', price: 33 },
      { code: generateCode(), title: 'Трактор', price: 7955320 },
      { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000 },
      { code: generateCode(), title: 'Карандаши цветные', price: 111 },
      { code: generateCode(), title: 'Товар сюрприз', price: 0 },
    ],
  }),

  cart: new CartStore([]),
};

const root = createRoot(document.getElementById('root'));

state.store.subscribe(() => {
  root.render(<App state={state} />);
});

state.cart.subscribe(() => {
  root.render(<App state={state} />);
});

// Первый рендер приложения
root.render(<App state={state} />);
