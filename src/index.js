import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils/generateCode.js';
import App from './app.js';
import Store from './store.js';
import 'theme.css';

const store = new Store({
  list: [
    { code: generateCode(), title: 'Название товара', price: 100.0, inCart: false, count: 0 },
    { code: generateCode(), title: 'Книга про React', price: 770, inCart: false, count: 0 },
    { code: generateCode(), title: 'Конфета', price: 33, inCart: false, count: 0 },
    { code: generateCode(), title: 'Трактор', price: 7955320, inCart: false, count: 0 },
    { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000, inCart: false, count: 0 },
    { code: generateCode(), title: 'Карандаши цветные', price: 111, inCart: false, count: 0 },
    { code: generateCode(), title: 'Товар сюрприз', price: 0, inCart: false, count: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
