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
  const selectedItemCode = store.getState().selectedItemCode;
  const counter = store.getState().counter;

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
              <div className={'Item' + (selectedItemCode === item.code ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-num'>№{index + 1}</div>
                <div className='Item-code'>code={item.code}</div>
                <div
                  className='Item-title'>{
                  item.title}{counter[item.code] && <>{` | Выделяли ${counter[item.code]} раз`}</>
                }</div>
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
