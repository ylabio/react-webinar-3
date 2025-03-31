import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils.js';
import App from './app.js';
import Store from './store.js';
import 'theme.css';

const store = new Store({
  list: [
    { type: 'item', code: generateCode(), title: 'Название товара', price: 100.0 },
    { type: 'item', code: generateCode(), title: 'Книга про React', price: 770 },
    { type: 'item', code: generateCode(), title: 'Конфета', price: 33 },
    { type: 'item', code: generateCode(), title: 'Трактор', price: 7955320 },
    { type: 'item', code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000 },
    { type: 'item', code: generateCode(), title: 'Карандаши цветные', price: 111 },
    { type: 'item', code: generateCode(), title: 'Товар сюрприз', price: 0 },
  ],
  newlist: [],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
