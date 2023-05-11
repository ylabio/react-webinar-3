import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {getUniqId} from './utils'

const store = new Store({
    list: [
        {code: getUniqId(), title: 'Название элемента', counter: 0},
        {code: getUniqId(), title: 'Некий объект', counter: 0},
        {code: getUniqId(), title: 'Заголовок', counter: 0},
        {code: getUniqId(), title: 'Очень длинное название элемента из семи слов', counter: 0},
        {code: getUniqId(), title: 'Запись', counter: 0},
        {code: getUniqId(), title: 'Шестая запись', counter: 0},
        {code: getUniqId(), title: 'Седьмая запись', counter: 0},
    ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
    root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
