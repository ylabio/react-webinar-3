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

    function makePlur(n) {
        let titles = ["раз", "раза", "раз"]
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }

    function removeItem(e, code) {
        e.stopPropagation()
        store.deleteItem(code)
    }
    return (
        <div className='App'>
            <div className='App-head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='App-controls'>
                <button onClick={() => store.addItem()}>Добавить</button>
            </div>
            <div className='App-center'>
                <div className='List'>{
                    list.map(item =>
                        <div key={item.code} className='List-item'>
                            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                                onClick={() => store.selectItem(item.code)}>
                                <div className='Item-code'>{item.code}</div>
                                <div className='Item-title'>
                                    <span>{item.title}</span>
                                    <span>{item.count > 0 && ` | Выделяли ${item.count} ${makePlur(item.count)} `}</span>
                                </div>
                                <div className='Item-actions'>
                                    <button onClick={(e) => removeItem(e, item.code)}>Удалить</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
