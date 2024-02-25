import React from 'react';
import { pluralizeCounter } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;

    const handleAddItem = () => {
        store.addItem();
    };

    const handleSelectItem = (itemCode) => {
        store.selectItem(itemCode);
    };

    const handleDeleteItem = (e, itemCode) => {
        e.stopPropagation();
        store.deleteItem(itemCode);
    };

    return (
        <div className='App'>
            <div className='App-head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='App-controls'>
                <button onClick={() => handleAddItem()}>Добавить</button>
            </div>
            <div className='App-center'>
                <div className='List'>
                    {list.map((item) => (
                        <div key={item.code} className='List-item'>
                            <div
                                className={
                                    'Item' +
                                    (item.selected ? ' Item_selected' : '')
                                }
                                onClick={() => handleSelectItem(item.code)}
                            >
                                <div className='Item-code'>{item.code}</div>
                                <div className='Item-title'>
                                    {item.title}{' '}
                                    {item.selectCounter
                                        ? ` | Выделяли ${pluralizeCounter(
                                              item.selectCounter
                                          )}`
                                        : ''}
                                </div>

                                <div className='Item-actions'>
                                    <button
                                        onClick={(e) =>
                                            handleDeleteItem(e, item.code)
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
