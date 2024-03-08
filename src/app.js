import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const toAddNumorus = [2,3,4]
  const extensionsToAvoidNumorus = [12,13,14]
  const list = store.getState().list;

  function checkOnNumorus(amount){
    const hint = (toAddNumorus.includes(amount % 10) && !extensionsToAvoidNumorus.includes(amount % 100)) ? 'раза' : 'раз'
    return hint
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
                <div className='Item-title'>{item.title} {(item.amount > 0)  ? `| ${item.amount} ${checkOnNumorus(item.amount)}` : null} </div>
                <div className='Item-actions'>
                  <button onClick={(e) => store.deleteItem(e, item.code)}>
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
