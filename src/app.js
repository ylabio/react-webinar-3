import React, { useState } from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;

  const getEmit = (emit) => {
    const arNum = Array.from(String(emit));
    if(arNum[arNum.length -1] === '2' || arNum[arNum.length -1] === '3' || arNum[arNum.length -1] === '4') {
      if(arNum[arNum.length - 2] === '1') {
        return `| Выделяли ${emit} раз`
      }
      return `| Выделяли ${emit} раза`
    }
    return `| Выделяли ${emit} раз`
  };

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => {store.addItem(); console.log(store.getState())}}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => {store.selectItem(item.code); store.emitItem(item.code); console.log(store.getState())}}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title} {item.emit > 0 ? getEmit(item.emit) : " "}</div>
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
