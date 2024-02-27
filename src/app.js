import React, {useState} from 'react';
import {createIdGenerator} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const changeFormatCountWord = (count) => {
      return (count % 100 < 10 || count % 100 > 20) && count % 10 === 1 && count !== 11
          ? 'раз'
          : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 > 20)
              ? 'раза'
              : 'раз';
  }

  const handleClick = (code) => {
      const selectedItem = store.getState().list.find(item => item.selected);

      if (selectedItem && selectedItem.code === code) {
          store.selectItem(code);
      } else {
          store.incrementCountClicks(code);
          store.selectItem(code);
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
                   onClick={() => handleClick(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                    {item.title}
                    {item.count > 0 && <span> | Выделяли {item.count} {changeFormatCountWord(item.count)}</span>}
                </div>
                <div className='Item-actions'>
                  <button onClick={(evt) => {
                      evt.stopPropagation();
                      store.deleteItem(item.code)
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
