import React from 'react';
import './styles.css';
import {morph} from './utils.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
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
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title} 
                  <span className='NumberOfSelects'>
                    {item.numberOfSelects === 0 ? '' : ` | выделялось ${item.numberOfSelects} ${morph(item.numberOfSelects)}`}
                  </span>
                </div>
                <div className='Item-actions'>
                  <button onClick={(event) => store.deleteItem(event, item.code)}>
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
