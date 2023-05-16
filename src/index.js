import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';


const store = new Store({
	list: [
		{ code: 1, id: 1, selectCount: 0, selected: null, title: 'Название элемента' },
		{ code: 2, id: 2, selectCount: 0, selected: null, title: 'Некий объект' },
		{ code: 3, id: 3, selectCount: 0, selected: null, title: 'Заголовок' },
		{ code: 4, id: 4, selectCount: 0, selected: null, title: 'Очень длинное название элемента из семи слов' },
		{ code: 5, id: 5, selectCount: 0, selected: null, title: 'Запись' },
		{ code: 6, id: 6, selectCount: 0, selected: null, title: 'Шестая запись' },
		{ code: 7, id: 7, selectCount: 0, selected: null, title: 'Седьмая запись' },
	]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
	root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
