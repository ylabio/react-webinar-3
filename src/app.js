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
        <button
          className="App-add_button"
          onClick={e => {
            store.addItem();
            e.stopPropagation();
          }}
        >
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={e => {
                  store.selectItem(item.code, e.ctrlKey || e.metaKey);
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-info">
                  <div className="Item-title">{item.title}</div>
                  {item.pressedCount !== 0 && (
                    <div className="Item-pressed_count">
                      {'Объект выделяли ' + item.pressedCount + ' раз'}
                    </div>
                  )}
                </div>
                <div className="Item-actions">
                  <button
                    className="Item-delete"
                    onClick={e => {
                      store.deleteItem(item.code);
                      e.stopPropagation();
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
