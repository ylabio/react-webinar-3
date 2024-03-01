import React from 'react';
import {createRoot} from 'react-dom/client';
<<<<<<< HEAD
import {createElement} from './utils.js';
=======
import {generateCode} from './utils.js';
>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
<<<<<<< HEAD
    {code: 1, title: 'Название элемента'},
    {code: 2, title: 'Некий объект'},
    {code: 3, title: 'Заголовок'},
    {code: 4, title: 'Очень длинное название элемента из семи слов'},
    {code: 5, title: 'Запись'},
    {code: 6, title: 'Шестая запись'},
    {code: 7, title: 'Седьмая запись'},
=======
    {code: generateCode(), title: 'Название товара', price: 100.0},
    {code: generateCode(), title: 'Книга про React', price: 770},
    {code: generateCode(), title: 'Конфета', price: 33},
    {code: generateCode(), title: 'Трактор', price: 7955320},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: generateCode(), title: 'Карандаши цветные', price: 111},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
