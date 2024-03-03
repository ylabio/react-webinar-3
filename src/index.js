import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import { generateCode } from './utils.js';

const list = [
	{ code: generateCode(), title: 'Название элемента' },
	{ code: generateCode(), title: 'Некий объект' },
	{ code: generateCode(), title: 'Заголовок' },
	{ code: generateCode(), title: 'Очень длинное название элемента из семи слов' },
	{ code: generateCode(), title: 'Запись' },
	{ code: generateCode(), title: 'Шестая запись' },
	{ code: generateCode(), title: 'Седьмая запись' },
];

const store = new Store({
	list,
	index: list.length + 1,
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
	root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
