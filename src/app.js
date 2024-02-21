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
						<ListItem
							key={item.code}
							item={item}
							store={store}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function ListItem({ item, store }) {
	const handleToggleSelection = () => {
		store.selectItem(item.code);
		store.incrementSelections(item.code);
	};

	return (
		<div className="List-item">
			<div
				className={'Item' + (item.selected ? ' Item_selected' : '')}
				onClick={handleToggleSelection}
			>
				<div className="Item-code">{item.code}</div>
				<div className="Item-title">{item.title}</div>
				<div className="Item-actions">
					<button
						onClick={(event) => store.deleteItem(item.code, event)}
					>
						Удалить
					</button>
				</div>
			</div>
			{item.selections > 0 && (
				<div className="Item-selections">
					Выделяли {item.selections} раз
				</div>
			)}
		</div>
	);
}

export default App;
