import React from 'react';
import { createRoot } from 'react-dom/client';
import { incrementer } from './utils.js';
import App from './app.js';
import Store from './store.js';
import 'src/style.css';

const store = new Store({
  list: [
    { code: incrementer(), title: 'Название товара', price: 100.0 },
    { code: incrementer(), title: 'Книга про React', price: 770 },
    { code: incrementer(), title: 'Конфета', price: 33 },
    { code: incrementer(), title: 'Трактор', price: 7955320 },
    { code: incrementer(), title: 'Телефон iPhone XIXV', price: 120000 },
    { code: incrementer(), title: 'Карандаши цветные', price: 111 },
    { code: incrementer(), title: 'Товар сюрприз', price: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
