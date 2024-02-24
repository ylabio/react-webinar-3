import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

    const pluralizeTimes = (n) => {
        // Определение последней цифры числа
        const lastDigit = n %  10;
        // Определение второрой последней цифры числа
        const secondLastDigit = Math.floor(n /  10) %  10;

        // Проверка последней цифры на соответствие условиям плюрализации
        if (lastDigit ===  1 && secondLastDigit !==  1) {
            return "раз";
        } else if (lastDigit >=  2 && lastDigit <=  4 && secondLastDigit !==  1) {
            return "раза";
        } else {
            return "раз";
        }
    }

    const list = store.getState().list;

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
                                <div className='Item-info'>
                                    <div className='Item-title'>{item.title}</div>
                                    {
                                        (item.selectionCounter !== 0) &&
                                        <div className='Item-counter'>
                                            | Выделяли {item.selectionCounter} {pluralizeTimes(item.selectionCounter)}
                                        </div>
                                    }
                                </div>
                                <div className='Item-actions'>
                                    <button onClick={(event) => {
                                        event.stopPropagation(); // Предотвращаем всплытие
                                        store.deleteItem(item.code);
                                    }}>
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
