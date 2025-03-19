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

  function handleItemSelect(e, code) {
    if (e.ctrlKey || e.metaKey) {
      store.selectItem(code);
      return;
    }

    list.forEach(item => {
      if (item.code === code) {
        store.selectItem(item.code);
        return;
      }
      if (item.selected) {
        store.selectItem(item.code);
      }
    });
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1 className="App-title">Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button className="Btn" onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item, i) => (
            <div key={item.code} className="List-item">
              <div
                className={
                  'Item' +
                  (item.selected ? ' Item_selected' : '') +
                  (i % 2 === 0 ? ' Item_even' : '')
                }
                onClick={e => {
                  handleItemSelect(e, item.code);
                }}
              >
                <div className="Item-content">
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">{item.title}</div>
                  {item.selectCount && (
                    <span className="Item-subtitle"> | Выделяли {item.selectCount} раз(-a)</span>
                  )}
                </div>
                <div className="Item-actions">
                  <button
                    className="Btn Btn_delete"
                    onClick={e => {
                      e.stopPropagation();
                      store.deleteItem(item.code);
                    }}
                  >
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
