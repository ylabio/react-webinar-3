import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const setEnding = (number) => {
    return ((number % 10 == 2 || number % 10 == 3 || number % 10 == 4) && number % 100 !== 12 && number % 100 !== 13 && number % 100 !== 14) && 'а';
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
                  {item.selectionCount > 0 &&
                    <span> | Выделяли {item.selectionCount} раз{setEnding(item.selectionCount)}</span>
                  }
                </div>
                <div className='Item-actions'>
                  <button onClick={(evt) => {
                    evt.stopPropagation()
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
