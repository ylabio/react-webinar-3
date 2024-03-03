import React, { useCallback } from 'react';
import Controls from './components/controls/index.js';
import Head from './components/head/index.js';
import List from './components/list/index.js';
import PageLayout from './components/page-layout/index.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
	console.log('App');

	const list = store.getState().list;

	const callbacks = {
		onDeleteItem: useCallback(
			(code) => {
				store.deleteItem(code);
			},
			[store],
		),
		onSelectItem: useCallback(
			(code) => {
				store.selectItem(code);
			},
			[store],
		),
		onAddItem: useCallback(() => {
			store.addItem();
		}, [store]),
	};

	return (
		<PageLayout>
			<Head title="Приложение на чистом JS" />
			<Controls onAdd={callbacks.onAddItem} />
			<List
				list={list}
				onDeleteItem={callbacks.onDeleteItem}
				onSelectItem={callbacks.onSelectItem}
			/>
		</PageLayout>
	);
}

export default App;
