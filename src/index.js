<<<<<<< HEAD
import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента'},
    {code: 2, title: 'Некий объект'},
    {code: 3, title: 'Заголовок'},
    {code: 4, title: 'Очень длинное название элемента из семи слов'},
    {code: 5, title: 'Запись'},
    {code: 6, title: 'Шестая запись'},
    {code: 7, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
=======
import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <App/>
  </StoreContext.Provider>
);
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
