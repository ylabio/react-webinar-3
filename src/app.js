import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, selectedItemCode} = store.getState();
  const createItemText = (item) => {
    const lastOne = item.selectedTimes % 10;
    const lastTwo = item.selectedTimes % 100;
    const ending = [2, 3, 4].includes(lastOne) && ![12, 13, 14].includes(lastTwo)
      ? 'a' : '';

    return item.selectedTimes === 0 ? item.title :
    `${item.title} | Выделяли ${item.selectedTimes} раз${ending}`
   }

   const handleDelete = (code) => (e) => {
    e.stopPropagation();
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
              <div className={'Item' + (item.code === selectedItemCode ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{createItemText(item)}</div>
                <div className='Item-actions'>
                  <button onClick={handleDelete(item.code)}>
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
