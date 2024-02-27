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
    const convertWord = function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles [(number%100>4 && number%100<20) ? 2 : cases [(number%10<5) ? number%10:5]]
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
                                    {item.title} 
                                    {item.select
                                        ? `| Выделяли ${item.select} ${convertWord(item.select, ['раз', 'раза', 'раз'])}`
                                        : ''}</div>
                                <div className='Item-actions'>
                                    <button onClick={(event) => store.deleteItem(event, item.code)}>
                                        Удалить
                                    </button>
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
