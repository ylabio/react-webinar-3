import {generateCode} from './utils.js';

export const mainList = ['code', 'title', 'price', 'add'];
export const modalList = ['code', 'title', 'price', 'count', 'delete'];

export const initList = [
    {code: generateCode(), title: 'Название товара', price: 100.0},
    {code: generateCode(), title: 'Книга про React', price: 770},
    {code: generateCode(), title: 'Конфета', price: 33},
    {code: generateCode(), title: 'Трактор', price: 7955320},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: generateCode(), title: 'Карандаши цветные', price: 111},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
  ];