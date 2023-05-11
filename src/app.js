import React, {useState} from 'react';
import {declOfNum, getUniqId} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
    const [inputValue, setInputValue] = useState('');

    const {list} = store.getState();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddItemClick()
        }
    };

    const handleAddItemClick = () => {
        if (!inputValue || !inputValue.trim()) return

        const newItem = {
            code: getUniqId(),
            title: inputValue,
            counter: 0,
        };

        store.addItem(newItem);
        setInputValue('');
    };

    return (
        <div className='App'>
            <div className='App-head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='App-controls'>
                <input onKeyUp={handleKeyPress} className='Input' placeholder='Введите название' type='text'
                       value={inputValue} onChange={event => setInputValue(event.target.value)}/>
                <button onClick={() => handleAddItemClick()}>Добавить</button>
            </div>
            <div className='App-center'>
                <div className='List'>{
                    list.map(item =>
                        <div key={item.code} className='List-item'>
                            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                                 onClick={() => store.selectItem(item.code)}>
                                <div className='Item-code'>{item.code}</div>
                                <div
                                    className='Item-title'>{item.title}
                                    {item.counter >= 1 ? ` Выделили ${item.counter} ${declOfNum(item.counter, ['раз', 'раза', 'раз'])}` : ''}
                                </div>
                                <div className='Item-actions'>
                                    <button onClick={() => store.deleteItem(item.code)}>
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
