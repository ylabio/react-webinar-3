import React from 'react';
import {createRoot} from 'react-dom/client';
import ShopStore from './shop/shop_store.js';
import {generateCode} from "./utils.js";
import ShopApp from './shop/shop_app.js';

const shop_store = new ShopStore({
  list: [
    {code: generateCode(), title: 'Название товара', price: 100.0},
    {code: generateCode(), title: 'Книга про React', price: 770},
    {code: generateCode(), title: 'Конфета', price: 33},
    {code: generateCode(), title: 'Трактор', price: 7955320},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: generateCode(), title: 'Карандаши цветные', price: 111},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
  ],
  listBasket: [],
});

const document_root = document.getElementById('root');
const root = createRoot(document_root);

shop_store.subscribe(() => {
    root.render(<ShopApp store={shop_store}/>);
});

// Первый рендер приложения
root.render(<ShopApp store={shop_store}/>);
