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
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{index + 1}</div>
                <div className='Item-title'>{item.title}</div>
                <span className={item.numberSelected > 0 && item?.selected === false ? 'Element' : 'No-element'}>
                  {''}
                </span>
                <div className={item.numberSelected > 0 ? 'Item-quantity-selected' : 'No-item-quantity-selected'}>
                  Выделяли {item.numberSelected}  {''}
                  {item.numberSelected === 1 ? 'раз' : (item.numberSelected > 1 && item.numberSelected < 5) ? 'раза' : 'раз'}
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
