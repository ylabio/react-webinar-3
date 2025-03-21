import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
import Store from "./store";


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
      <div className="container">
      <div className="App-controls">
        <button className="button-add" onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div  key={item.id}  className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span>
                  {item.title}
                  </span>
                  {item.selectionCount > 0 && ` | Выделяли ${item.selectionCount} раз`}
                </div>
                <div className="Item-actions">
                  <button className="button-delete" onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
}

export default App;
