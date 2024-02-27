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
    const pluralize = (number) => {
        let num = Math.abs(number) % 100;
        const num1 = num % 10;
        if (num > 10 && num < 20) {
            return 'раз';
        }
        if (num1 > 1 && num1 < 5) {
            return 'раза';
        }
        if (num1 === 1) {
            return 'раз';
        }
        return 'раз';
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
                   onClick={(e) => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                  <div className='Item-title'>
                      {item.title} {item.selectCount ? `| выделяли ${item.selectCount} ${pluralize(item.selectCount)}` : ''}
                  </div>
                <div className='Item-actions'>
                  <button onClick={(e) => {
                      e.stopPropagation()
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
