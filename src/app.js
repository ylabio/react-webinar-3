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
        <h1 className="title">Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button
          className="btn btn_type_add"
          onClick={() => {
            store.addItem();
          }}
        >
          Добавить
        </button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
                <div className="Item-info" onClick={evt => store.selectItem(item.code, evt)}>
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}
                    {item.count > 0 && (
                      <span className="item-count">Выделяли {item.count} раз</span>
                    )}
                  </div>
                </div>

                <div className="Item-actions">
                  <button
                    className="btn btn_type_delete"
                    onClick={() => store.deleteItem(item.code)}
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
