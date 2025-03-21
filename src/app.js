import React from 'react';
import { numWords } from './utils.js';
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
      <div className="container">
        <div className="App-controls">
          <button onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className="App-center">
          <div className="List">
            {list.map(item => (
              <div key={item.code} className="List-item">
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={e => store.selectItem(item.code, e.ctrlKey || e.metaKey)}
                >
                  <div className="Item-code">{item.code}</div>
                  <div className="Item-title">
                    {item.title}
                    {item.selectedCounter ? (
                      <span className="Item-counter">{` | Выделяли ${numWords(item.selectedCounter)}`}</span>
                    ) : null}
                  </div>

                  <div className="Item-actions">
                    <button
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
    </div>
  );
}

export default App;
