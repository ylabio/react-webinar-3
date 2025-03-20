import React from 'react';
import {createElement} from './utils.js';
import {getPluralForm} from './utils.js';
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
      <div className="App-center">
        <div className="App-head">
          <h1>Приложение на чистом JS</h1>
        </div>
        <div className="App-controls">
          <button className="Button Button-add" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code, e)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title} {item.selectionCount > 0 && (
                  <span className="Item-selection-count">
                    | Выделяли {item.selectionCount} {getPluralForm(item.selectionCount)}
                  </span>
                )}</div>
                <div className="Item-actions">
                  <button className="Button Button-delete" onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code)
                  }}>Удалить
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
