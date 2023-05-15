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

  const countWord = (clicks) => {
    if (clicks == 2 || clicks == 3 || clicks == 4) {
      return 'раза';
    }
    if (clicks > 20 && (clicks % 10 == 2 || clicks % 10 == 3 || clicks % 10 == 4)) {
      return 'раза';
    }
    return 'раз';
  };

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map((item, i) => (
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}</div>
                {item.clicks > 0 && (
                  <div className='Item-clicks'>Выделяли {item.clicks} {countWord(item.clicks)}</div>
                )}
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
