import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
    const list = store.getState().list;

    //Задание 1 && Задание 3
    const [ selectedIndex, setSelectedIndex ] = React.useState(null)
    function handleItemClick(item) {
        if(selectedIndex === item.code){
            item.isSelecte = false
            setSelectedIndex(null)
        }else{
            item.isSelecte = true
            setSelectedIndex(item.code)
            item.selectedValue++
        }
    }

    // Задание 2
    // Находится в store.js в методе addItem()
    // Полю code присваивается случайное число от 0 до 1000


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
                    list.map((item, index) =>
                        <div key={item.code} className='List-item'>
                            <div className={`Item ${selectedIndex === item.code ? 'Item_selected' : ''}`}
                                 onClick={() => handleItemClick(item)}>
                                <div className='Item-code'>{index+1}</div>
                                <div className='Item-title'>{item.title} {item.selectedValue === 0 ? '' :( ' | Выделяли '+ item.selectedValue + ' раз')}</div>
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
