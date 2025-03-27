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
        <div className="wrapper">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="wrapper">
        <div className="App-controls">
          <button onClick={(e) => store.addItem(e)}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={"Item" + (item.selected ? "Item_selected" : "")}
                  onClick={(e) => store.selectItem(item.code, e)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                      {item.title}&nbsp;
                      <span className="Item-count-select">
                        {item.click !== 0 ? `| Выделяли ${store.pluralization(item.click)}` : ''}
                      </span>
                  </div>
                  <div className="Item-actions">
                    <button onClick={(e) => store.deleteItem(item.code, e)}>Удалить</button>
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
