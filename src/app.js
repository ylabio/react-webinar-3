import React, { useState } from 'react'
import {createElement, getCase} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

	const [count, click] = useState({});
	const setClick = code =>
		click(() => ({ ...count, [code]: (count[code] || 0) + 1 }))

  return (
		<div className='App'>
			<div className='App-head'>
				<h1>Приложение на чистом JS</h1>
			</div>
			<div className='App-controls'>
				<button onClick={() => store.addItem()}>Добавить</button>
			</div>
			<div className='App-center'>
				<div className='List'>
					{list.map(item => (
						<div key={item.code} className='List-item'>
							<div className={'Item' + (item.selected ? ' Item_selected' : '')}
							onClick={() => {
									store.selectItem(item.code)
									if (!item.selected) setClick(item.code)}}>
								<div className='Item-code'>
									{item.code}
								</div>
								<div className='Item-title'>
									{item.title} {count[item.code] > 0 ? `| Выделяли ${count[item.code] + getCase(count[item.code])}` : ''}
								</div>
								<div className='Item-actions'>
									<button onClick={(e) => {
										e.stopPropagation()	// Теперь удаление не снимает выделение с др записи
										store.deleteItem(item.code)}}>
										Удалить
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App;
