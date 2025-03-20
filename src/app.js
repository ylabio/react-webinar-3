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
        <div className="container">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App-controls">
        <div className="container">
          <button onClick={() => store.addItem()}>Добавить</button>
        </div>
      </div>
      <div className="App-center">
        <div className="container">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={e => store.selectItem(item.code, e)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title } <span>
                    {(item.count > 0 ? ` | Выделяли ${item.count} раз` : '')}
                  </span>
                  </div>
                  <div className="Item-actions">
                    <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
