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
  function form(num) {
    if (num % 100 >= 11 && num % 100 <= 20) {
      return num + ' раз';
    } else {
      switch (num % 10) {
        case 1:
          return num + ' раз';
        case 2:
        case 3:
        case 4:
          return num + ' раза';
        default:
          return num + ' раз';
      }
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
                <div className='Item-title'>{item.title}{item.choiceCount > 0 ? ` | Выделяли ${form(item.choiceCount)}` : ''}</div>
                <div className='Item-actions'>
                  <button onClick={(b) => {
                    b.stopPropagation(); 
                    store.deleteItem(item.code);}}>
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
