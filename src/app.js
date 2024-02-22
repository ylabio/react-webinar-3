import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
	const list = store.getState().list;
	// Функция для подсчета выделений элемента +1 каждый раз при выделении элемента

	// const countSelections = (code) => {
	// 	const selectedItems = list.filter(
	// 		(item) => item.code === code && item.selected
	// 	);
	// 	return selectedItems.length;
	// };

	return (
		<div className="App">
			<div className="App-head">
				<h1>Приложение на чистом JS</h1>
			</div>
			<div className="App-controls">
				<button onClick={() => store.addItem()}>Добавить</button>
			</div>
			<div className="App-center">
				<div className="List">
					{list.map((item) => (
						<div key={item.code} className="List-item">
							<div
								className={
									'Item' +
									(item.selected ? ' Item_selected' : '')
								}
								onClick={() => store.selectItem(item.code)}
							>
								<div className="Item-code">{item.code}</div>
								<div className="Item-title">
									{item.title}{' '}
									{store.getSelectionCount(item.code) > 0 && (
										<span>
											| Выделяли{' '}
											{store.getSelectionCount(item.code)}{' '}
											раз
										</span>
									)}
								</div>
								<div className="Item-actions">
									<button
										onClick={() =>
											store.deleteItem(item.code)
										}
									>
										Удалить
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
