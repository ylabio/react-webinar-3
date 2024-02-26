import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  function checkWord(count) {
    count = Math.abs(count) % 100;
    let num = count % 10;

    if ((count > 20 && (num > 1 && num < 5)) || (count > 1 && count < 5)) {
      return ' раза';
    }

    else return ' раз';
  };

  return (
    <div className='App' >
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
                <div className='Item-title'>{item.title}{item.count <= 0 ? (<></>) : (<span className={'Item-count'}>
                  {'Выделяли ' + item.count + checkWord(item.count)}
                </span>)}</div>
                <div className='Item-actions'>
                  <button onClickCapture={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
