import React from 'react';
import { createElement, countMessage } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1 className="header">Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="button button-add" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span>{item.title}</span>
                  {
                    (item.selectCount > 0 ? countMessage('Выделяли', item.selectCount, 'раз', '', 'а', '') : '')
                  }
                </div>
                <div className="Item-actions">
                  <button className="button button-delete" onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code);
                    }}>Удалить</button>
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
