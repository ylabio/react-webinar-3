import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal/index.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
	const [activeModal, setActiveModal] = useState(false);

	const list = store.getState().list;

	const callbacks = {
		onAddItem: useCallback((code) => {
			store.addItemInBucket(code);
		}),

		onOpenModal: useCallback(() => {
			setActiveModal(!activeModal);
		}),
	};

	return (
		<PageLayout>
			<Head title="Магазин" />
			<Controls onOpenModal={callbacks.onOpenModal} store={store} />
			<List list={list} onAddItem={callbacks.onAddItem}  store={store}/>
			<Modal title="Корзина" active={activeModal} onOpenModal={callbacks.onOpenModal} store={store} />
		</PageLayout>
	);
}

export default App;
