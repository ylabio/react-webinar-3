import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
import Store from "./store";


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */

function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
}

function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="container">

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
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(e) => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
                  >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    <span>
                      {item.title}
                    </span>
                    {item.selectionCount > 0 && ` | Выделяли ${item.selectionCount} ${pluralize(item.selectionCount, ['раз', 'раза', 'раз'])}`}
                  </div>
                  <div className="Item-actions">
                    <button className="button-delete" onClick={(e) => { e.stopPropagation(); store.deleteItem(item.code); }}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
