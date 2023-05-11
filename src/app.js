import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const checkPickCount = (pickCount) => {
    const arrCount = (pickCount.toString().split(''))
    const twoCountNumber = Number(arrCount[arrCount.length - 2])
    const lastCountNumber = Number(arrCount[arrCount.length - 1])
    if (twoCountNumber === 1 && lastCountNumber > 1 && lastCountNumber < 5) {
      return ` | Выделяли ${pickCount} раз`
    } else if ( lastCountNumber > 1 && lastCountNumber < 5) {
      return ` | Выделяли ${pickCount} раза`
    } else {
      return ` | Выделяли ${pickCount} раз`
    }
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
                <div className='Item-title'>{item.title}<span>{item.pickCount > 0 && checkPickCount(item.pickCount)}</span></div>
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
