import "@fontsource/montserrat-alternates/400.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Microsoft surface laptop 4', price: 100},
    { code: 2, title: 'Berserk', price: 770 },
    { code: 3, title: 'PS 5 Pro', price: 23 },
    { code: 4, title: 'porsche 911 gt3', price: 7955320 },
    { code: 5, title: 'GeForce RTX 4090', price: 120000 },
    { code: 6, title: 'Dark Souls 3', price: 111 },
    { code: 7, title: 'Dark Souls 2', price: 1 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
