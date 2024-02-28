import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */

function pluralWord(n) {
    let rest10 = n % 10;
    let rest100 = n % 100;

    if (rest10 === 1 && rest100 !== 11) {
        return 'раз';
    } else if (rest10 >= 2 && rest10 <= 4 && (rest100 < 10 || rest100 >= 20)) {
        return 'раза';
    } else {
        return 'раз';
    }
}

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
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>

                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}</div>
                {item.count <= 0
                  ? <></>
                  : <div className='Item-count'><span>|</span> Выделяли {item.count} {pluralWord(item.count)}</div>
                }
                <div className='Item-actions'>
                  <button onClick={(e) => {
                      e.stopPropagation();
                      store.deleteItem(item.code);}}
                  >
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
