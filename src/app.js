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
        <div className="App-container">
          <h1>Приложение на чистом JS</h1>
        </div>
      </div>
      <div className="App-container">
        <div className="App-controls">
          <button className="Button" onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={(evt) => store.selectItem(item.code, evt)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}
                    {item.sumSelection > 0 && (
                      <span> | Выделяли {item.sumSelection} раз</span>
                    )}
                  </div>
                  <div className="Item-actions">
                    <button className="Button" onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
