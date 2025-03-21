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
  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => {
          const maxCode = store.getState().list.reduce((max, item) => Math.max(max, item.code), 0);
          store.addItem(maxCode + 1);
        }}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item"
              onClick={(event) => {
                store.selectItem(item.code, event);
                if (item.selected) {
                  item.count++;
                }
              }}>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                  <span className={"Item-hiden" + (item.count > 0? ' Item-count' : '')}> | Выделяли {item.count} раз</span>
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => {
                    event.stopPropagation();
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
