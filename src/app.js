import React from 'react';
import { createElement, getNoun } from './utils.js';
import './styles.css';

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
                   onClick={(e) => store.selectItem(e, item.code)}>
                <div className="Item-info">
                  <div className="Item-info__code">{item.code}</div>
                  <div className="Item-info__title">{item.title}</div>
                  {item.selectedCount > 0 && (
                    <div className="Item-info__selected-counter">
                      Выделяли {item.selectedCount} {getNoun(item.selectedCount, 'раз', 'раза', 'раз')}
                    </div>
                  )}
                </div>
                <div className="Item-actions">
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
