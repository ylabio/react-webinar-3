import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import 'src/style.css';
import { store } from "./store/instance";

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
