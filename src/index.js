import React from 'react';
import {
  createRoot
} from 'react-dom/client';
import App from './app.jsx';
import Store from './store.js';

const store = new Store({
  list: [{
      code: 1,
      title: 'Название элемента',
      highlited: 0
    },
    {
      code: 2,
      title: 'Некий объект',
      highlited: 0
    },
    {
      code: 3,
      title: 'Заголовок',
      highlited: 0
    },
    {
      code: 4,
      title: 'Очень длинное название элемента из семи слов',
      highlited: 0
    },
    {
      code: 5,
      title: 'Запись',
      highlited: 0
    },
    {
      code: 6,
      title: 'Шестая запись',
      highlited: 0
    },
    {
      code: 7,
      title: 'Седьмая запись',
      highlited: 0
    },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
      root.render( < App store = {
          store
        }
        />);
      });

    // Первый рендер приложения
    root.render( < App store = {
        store
      }
      />);